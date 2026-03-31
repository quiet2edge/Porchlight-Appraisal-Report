"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { db } from "@/lib/db/dexie";
import type { JobRecord } from "@/types/job";

export default function DashboardPage() {
  const [jobs, setJobs] = useState<JobRecord[]>([]);

  useEffect(() => {
    void db.jobs.orderBy("updatedAt").reverse().toArray().then(setJobs);
  }, []);

  return (
    <main style={{ maxWidth: 1000, margin: "40px auto", padding: 24 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>Dashboard</h1>
        <Link href="/jobs/new">New Report</Link>
      </div>
      <div style={{ display: "grid", gap: 12 }}>
        {jobs.length === 0 ? (
          <div>No jobs yet.</div>
        ) : (
          jobs.map((job) => (
            <div key={job.id} style={{ background: "white", padding: 16, borderRadius: 8 }}>
              <strong>{job.propertyAddress || "Untitled Job"}</strong>
              <div>{job.clientName}</div>
              <div>{job.effectiveDate}</div>
              <div>Status: {job.status}</div>
              <div>Sync: {job.syncStatus}</div>
            </div>
          ))
        )}
      </div>
    </main>
  );
}
