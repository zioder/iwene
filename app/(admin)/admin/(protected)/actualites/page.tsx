import { getArticles } from "@/app/(admin)/admin/actions";
import ActualitesClient from "./actualites-client";

export default async function ActualitesPage() {
  const articles = await getArticles();
  return <ActualitesClient articles={articles} />;
}
