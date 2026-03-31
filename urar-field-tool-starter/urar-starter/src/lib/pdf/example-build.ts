import { appendOverflowAddendum } from "@/lib/pdf/add-urar-overflow-addendum";
import { renderUrarOverlay } from "@/lib/pdf/render-urar-overlay";
import { sampleValues } from "@/lib/pdf/build-sample-values";

export async function buildExampleReport(templateBytes: Uint8Array, signaturePngBytes?: Uint8Array) {
  const overlayResult = await renderUrarOverlay({
    templateBytes,
    values: sampleValues,
    signaturePngBytes
  });

  return appendOverflowAddendum({
    pdfBytes: overlayResult.pdfBytes,
    propertyAddress: String(sampleValues["subject.propertyAddress"] ?? ""),
    clientName: String(sampleValues["subject.borrower"] ?? ""),
    overflowItems: overlayResult.addendumOverflow
  });
}
