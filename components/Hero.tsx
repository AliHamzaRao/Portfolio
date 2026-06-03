"use client";

import { useProfile } from "@/contexts/ProfileContext";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown, Download } from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";

const fallbackMetrics = [
  { value: "6+", label: "Years of experience" },
  { value: "20+", label: "Projects shipped" },
  { value: "10+", label: "Engineers led" },
];

/** Accent the segment after "&" (e.g. "… & UI Architect"), else the last word. */
function renderTitle(title: string) {
  if (!title) return null;
  if (title.includes("&")) {
    const [first, ...rest] = title.split("&");
    return (
      <>
        {first.trim()}{" "}
        <span className="text-brand-400">&amp; {rest.join("&").trim()}</span>
      </>
    );
  }
  const words = title.trim().split(" ");
  const last = words.pop();
  return (
    <>
      {words.join(" ")} <span className="text-brand-400">{last}</span>
    </>
  );
}

export default function Hero() {
  const { profile, loading } = useProfile();

  const handleDownloadResume = async () => {
    try {
      if (profile?.resumeUrl) {
        window.open(profile.resumeUrl, "_blank");
        return;
      }
      const response = await fetch("/api/resume");
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = profile?.resumeName || "resume.pdf";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Error downloading resume:", error);
    }
  };

  if (loading) return null;

  const metrics =
    profile?.metrics && profile.metrics.length > 0
      ? profile.metrics
      : fallbackMetrics;

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-slate-950"
    >
      {/* Background: grid + brand radial glows */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-5%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_at_center,rgba(14,165,233,0.16),transparent_70%)]" />
        <div className="absolute bottom-[-10%] right-[-5%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.12),transparent_70%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.04)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
      </div>

      {/* Content */}
      <div className="container relative z-10 mx-auto px-4 pt-28 pb-20">
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          {/* Left: copy */}
          <div className="max-w-2xl">
            {profile?.availabilityStatus && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-4 py-1.5"
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                <span className="font-mono text-xs uppercase tracking-widest text-emerald-300">
                  {profile.availabilityStatus}
                </span>
              </motion.div>
            )}

            {profile?.name && (
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.05 }}
                className="mb-3 font-mono text-sm uppercase tracking-[0.3em] text-slate-400"
              >
                {profile.name}
              </motion.p>
            )}

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-heading text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl"
            >
              {renderTitle(profile?.title || "Senior Frontend Lead & UI Architect")}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 max-w-xl text-lg leading-relaxed text-slate-300"
            >
              {profile?.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8 flex flex-wrap gap-4"
            >
              <Button
                asChild
                className="group rounded-full bg-brand-500 px-6 py-6 text-base font-medium text-white hover:bg-brand-400"
              >
                <a href="#projects">
                  View Projects
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
              <Button
                onClick={handleDownloadResume}
                variant="outline"
                disabled={!profile?.resumeUrl}
                className="rounded-full border-slate-700 bg-transparent px-6 py-6 text-base font-medium text-slate-200 hover:border-brand-400/50 hover:bg-brand-500/10 hover:text-white"
              >
                <Download className="mr-2 h-4 w-4" />
                Download Resume
              </Button>
            </motion.div>

            {/* Metrics */}
            <motion.dl
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-white/5 pt-8"
            >
              {metrics.map((metric, i) => (
                <div key={i}>
                  <dt className="font-heading text-3xl font-bold text-brand-400">
                    {metric.value}
                  </dt>
                  <dd className="mt-1 font-mono text-xs uppercase tracking-wide text-slate-400">
                    {metric.label}
                  </dd>
                </div>
              ))}
            </motion.dl>
          </div>

          {/* Right: portrait */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative mx-auto w-full max-w-sm lg:max-w-md"
          >
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-brand-500/20 via-transparent to-emerald-500/20 blur-2xl" />
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-white/10 bg-slate-900">
              <Image
                src={profile?.image || "/placeholder.svg"}
                alt={profile?.name || "Profile"}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 384px, 448px"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center text-slate-500 hover:text-brand-400 transition-colors md:flex"
      >
        <span className="mb-2 font-mono text-xs uppercase tracking-widest">
          Scroll
        </span>
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
        >
          <ChevronDown className="h-5 w-5" />
        </motion.span>
      </motion.a>
    </section>
  );
}
