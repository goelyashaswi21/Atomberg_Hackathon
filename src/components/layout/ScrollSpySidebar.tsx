"use client";

import { useEffect, useState, useCallback } from "react";
import { SignOutButton } from "@/components/shared/SignOutButton";

interface NavItem {
  name: string;
  icon: string;
  id: string;
}

interface ScrollSpySidebarProps {
  items: NavItem[];
  userName: string;
  userRole: string;
}

export function ScrollSpySidebar({ items, userName, userRole }: ScrollSpySidebarProps) {
  const [activeId, setActiveId] = useState(items[0]?.id || "");

  // Intersection Observer for scroll spy
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter(e => e.isIntersecting);
        if (visible.length > 0) {
          // Pick the one closest to top
          const sorted = visible.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
          setActiveId(sorted[0].target.id);
        }
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: 0 }
    );

    items.forEach(item => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  return (
    <aside className="w-72 flex-shrink-0 glass-strong flex flex-col z-20 relative">
      {/* Static ambient glow */}
      <div className="absolute -top-20 -left-20 w-48 h-48 rounded-full pointer-events-none" style={{ background: "rgba(143,209,79,0.04)", filter: "blur(80px)" }} />

      {/* Logo */}
      <div className="h-20 flex items-center px-7 border-b border-white/[0.04]">
        <div className="w-3 h-3 rounded-full bg-primary" style={{ boxShadow: "0 0 10px rgba(143,209,79,0.6)" }} />
        <span className="font-heading font-bold text-xl text-white tracking-wider ml-4">
          ATOM<span className="text-gradient-premium">GOALS</span><span className="text-white/30 font-light">.AI</span>
        </span>
      </div>

      {/* Nav with scroll-spy */}
      <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
        {items.map((item) => {
          const isActive = activeId === item.id;
          return (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`w-full flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-colors duration-200 text-left ${
                isActive
                  ? "text-white bg-white/[0.06] border border-white/[0.08]"
                  : "text-white/50 hover:text-white/70 hover:bg-white/[0.02] border border-transparent"
              }`}
            >
              {isActive && (
                <span className="w-1 h-4 rounded-full bg-primary mr-3 flex-shrink-0" style={{ boxShadow: "0 0 8px rgba(143,209,79,0.4)" }} />
              )}
              <span className={`mr-3 text-base ${isActive ? "" : "ml-4"}`}>{item.icon}</span>
              <span className="tracking-wide">{item.name}</span>
            </button>
          );
        })}
      </nav>

      {/* User card */}
      <div className="p-5 border-t border-white/[0.04]">
        <div className="flex items-center bg-white/[0.02] rounded-xl p-3 border border-white/[0.04]">
          <div className="w-9 h-9 rounded-lg bg-primary/15 border border-primary/20 flex items-center justify-center text-primary font-bold text-xs uppercase">
            {userName?.charAt(0) || "U"}
          </div>
          <div className="ml-3 flex-1 overflow-hidden">
            <p className="text-sm font-medium text-white truncate">{userName || "User"}</p>
            <p className="text-[10px] text-primary/60 uppercase tracking-[0.15em] font-mono truncate">{userRole}</p>
          </div>
          <SignOutButton />
        </div>
      </div>
    </aside>
  );
}
