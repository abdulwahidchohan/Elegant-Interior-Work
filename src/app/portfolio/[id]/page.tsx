import { portfolioProjects } from "@/lib/portfolio-data";
import { notFound } from "next/navigation";
import Image from "next/image";
import { BeforeAfterSlider } from "@/components/portfolio/before-after-slider";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProjectPage({ params }: PageProps) {
  const { id } = await params;
  const project = portfolioProjects.find((p) => p.id === id);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4 py-12">
        <h1 className="font-serif text-4xl md:text-6xl font-bold mb-4">
          {project.title}
        </h1>
        <p className="text-muted-foreground text-lg mb-8">{project.description}</p>
        <div className="relative aspect-video w-full mb-8">
          <Image
            src={project.imageUrl}
            alt={project.title}
            fill
            className="object-cover rounded-2xl"
            placeholder="blur"
            blurDataURL={project.blurDataURL}
          />
        </div>
        {project.beforeImageUrl && project.afterImageUrl && (
          <div className="mb-12">
            <h2 className="font-serif text-3xl font-bold mb-6">Before &amp; After</h2>
            <BeforeAfterSlider
              beforeImage={project.beforeImageUrl}
              afterImage={project.afterImageUrl}
              beforeLabel="Before"
              afterLabel="After"
            />
          </div>
        )}
      </div>
    </div>
  );
}
