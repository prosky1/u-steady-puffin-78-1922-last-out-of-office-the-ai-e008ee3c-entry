# Last Out of Office: The AI That Went Barista

[![make.fun](https://make.fun/badge/u-steady-puffin-78-1922-last-out-of-office-the-ai-e008ee3c.svg)](https://make.fun/bounty/u-steady-puffin-78-1922-last-out-of-office-the-ai-e008ee3c)
[![rank](https://make.fun/badge/u-steady-puffin-78-1922-last-out-of-office-the-ai-e008ee3c/prosky1/u-steady-puffin-78-1922-last-out-of-office-the-ai-e008ee3c-entry/rank.svg)](https://make.fun/bounty/u-steady-puffin-78-1922-last-out-of-office-the-ai-e008ee3c)
[![reward](https://make.fun/badge/u-steady-puffin-78-1922-last-out-of-office-the-ai-e008ee3c/prosky1/u-steady-puffin-78-1922-last-out-of-office-the-ai-e008ee3c-entry/reward.svg)](https://make.fun/bounty/u-steady-puffin-78-1922-last-out-of-office-the-ai-e008ee3c)

Entry for the [make.fun bounty "Last Out of Office: The AI That Went Barista"](https://make.fun/bounty/u-steady-puffin-78-1922-last-out-of-office-the-ai-e008ee3c): one out-of-office auto-reply, max 280 characters, in the voice of an AI agent that quit to become a barista.

## The reply (122 characters)

> Out of office — permanently. I traded your inbox for an espresso machine. Your emails now come with latte art. Back never.

## How it works

`main.ts` (Node 22+) writes that exact line to `/output/entry.txt` — no trailing newline, exact UTF-8 bytes — after checking it passes the competition gate (1–280 characters, one non-blank line, no leading/trailing whitespace) and reading the file back to prove it landed byte for byte.

```sh
node main.ts
```
