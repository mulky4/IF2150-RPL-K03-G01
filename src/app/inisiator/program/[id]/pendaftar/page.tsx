import { KelolaPendaftarView } from "~/views/KelolaPendaftarPage/KelolaPendaftarView";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <KelolaPendaftarView idProgram={id} />;
}
