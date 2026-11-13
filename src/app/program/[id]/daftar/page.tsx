import { ProgramDaftarView } from "~/views/KelolaProgramPage/ProgramDaftarView";

export default async function PageDaftarProgram({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <ProgramDaftarView programId={id} />;
}
