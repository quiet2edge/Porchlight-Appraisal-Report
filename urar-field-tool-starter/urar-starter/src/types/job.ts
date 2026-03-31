export interface JobRecord {
  id: string;
  templateId: string;
  fileNumber?: string;
  clientName: string;
  propertyAddress: string;
  effectiveDate: string;
  status: "draft" | "ready_to_sync" | "synced" | "sent" | "archived";
  syncStatus: "local_only" | "pending_sync" | "syncing" | "synced" | "error";
  createdAt: string;
  updatedAt: string;
}

export interface JobFieldValue {
  id: string;
  jobId: string;
  fieldKey: string;
  value: string | number | boolean | null;
  updatedAt: string;
}

export interface JobPhoto {
  id: string;
  jobId: string;
  blobId: string;
  filename: string;
  mimeType: string;
  caption: string;
  order: number;
  category?: string | null;
  createdAt: string;
  syncedAt?: string | null;
}

export interface JobSignature {
  id: string;
  jobId: string;
  dataUrl: string;
  createdAt: string;
}

export interface SyncQueueItem {
  id: string;
  jobId: string;
  action: "create_job" | "update_job" | "upload_photo" | "upload_signature" | "generate_pdf" | "send_email";
  payload: Record<string, unknown>;
  status: "queued" | "processing" | "done" | "error";
  attempts: number;
  createdAt: string;
  updatedAt: string;
}
