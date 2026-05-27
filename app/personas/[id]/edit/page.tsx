import { notFound } from "next/navigation";
import { repository } from "@lib/repository";
import PersonaForm from "@components/PersonaForm";

export const dynamic = "force-dynamic";

export default async function PersonaEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const persona = await repository.getPersona(id);
  if (!persona) notFound();
  return <PersonaForm mode="edit" initial={persona} />;
}
