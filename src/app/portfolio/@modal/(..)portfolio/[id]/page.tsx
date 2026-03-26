import { ProjectModal } from "@/components/portfolio/project-modal";
import { portfolioProjects } from "@/lib/portfolio-data";
import { notFound } from "next/navigation";

interface PageProps {
  params: { id: string };
}

export default function ModalPage({ params }: PageProps) {
  const project = portfolioProjects.find((p) => p.id === params.id);

  if (!project) {
    notFound();
  }

  return <ProjectModal project={project} />;
}
