import { LaporanDetailView } from "~/views/laporan/LaporanDetailView";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  return <LaporanDetailView id={id} />;
}