import { getProjects } from "@/app/(admin)/admin/actions";
import ProjectsClient from "./projects-client";

export default async function ProjectsPage() {
  const projects = await getProjects();
  return <ProjectsClient projects={projects} />;
}
