export function formatOverlayValue(
  value: unknown,
  type: "text" | "currency" | "date" | "number"
): string {
  if (value == null || value === "") return "";
  if (type === "currency") {
    const str = String(value).replace(/[^0-9.\-]/g, "");
    return str ? `$${str}` : "";
  }
  return String(value);
}

export function shouldRenderCheckbox(value: unknown): boolean {
  return value === true || value === "true" || value === "yes" || value === "x" || value === 1;
}

export function checkboxMark(): string {
  return "X";
}

export function fitMultilineText(params: {
  text: string;
  width: number;
  height: number;
  fontSize: number;
  minFontSize: number;
  lineHeight: number;
  maxLines?: number;
}): { fittedText: string; fontSize: number; overflowText?: string } {
  const { text, height, fontSize, minFontSize, lineHeight, maxLines } = params;
  const words = text.trim().split(/\s+/);
  let size = fontSize;

  while (size >= minFontSize) {
    const approxCharsPerLine = Math.max(8, Math.floor(params.width / (size * 0.52)));
    const lines: string[] = [];
    let current = "";

    for (const word of words) {
      const next = current ? `${current} ${word}` : word;
      if (next.length <= approxCharsPerLine) current = next;
      else {
        if (current) lines.push(current);
        current = word;
      }
    }
    if (current) lines.push(current);

    const allowedLines = maxLines ?? Math.floor(height / lineHeight);
    if (lines.length <= allowedLines) return { fittedText: lines.join("\n"), fontSize: size };
    size -= 0.5;
  }

  const approxCharsPerLine = Math.max(8, Math.floor(params.width / (minFontSize * 0.52)));
  const lines: string[] = [];
  let current = "";
  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (next.length <= approxCharsPerLine) current = next;
    else {
      if (current) lines.push(current);
      current = word;
    }
  }
  if (current) lines.push(current);

  const allowedLines = maxLines ?? Math.floor(height / lineHeight);
  return {
    fittedText: lines.slice(0, allowedLines).join("\n"),
    fontSize: minFontSize,
    overflowText: lines.slice(allowedLines).join(" ")
  };
}
