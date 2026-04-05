
// ═══════════════════════════════════════════════════
// FILE: src/components/Navbar.tsx
// Design: Dark nav, blue accent, MENU text + hamburger lines
// ═══════════════════════════════════════════════════
import { useState, useEffect } from "react";
import { C } from "../constants/colors";

const NAV_LINKS = [
  { id: "home",     label: "Accueil" },
  { id: "services", label: "Services" },
  { id: "demo",     label: "Démo Live" },
  { id: "about",    label: "À Propos" },
  { id: "contact",  label: "Contact" },
];

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false);
  const [active,    setActive]    = useState("home");
  const [menuOpen,  setMenuOpen]  = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const go = (id: string) => {
    setActive(id);
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        background: scrolled ? "rgba(6,10,20,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(24px)" : "none",
        borderBottom: scrolled ? `1px solid ${C.border}` : "none",
        transition: "all .4s cubic-bezier(.25,.46,.45,.94)",
      }}>
        <div style={{
          maxWidth: 1200, margin: "0 auto",
          padding: "0 clamp(16px,4vw,32px)",
          height: 68, display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>

          {/* Logo */}
          <button onClick={() => go("home")} style={{
            background: "none", border: "none", cursor: "pointer",
            display: "flex", alignItems: "center", gap: 10,
          }}>
            <div style={{
              width: 32, height: 32, borderRadius: "50%",
              background: `linear-gradient(135deg, ${C.blue}, ${C.cyan})`,
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: `0 0 16px ${C.blueGlow}`,
            }}>
              <span style={{ color: "#fff", fontSize: 14, fontWeight: 900, fontFamily: "'Syne',sans-serif" }}>R</span>
            </div>
            <span style={{
              fontFamily: "'Syne',sans-serif", fontSize: 20, fontWeight: 700,
              color: C.white, letterSpacing: -0.5,
            }}>RushAI</span>
          </button>

          {/* Desktop nav links */}
          <div className="nav-links" style={{ display: "flex", gap: 36, alignItems: "center" }}>
            {NAV_LINKS.map(({ id, label }) => (
              <button key={id} onClick={() => go(id)} style={{
                background: "none", border: "none", cursor: "pointer",
                fontFamily: "'DM Sans',sans-serif", fontSize: 14, fontWeight: 400,
                color: active === id ? C.white : C.textSec,
                transition: "color .2s",
                padding: "4px 0",
                borderBottom: active === id ? `1.5px solid ${C.blue}` : "1.5px solid transparent",
              }}
                onMouseEnter={e => (e.target as HTMLElement).style.color = C.white}
                onMouseLeave={e => { if (active !== id) (e.target as HTMLElement).style.color = C.textSec; }}
              >{label}</button>
            ))}
          </div>

          {/* Desktop CTA */}
          <button className="nav-cta-d" onClick={() => go("contact")} style={{
            padding: "9px 22px", borderRadius: 8,
            background: `linear-gradient(135deg, ${C.blue}, ${C.blueBright})`,
            color: "#fff", border: "none", cursor: "pointer",
            fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: 13.5,
            boxShadow: `0 4px 20px ${C.blueGlow}`,
            transition: "box-shadow .2s, transform .15s",
          }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = `0 6px 30px rgba(59,130,246,.5)`; (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = `0 4px 20px ${C.blueGlow}`; (e.currentTarget as HTMLElement).style.transform = ""; }}
          >Parlons-en →</button>

          {/* ── Hamburger: "MENU" text + lines ── */}
          <button className="ham-btn" onClick={() => setMenuOpen(o => !o)} aria-label="Menu">
            <span className="ham-label">MENU</span>
            <span className="ham-lines">
              <span style={{ transform: menuOpen ? "rotate(45deg) translate(5px,5px)" : "" }}/>
              <span style={{ opacity: menuOpen ? 0 : 1 }}/>
              <span style={{ transform: menuOpen ? "rotate(-45deg) translate(5px,-5px)" : "" }}/>
            </span>
          </button>
        </div>
      </nav>

      {/* ── Mobile full-screen menu ── */}
      <div className={`mob-menu${menuOpen ? " open" : ""}`}>
        {NAV_LINKS.map(({ id, label }) => (
          <button key={id} onClick={() => go(id)} style={{
            background: "none", border: "none", cursor: "pointer",
            fontFamily: "'Syne',sans-serif", fontSize: 36, fontWeight: 700,
            color: active === id ? C.blue : C.textPrim,
            transition: "color .2s",
          }}>{label}</button>
        ))}
        <button onClick={() => go("contact")} style={{
          padding: "14px 36px", borderRadius: 10,
          background: `linear-gradient(135deg, ${C.blue}, ${C.blueBright})`,
          color: "#fff", border: "none", cursor: "pointer",
          fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: 16,
          boxShadow: `0 6px 24px ${C.blueGlow}`,
        }}>Parlons-en →</button>
      </div>
    </>
  );
}


