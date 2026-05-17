"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, memo } from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Target, Zap } from "lucide-react";

// GPU-optimized spring config
const smoothSpring = { type: "spring", damping: 30, stiffness: 100 } as const;
const enterTransition = { duration: 0.8, ease: [0.16, 1, 0.3, 1] } as const;

// Memoized feature card for zero re-renders
const FeatureCard = memo(function FeatureCard({ 
  icon: Icon, title, description, color, delay 
}: { 
  icon: any; title: string; description: string; color: string; delay: number 
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ ...enterTransition, delay }}
      className="bg-white/[0.02] border border-white/[0.05] rounded-3xl p-8 flex flex-col relative overflow-hidden group will-change-transform"
      style={{ backfaceVisibility: "hidden" }}
    >
      {/* Static glow — no animation, pure CSS hover */}
      <div className={`absolute top-0 right-0 w-24 h-24 ${color} rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500`} 
        style={{ filter: "blur(40px)", willChange: "opacity" }} 
      />
      <Icon className="w-10 h-10 mb-6" style={{ color: color.includes("primary") ? "#8FD14F" : color.includes("blue") ? "#60a5fa" : "#a78bfa" }} />
      <h3 className="text-xl font-bold mb-3 text-white">{title}</h3>
      <p className="text-white/50 text-[15px] leading-relaxed">{description}</p>
    </motion.div>
  );
});

export default function CinematicLanding() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Only 2 parallax layers — GPU transform only
  const heroY = useTransform(scrollYProgress, [0, 0.5], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0]);

  return (
    <main ref={containerRef} className="relative w-full bg-[#0A0D0B] selection:bg-primary/30">

      {/* Static ambient glow — NO animation, no blur recalculation */}
      <div 
        className="fixed inset-0 -z-10 pointer-events-none"
        style={{ 
          background: "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(143,209,79,0.06) 0%, transparent 70%)",
          willChange: "auto"
        }}
      />

      {/* ═══ HERO ═══ */}
      <section className="relative h-screen flex flex-col items-center justify-center px-4 z-10 w-full max-w-7xl mx-auto overflow-hidden">
        
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...enterTransition, delay: 0.1 }}
          className="inline-flex items-center space-x-2 bg-white/[0.04] border border-white/[0.08] rounded-full px-4 py-1.5 mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-primary" style={{ boxShadow: "0 0 6px rgba(143,209,79,0.6)" }} />
          <span className="text-xs font-mono tracking-wider text-white/40">ATOMQUEST 1.0 · SECURE PROTOTYPE</span>
        </motion.div>

        {/* Hero text — parallax on transform only */}
        <motion.div
          style={{ y: heroY, opacity: heroOpacity, willChange: "transform, opacity" }}
          className="text-center flex flex-col items-center"
        >
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="font-heading text-[5rem] sm:text-[7rem] md:text-[9rem] font-bold leading-[0.9] tracking-tighter text-white will-change-transform"
              style={{ backfaceVisibility: "hidden" }}
            >
              ATOM<span className="text-gradient-premium">GOALS</span>
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-10 text-xl md:text-2xl text-white/55 max-w-2xl font-normal tracking-wide leading-relaxed"
          >
            A high-fidelity organizational intelligence platform bridging the gap between{" "}
            <span className="text-white font-semibold">ambition</span> and{" "}
            <span className="text-white font-semibold">execution</span>.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...enterTransition, delay: 0.8 }}
            className="mt-12"
          >
            <Link
              href="/login"
              className="group relative inline-flex items-center px-8 py-4 rounded-full bg-white/[0.04] border border-white/[0.08] text-white font-semibold tracking-wide hover:bg-white/[0.08] hover:border-white/[0.12] transition-colors duration-300"
            >
              <span>Enter Platform</span>
              <ArrowRight className="ml-2 w-4 h-4 text-primary group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <div className="w-5 h-8 rounded-full border border-white/10 flex justify-center pt-1.5">
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-1 h-1.5 rounded-full bg-white/30"
            />
          </div>
        </motion.div>
      </section>

      {/* ═══ FEATURES ═══ */}
      <section className="relative py-32 flex flex-col items-center z-10 px-6 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-5 text-white">Precision Engineering.</h2>
          <p className="text-lg text-white/45 font-normal max-w-lg mx-auto leading-relaxed">
            Transforming static metrics into fluid, real-time alignment signals.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 w-full">
          <FeatureCard
            icon={Target}
            title="Dynamic Targeting"
            description="Goals aren't static. Utilize fluid logic boundaries allowing objectives to shift, recalculate, and evolve natively."
            color="bg-primary/20"
            delay={0}
          />
          <FeatureCard
            icon={Zap}
            title="AQ Pulse Engine"
            description="Instant semantic feedback loops analyzing structural goal alignments across global departments."
            color="bg-blue-500/20"
            delay={0.1}
          />
          <FeatureCard
            icon={ShieldCheck}
            title="Encrypted Governance"
            description="Military-grade RBAC segmentation strictly ensuring compliance masking between structural managers."
            color="bg-purple-500/20"
            delay={0.2}
          />
        </div>
      </section>

      {/* ═══ CTA FOOTER ═══ */}
      <section className="relative h-screen flex flex-col items-center justify-center z-10 w-full overflow-hidden">
        {/* Lightweight orbital rings — CSS only, GPU rotated */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[60vw] max-w-[600px] aspect-square border border-primary/10 rounded-full will-change-transform" style={{ animation: "spin 90s linear infinite" }} />
          <div className="absolute w-[40vw] max-w-[400px] aspect-square border border-primary/20 rounded-full will-change-transform" style={{ animation: "spin 60s linear infinite reverse" }} />
          <div className="absolute w-[20vw] max-w-[200px] aspect-square border border-primary/30 rounded-full will-change-transform" style={{ animation: "spin 30s linear infinite" }} />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={enterTransition}
          className="z-20 text-center"
        >
          <h2 className="text-4xl md:text-7xl font-heading font-black text-white mb-8 tracking-tighter">
            Enter the System.
          </h2>
          <Link
            href="/login"
            className="inline-flex h-14 items-center justify-center rounded-xl bg-white/[0.04] border border-white/[0.08] px-10 font-medium text-white/60 hover:text-white hover:bg-white/[0.08] transition-colors duration-300"
          >
            Initialize Workspace
          </Link>
        </motion.div>
      </section>
    </main>
  );
}
