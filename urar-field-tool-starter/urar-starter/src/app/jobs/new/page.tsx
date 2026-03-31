"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { db } from "@/lib/db/dexie";
import type { JobRecord } from "@/types/job";

export default function NewJobPage() {
  const router = useRouter();
  const [clientName, setClientName] = useState("");
  const [propertyAddress, setPropertyAddress] = useState("");
  const [effectiveDate, setEffectiveDate] = useState("");
  const [fileNumber, setFileNumber] = useState("");

  async function createJob() {
    const now = new Date().toISOString();
    const job: JobRecord = {
      id: uuidv4(),
      templateId: "urar_1004_flat_2005",
      fileNumber,
      clientName,
      propertyAddress,
      effectiveDate,
      status: "draft",
      syncStatus: "local_only",
      createdAt: now,
      updatedAt: now
    };

    await db.jobs.add(job);
    router.push("/dashboard");
  }

  return (
    <main style={{ maxWidth: 700, margin: "40px auto", padding: 24 }}>
      <h1>Create Job</h1>
      <div style={{ display: "grid", gap: 12, background: "white", padding: 20, borderRadius: 8 }}>
        <label>
          Client Name
          <input value={clientName} onChange={(e) => setClientName(e.target.value)} style={{ display: "block", width: "100%" }} />
        </label>
        <label>
          Property Address
          <input value={propertyAddress} onChange={(e) => setPropertyAddress(e.target.value)} style={{ display: "block", width: "100%" }} />
        </label>
        <label>
          Effective Date
          <input value={effectiveDate} onChange={(e) => setEffectiveDate(e.target.value)} style={{ display: "block", width: "100%" }} placeholder="MM/DD/YYYY" />
        </label>
        <label>
          File Number
          <input value={fileNumber} onChange={(e) => setFileNumber(e.target.value)} style={{ display: "block", width: "100%" }} />
        </label>
        <button onClick={() => void createJob()}>Create</button>
      </div>
    </main>
  );
}
