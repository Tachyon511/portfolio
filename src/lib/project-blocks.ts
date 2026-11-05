export type ContentBlock =
  | { type: "markdown"; content: string }
  | { type: "split"; left: string; right: string }
  | { type: "hero"; content: string };

type Directive = "split" | "next" | "hero" | "end";

function getDirective(line: string): Directive | null {
  // Remove Markdown escaping that some editors add.
  const normalized = line
    .replace(/\\/g, "")
    .replace(/\u200B/g, "")
    .replace(/\u00A0/g, " ")
    .trim();

  const match = normalized.match(/^:{3}(split|next|hero|end)$/);

  return match ? (match[1] as Directive) : null;
}

export function parseProjectBlocks(source: string): ContentBlock[] {
  const lines = source.replace(/\r\n?/g, "\n").split("\n");

  const blocks: ContentBlock[] = [];
  let normal: string[] = [];
  let inCodeBlock = false;

  function flushNormal() {
    const content = normal.join("\n").trim();

    if (content) {
      blocks.push({ type: "markdown", content });
    }

    normal = [];
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    if (/^(`{3,}|~{3,})/.test(trimmed)) {
      inCodeBlock = !inCodeBlock;
      normal.push(line);
      continue;
    }

    const directive = inCodeBlock ? null : getDirective(line);

    if (directive !== "split" && directive !== "hero") {
      normal.push(line);
      continue;
    }

    let endIndex = -1;

    for (let j = i + 1; j < lines.length; j++) {
      if (getDirective(lines[j]) === "end") {
        endIndex = j;
        break;
      }
    }

    if (endIndex === -1) {
      console.warn(`Unclosed project block at line ${i + 1}`);
      normal.push(line);
      continue;
    }

    const inner = lines.slice(i + 1, endIndex);

    if (directive === "split") {
      const separatorIndex = inner.findIndex(
        (value) => getDirective(value) === "next"
      );

      if (separatorIndex === -1) {
        console.warn(`Split block missing :::next at line ${i + 1}`);
        normal.push(line);
        continue;
      }

      flushNormal();

      blocks.push({
        type: "split",
        left: inner.slice(0, separatorIndex).join("\n").trim(),
        right: inner.slice(separatorIndex + 1).join("\n").trim(),
      });
    } else {
      flushNormal();

      blocks.push({
        type: "hero",
        content: inner.join("\n").trim(),
      });
    }

    i = endIndex;
  }

  flushNormal();

  return blocks;
}