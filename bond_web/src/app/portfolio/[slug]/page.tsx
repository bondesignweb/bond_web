"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import PageTransition from "@/components/PageTransition";
import ProjectDetailClient from "./ProjectDetailClient";
import { projects } from "@/lib/projects";

export default function ProjectDetail() {
  const params = useParams();
  const slug = params.slug as string;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <div className="pt-48 pb-32 text-center">
        <h1
          style={{ fontFamily: "var(--font-display)" }}
          className="text-4xl font-light text-[var(--color-charcoal)]"
        >
          Project Not Found
        </h1>
        <Link
          href="/portfolio"
          className="mt-8 inline-block border border-[var(--color-charcoal)] text-[var(--color-charcoal)] px-10 py-4 text-[10px] tracking-[0.3em] uppercase hover:bg-[var(--color-charcoal)] hover:text-white transition-all font-light"
          style={{ fontFamily: "var(--font-body)" }}
        >
          Back to Portfolio
        </Link>
      </div>
    );
  }

  const detail = {
    slug: project.slug,
    title: project.title,
    tagline: project.tagline ?? project.subtitle,
    story: project.story ?? project.description,
    description: project.description,
    hero: project.img,
    designer: project.designer ?? "Bond Design Company",
    location: project.location,
    scope: project.category,
    builder: project.builder ?? "—",
    architect: project.architect ?? "—",
    images: project.gallery,
  };

  return (
    <PageTransition>
      <ProjectDetailClient project={detail} />
    </PageTransition>
  );
}
