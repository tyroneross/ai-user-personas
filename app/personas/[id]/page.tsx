import { notFound } from "next/navigation";
import { repository } from "@lib/repository";
import PersonaDetail from "@components/PersonaDetail";

export const dynamic = "force-dynamic";

export default async function PersonaDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const persona = await repository.getPersona(id);
  if (!persona) notFound();
  return <PersonaDetail persona={persona} />;
}
