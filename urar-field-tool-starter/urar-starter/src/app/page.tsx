import Link from "next/link";

export default function HomePage() {
  return (
    <main style={{ maxWidth: 900, margin: "40px auto", padding: 24 }}>
      <h1>URAR Field Tool Starter</h1>
      <p>This starter is designed for a flat-PDF overlay workflow with local-first storage.</p>
      <div style={{ display: "flex", gap: 12 }}>
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/jobs/new">Create Job</Link>
      </div>
    </main>
  );
}
