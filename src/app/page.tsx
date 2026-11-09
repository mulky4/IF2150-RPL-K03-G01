import Link from "next/link";

// Sementara: halaman awal scaffold. Nanti diarahkan ke /program (I-04, Modul 2).
export default function Beranda() {
  return (
    <main className="mx-auto max-w-xl p-8">
      <h1 className="text-3xl font-bold">RekanBumi</h1>
      <p className="mt-2">Scaffold Milestone 9 sudah jalan.</p>
      <ul className="mt-4 list-disc pl-6">
        <li>
          <Link href="/registrasi">Registrasi (I-01)</Link>
        </li>
        <li>
          <Link href="/login">Login (I-02)</Link>
        </li>
        <li>
          <Link href="/notifikasi">Notifikasi (I-03)</Link>
        </li>
      </ul>
    </main>
  );
}
