import { ProjectModal } from "@/components/portfolio/project-modal";
import { portfolioProjects } from "@/lib/portfolio-data";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ModalPage({ params }: PageProps) {
  const { id } = await params;
  const project = portfolioProjects.find((p) => p.id === id);

  if (!project) {
    notFound();
  }

  return <ProjectModal project={project} />;
}
