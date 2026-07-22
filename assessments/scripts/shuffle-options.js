#!/usr/bin/env node
/**
 * Shuffle MCQ option order so correct answers are not predictable by position.
 * Updates question files, answer keys, and remaps letter references in explanations.
 *
 * Usage: node assessments/scripts/shuffle-options.js [day ...]
 *   e.g. node assessments/scripts/shuffle-options.js 07 08 09
 *   omit days to shuffle all day-XX files (01–13)
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const LETTERS = ['A', 'B', 'C', 'D'];

/** Mulberry32 — much less positional bias than LCG + `% (i+1)`. */
function mulberry32(seed) {
  let s = seed >>> 0;
  return function nextU32() {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return (t ^ (t >>> 14)) >>> 0;
  };
}

/** Unbiased int in [0, maxExclusive) via rejection sampling. */
function randInt(nextU32, maxExclusive) {
  if (maxExclusive <= 1) return 0;
  const limit = 0x100000000 - (0x100000000 % maxExclusive);
  let x;
  do {
    x = nextU32();
  } while (x >= limit);
  return x % maxExclusive;
}

function seededShuffle(arr, seed) {
  const a = [...arr];
  const nextU32 = mulberry32(seed);
  for (let i = a.length - 1; i > 0; i--) {
    const j = randInt(nextU32, i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Mix day + question into a 32-bit seed (avoid tiny sequential seeds). */
function seedFor(day, qNum) {
  let h = 0x811c9dc5 >>> 0; // FNV-ish offset
  const material = `mcq-v2|${String(day).padStart(2, '0')}|Q${qNum}`;
  for (let i = 0; i < material.length; i++) {
    h ^= material.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  h ^= h >>> 16;
  h = Math.imul(h, 0x7feb352d);
  h ^= h >>> 15;
  h = Math.imul(h, 0x846ca68b);
  h ^= h >>> 16;
  return h >>> 0;
}

function splitBySeparator(md) {
  const eol = md.includes('\r\n') ? '\r\n' : '\n';
  const parts = md.split(/\r?\n---\r?\n/);
  const header = parts[0];
  const sections = [];
  for (let i = 1; i < parts.length; i++) {
    const trimmed = parts[i].replace(/^\r?\n+/, '').replace(/\r?\n+$/, '');
    const m = trimmed.match(/^### (Q\d+[^\r\n]*)\r?\n([\s\S]*)$/);
    if (!m) continue;
    sections.push({ header: m[1], body: m[2] });
  }
  return { header, sections, eol };
}

function parseOptions(body) {
  const lines = body.split(/\r?\n/);
  const options = [];
  let firstOptionIdx = -1;
  for (let i = 0; i < lines.length; i++) {
    const match = lines[i].match(/^- \[ \] ([A-D])\. (.+)$/);
    if (match) {
      if (firstOptionIdx === -1) firstOptionIdx = i;
      options.push({ oldLetter: match[1], text: match[2] });
    }
  }
  if (options.length < 2) {
    throw new Error(`Expected at least 2 options, got ${options.length}`);
  }
  const stem = lines.slice(0, firstOptionIdx).join('\n').replace(/\n$/, '');
  return { stem, options };
}

function parseAnswer(body) {
  const answerMatch = body.match(/\*\*Answer:\*\* (.+)/);
  const explMatch = body.match(/\*\*Explanation:\*\* ([\s\S]+)/);
  if (!answerMatch) throw new Error('Missing **Answer:**');
  if (!explMatch) throw new Error('Missing **Explanation:**');
  const correct = answerMatch[1].split(',').map((s) => s.trim());
  return { correct, explanation: explMatch[1].trim() };
}

function remapExplanationLetters(text, oldToNew) {
  return text.replace(/\(([A-D])\)/g, (_, letter) => `(${oldToNew[letter]})`);
}

function formatOptions(shuffled, eol) {
  return shuffled
    .map((o, i) => `- [ ] ${LETTERS[i]}. ${o.text}`)
    .join(eol);
}

function formatCorrect(correctLetters) {
  return LETTERS.filter((l) => correctLetters.includes(l)).join(', ');
}

function shuffleDay(day) {
  const qPath = path.join(ROOT, `day-${day}-questions.md`);
  const aPath = path.join(ROOT, 'answer-key', `day-${day}-answers.md`);
  const qFile = splitBySeparator(fs.readFileSync(qPath, 'utf8'));
  const aFile = splitBySeparator(fs.readFileSync(aPath, 'utf8'));

  if (qFile.sections.length !== aFile.sections.length) {
    throw new Error(
      `day-${day}: ${qFile.sections.length} questions vs ${aFile.sections.length} answers`
    );
  }

  const eol = qFile.eol;
  const newQSections = [];
  const newASections = [];

  for (let i = 0; i < qFile.sections.length; i++) {
    const qSec = qFile.sections[i];
    const aSec = aFile.sections[i];
    if (qSec.header !== aSec.header) {
      throw new Error(
        `day-${day} mismatch at index ${i}: ${qSec.header} vs ${aSec.header}`
      );
    }

    const qNum = parseInt(qSec.header.match(/^Q(\d+)/)[1], 10);
    const { stem, options } = parseOptions(qSec.body);
    const { correct, explanation } = parseAnswer(aSec.body);

    for (const letter of correct) {
      if (!options.some((o) => o.oldLetter === letter)) {
        throw new Error(
          `day-${day} ${qSec.header}: answer ${letter} not in options`
        );
      }
    }

    const shuffled = seededShuffle(options, seedFor(day, qNum));
    const oldToNew = {};
    shuffled.forEach((o, idx) => {
      oldToNew[o.oldLetter] = LETTERS[idx];
    });

    const newCorrect = correct.map((l) => oldToNew[l]);

    newQSections.push({
      header: qSec.header,
      body: stem ? `${stem}${eol}${eol}${formatOptions(shuffled, eol)}` : formatOptions(shuffled, eol),
    });

    newASections.push({
      header: aSec.header,
      body: `**Answer:** ${formatCorrect(newCorrect)}${eol}${eol}**Explanation:** ${remapExplanationLetters(explanation, oldToNew)}`,
    });
  }

  const sep = `${eol}---${eol}`;
  const newQMd =
    qFile.header +
    newQSections.map((s) => `${eol}${sep}${eol}### ${s.header}${eol}${eol}${s.body}`).join('') +
    eol;
  const newAMd =
    aFile.header +
    newASections.map((s) => `${eol}${sep}${eol}### ${s.header}${eol}${eol}${s.body}`).join('') +
    eol;

  fs.writeFileSync(qPath, newQMd);
  fs.writeFileSync(aPath, newAMd);

  const letterHits = { A: 0, B: 0, C: 0, D: 0 };
  for (const s of newASections) {
    const ans = (s.body.match(/\*\*Answer:\*\* (.+)/) || [])[1] || '';
    for (const L of LETTERS) {
      if (ans.split(',').map((x) => x.trim()).includes(L)) letterHits[L]++;
    }
  }
  const n = newQSections.length;
  console.log(
    `day-${day}: shuffled ${n} | correct@A/B/C/D = ${letterHits.A}/${letterHits.B}/${letterHits.C}/${letterHits.D}`
  );
}

const days =
  process.argv.length > 2
    ? process.argv.slice(2).map((d) => d.padStart(2, '0'))
    : ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13'];

for (const day of days) {
  shuffleDay(day);
}
