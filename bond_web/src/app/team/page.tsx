"use client";
import Image from "next/image";
import ScrollReveal from "@/components/ScrollReveal";
import PageTransition from "@/components/PageTransition";

const headingFont = { fontFamily: "var(--font-display)" } as const;
const bodyFont = { fontFamily: "var(--font-body)" } as const;

type Member = {
  name: string;
  role: string;
  img: string | null;
};

const designTeam: Member[] = [
  { name: "Laura Kramer", role: "Designer", img: "/images/team-laura.jpg" },
  {
    name: "Alex Kotkiewicz",
    role: "Designer",
    img: "/images/3121FA3F-285B-4C6A-8419-1B435E0683FE-2-scaled.jpeg",
  },
  { name: "Claire Rogers", role: "Designer", img: null },
  {
    name: "Claire English",
    role: "Project Manager",
    img: "/images/team-claire.jpeg",
  },
  {
    name: "Andrea Aldana",
    role: "Project Manager",
    img: "/images/team-andrea.jpeg",
  },
  {
    name: "Nicole Messerole",
    role: "Project Manager",
    img: "/images/6663786F-1864-4146-B305-36FCF4DA72C8-2-scaled.jpeg",
  },
];

const operations: Member[] = [
  {
    name: "Chelsey Milton",
    role: "Co-Founder",
    img: "/images/team-chelsey.jpg",
  },
  { name: "Abigail Deniston", role: "Operations", img: null },
  {
    name: "Michael Lopez",
    role: "Operations Specialist",
    img: "/images/AD483D48-CEF7-4CDF-AD34-AD01597E5D70-2-scaled.jpeg",
  },
  {
    name: "Hannah Holmes",
    role: "Marketing Director",
    img: "/images/team-hannah.jpeg",
  },
  { name: "Corbin Ballard", role: "Operations", img: null },
  {
    name: "Perla",
    role: "Personal Space Infiltration Officer",
    img: "/images/Bond-Studio-Perla.jpg",
  },
];

function MemberCard({ m }: { m: Member }) {
  return (
    <div className="text-center">
      <div className="relative w-full aspect-[4/5] bg-[var(--color-linen)] mb-5 overflow-hidden">
        {m.img ? (
          <Image
            src={m.img}
            alt={m.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : null}
      </div>
      <h3
        className="text-[13px] tracking-[0.25em] uppercase font-normal text-[var(--color-charcoal)] mb-1"
        style={bodyFont}
      >
        {m.name}
      </h3>
      <p
        className="text-[10px] tracking-[0.2em] uppercase text-[var(--color-text-light)] font-light"
        style={bodyFont}
      >
        {m.role}
      </p>
    </div>
  );
}

export default function TeamPage() {
  return (
    <PageTransition>
      {/* 1. Featured: Jennifer Chipman */}
      <section className="pt-36 pb-20 md:pt-48 md:pb-28 px-6 md:px-12 lg:px-20 bg-[var(--color-bg-primary)]">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 lg:gap-20 items-start">
          <ScrollReveal>
            <div className="relative w-full aspect-[4/5] bg-[var(--color-linen)]">
              <Image
                src="/images/team-jennifer.jpeg"
                alt="Jennifer Chipman"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </ScrollReveal>
          <ScrollReveal>
            <div className="md:pt-8">
              <h1
                className="text-3xl md:text-4xl lg:text-5xl tracking-[0.05em] uppercase font-light text-[var(--color-charcoal)] mb-3 leading-[1.1]"
                style={headingFont}
              >
                Jennifer Chipman
              </h1>
              <p
                className="text-[10px] tracking-[0.3em] uppercase text-[var(--color-text-accent)] font-light mb-10"
                style={bodyFont}
              >
                Co-Founder &amp; Principal Designer
              </p>
              <div
                className="space-y-5 text-[var(--color-text-light)] text-[14px] font-light leading-[1.9]"
                style={bodyFont}
              >
                <p>
                  Jennifer&apos;s path to design started early — collecting
                  fabric swatches, redrawing floor plans of her childhood home,
                  and noticing how a room could shift the mood of an entire
                  day. Today that same instinct shapes every Bond project: the
                  conviction that a home is only finished when it tells its
                  owner&apos;s story.
                </p>
                <p>
                  As Bond Design Company&apos;s Principal Designer, Jennifer
                  leads each engagement from kick-off through final
                  installation. Her work spans new builds, large-scale
                  remodels, and full furnishings — from mountain retreats in
                  Park City to coastal escapes across the country.
                </p>
                <p>
                  Trained in interior architecture and color theory, she
                  approaches every space as a conversation between the
                  client&apos;s lifestyle and the bones of the building. Her
                  signature is restraint: warm neutral palettes, layered
                  textures, and the kind of considered detail that reads as
                  effortless even when it isn&apos;t.
                </p>
                <p>
                  Outside the studio, Jennifer is a mother, a hiker, and an
                  aggressive collector of vintage textiles. She lives in Park
                  City with her family — and Perla, the studio&apos;s most
                  decorated team member.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 2. Design Team */}
      <section className="py-20 md:py-28 px-6 md:px-12 lg:px-20">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <h2
              className="text-center text-2xl md:text-4xl uppercase tracking-[0.15em] font-light text-[var(--color-charcoal)] mb-16"
              style={headingFont}
            >
              Design Team
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-10 lg:gap-12">
            {designTeam.map((m, i) => (
              <ScrollReveal key={m.name} delay={i * 0.05}>
                <MemberCard m={m} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Operations */}
      <section className="py-20 md:py-28 px-6 md:px-12 lg:px-20">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <h2
              className="text-center text-2xl md:text-4xl uppercase tracking-[0.15em] font-light text-[var(--color-charcoal)] mb-16"
              style={headingFont}
            >
              Operations
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-10 lg:gap-12">
            {operations.map((m, i) => (
              <ScrollReveal key={m.name} delay={i * 0.05}>
                <MemberCard m={m} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
