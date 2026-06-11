import CouncilRunForm from "@components/CouncilRunForm";
import { fileCouncilRepository } from "@lib/council-repository.server";

export const dynamic = "force-dynamic";

export default async function NewCouncilRunPage() {
  const rosters = await fileCouncilRepository.listRosters();
  return <CouncilRunForm rosters={rosters} />;
}
