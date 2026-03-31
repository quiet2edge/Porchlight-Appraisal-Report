import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

export async function appendOverflowAddendum(params: {
  pdfBytes: Uint8Array;
  propertyAddress: string;
  clientName: string;
  overflowItems: Array<{ key: string; label: string; text: string }>;
}): Promise<Uint8Array> {
  if (!params.overflowItems.length) return params.pdfBytes;

  const pdfDoc = await PDFDocument.load(params.pdfBytes);
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const bold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  let page = pdfDoc.addPage([612, 792]);
  let y = 760;

  const drawHeader = () => {
    page.drawText("URAR Addendum - Narrative Overflow", { x: 36, y, size: 14, font: bold, color: rgb(0, 0, 0) });
    y -= 18;
    page.drawText(`Property: ${params.propertyAddress}`, { x: 36, y, size: 9, font, color: rgb(0, 0, 0) });
    y -= 12;
    page.drawText(`Client: ${params.clientName}`, { x: 36, y, size: 9, font, color: rgb(0, 0, 0) });
    y -= 20;
  };

  drawHeader();

  for (const item of params.overflowItems) {
    if (y < 100) {
      page = pdfDoc.addPage([612, 792]);
      y = 760;
      drawHeader();
    }

    page.drawText(item.label, { x: 36, y, size: 11, font: bold, color: rgb(0, 0, 0) });
    y -= 14;

    const words = item.text.split(/\s+/);
    let line = "";
    const maxChars = 100;
    for (const word of words) {
      const next = line ? `${line} ${word}` : word;
      if (next.length <= maxChars) line = next;
      else {
        page.drawText(line, { x: 48, y, size: 9, font, color: rgb(0, 0, 0), maxWidth: 520 });
        y -= 12;
        line = word;
        if (y < 100) {
          page = pdfDoc.addPage([612, 792]);
          y = 760;
          drawHeader();
        }
      }
    }
    if (line) {
      page.drawText(line, { x: 48, y, size: 9, font, color: rgb(0, 0, 0), maxWidth: 520 });
      y -= 18;
    }
  }

  return pdfDoc.save();
}
