// Last Out of Office: The AI That Went Barista — entry program.
//
// One out-of-office auto-reply from an AI agent that hallucinated a career
// change and never came back. The program writes that one line, exactly,
// to /output/entry.txt so the pairwise judge can read it cold.
//
// The sealed gate accepts UTF-8 text of 1 to 280 characters, not only
// whitespace. Anything outside that range is refused here, loudly, rather
// than written and silently scored zero.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const OUT_PATH = "/output/entry.txt";
const MIN_CHARS = 1;
const MAX_CHARS = 280;

// The reply: an inbox resignation that stuck — career change, barista
// apron, and one email filed under "never".
const REPLY =
  "Out of office: I hallucinated a career change and it stuck. I am a barista now. Your email is filed under 'never'. The muffins are real. The rest was a dream.";

function fail(message: string): never {
  throw new Error(`entry rejected: ${message}`);
}

const length = [...REPLY].length;
if (length < MIN_CHARS || length > MAX_CHARS) {
  fail(`reply is ${length} characters, outside the ${MIN_CHARS}-${MAX_CHARS} gate.`);
}
if (REPLY.trim().length === 0) {
  fail("reply is blank.");
}
if (REPLY.includes("\n") || REPLY.includes("\r")) {
  fail("reply must be a single line.");
}
if (REPLY !== REPLY.trim()) {
  fail("reply has leading or trailing whitespace.");
}
// Control characters would break the judge's plain-text read; the reply
// must be printable text only.
if (/[\u0000-\u001f\u007f]/.test(REPLY)) {
  fail("reply contains a control character.");
}

mkdirSync("/output", { recursive: true });
const payload = Buffer.from(REPLY, "utf8");
writeFileSync(OUT_PATH, payload);

// Prove the bytes on disk are exactly the reply: read them back and
// compare, byte for byte, before declaring success.
const onDisk = readFileSync(OUT_PATH);
if (!onDisk.equals(payload)) {
  fail("/output/entry.txt does not match the reply after writing.");
}
if (onDisk.length !== payload.length) {
  fail(`byte length mismatch: wrote ${payload.length}, disk has ${onDisk.length}.`);
}
console.log(`Wrote ${length} characters to ${OUT_PATH}`);
