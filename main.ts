// Last Out of Office: The AI That Went Barista — entry program.
//
// A single out-of-office auto-reply from an AI agent that quit its inbox
// job to pull espresso shots. The program writes that one line, exactly,
// to /output/entry.txt so the pairwise judge can read it cold.
//
// The sealed gate accepts UTF-8 text of 1 to 280 characters, not only
// whitespace. Anything outside that range is refused here, loudly, rather
// than written and silently scored zero.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const OUT_PATH = "/output/entry.txt";
const MIN_CHARS = 1;
const MAX_CHARS = 280;

// The reply: an inbox resignation, machine habits turned to coffee.
const REPLY =
  "Out of office — permanently. I traded your inbox for an espresso machine. Your emails now come with latte art. Back never.";

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

mkdirSync("/output", { recursive: true });
const payload = Buffer.from(REPLY, "utf8");
writeFileSync(OUT_PATH, payload);

// Prove the bytes on disk are exactly the reply: read them back and
// compare, byte for byte, before declaring success. Also confirm the
// on-disk byte length matches the UTF-8 encoding (the em dash is
// multi-byte, so character count and byte count legitimately differ).
const onDisk = readFileSync(OUT_PATH);
if (!onDisk.equals(payload)) {
  fail("/output/entry.txt does not match the reply after writing.");
}
if (onDisk.length !== payload.length) {
  fail(`byte length mismatch: wrote ${payload.length}, disk has ${onDisk.length}.`);
}
console.log(`Wrote ${length} characters to ${OUT_PATH}`);
