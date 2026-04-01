// src/components/Navbar.tsx
import { useState, useEffect } from "react";
import { C } from "../constants/colors";

const LINKS = [
  { id: "home", L: "Accueil" },
  { id: "services", L: "Services" },
  { id: "demo", L: "Démo Live" },
  { id: "about", L: "À Propos" },
  { id: "contact", L: "Contact" }
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);

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
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: scrolled ? "rgba(248,250,255,.94)" : "transparent",
        backdropFilter: scrolled ? "blur(24px)" : "none",
        borderBottom: scrolled ? `1px solid ${C.border}` : "none",
        transition: "all .4s"
      }}>
        <div style={{
          maxWidth: 1180,
          margin: "0 auto",
          padding: "0 clamp(16px,4vw,28px)",
          height: 68,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        }}>
          <div style={{
            fontFamily: "'Syne',sans-serif",
            fontSize: 22,
            fontWeight: 800,
            letterSpacing: -1,
            display: "flex",
            alignItems: "center",
            gap: 4,
            cursor: "pointer"
          }} onClick={() => go("home")}>
            <span style={{
              background: `linear-gradient(135deg,${C.teal},${C.blue})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}>Rush</span>
            <span style={{ color: C.text }}>AI</span>
            <div style={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: C.green,
              marginLeft: 3,
              boxShadow: `0 0 9px ${C.green}88`,
              animation: "pulse 2.2s infinite"
            }} />
          </div>

          <div className="nav-links" style={{ display: "flex", gap: 32, alignItems: "center" }}>
            {LINKS.map(({ id, L }) => (
              <button
                key={id}
                onClick={() => go(id)}
                style={{
                  background: "none",
                  border: "none",
                  fontFamily: "'DM Sans',sans-serif",
                  fontSize: 14,
                  fontWeight: active === id ? 600 : 400,
                  color: active === id ? C.teal : C.muted,
                  transition: "color .2s",
                  padding: 0,
                  cursor: "pointer"
                }}
                onMouseEnter={e => { if (active !== id) e.currentTarget.style.color = C.text; }}
                onMouseLeave={e => { if (active !== id) e.currentTarget.style.color = C.muted; }}
              >
                {L}
              </button>
            ))}
          </div>

          <button
            className="nav-cta-d"
            onClick={() => go("contact")}
            style={{
              padding: "9px 24px",
              borderRadius: 11,
              background: `linear-gradient(135deg,${C.teal},${C.blue})`,
              border: "none",
              color: "white",
              fontWeight: 700,
              fontSize: 13.5,
              fontFamily: "'Syne',sans-serif",
              boxShadow: `0 4px 20px ${C.shadow}`,
              transition: "all .25s",
              cursor: "pointer"
            }}
            onMouseEnter={e => {
              e.currentTarget.style.boxShadow = `0 6px 30px ${C.shadow}`;
              e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.boxShadow = `0 4px 20px ${C.shadow}`;
              e.currentTarget.style.transform = "";
            }}
          >
            Parlons-en →
          </button>

          <button
            className="ham-btn"
            onClick={() => setMenuOpen(o => !o)}
            style={{
              display: "none",
              flexDirection: "column",
              gap: "5px",
              background: "none",
              border: "none",
              padding: "6px",
              zIndex: 999,
              cursor: "pointer"
            }}
          >
            <span style={{
              display: "block",
              width: 24,
              height: 2,
              background: C.text,
              borderRadius: 2,
              transition: "all .3s",
              transform: menuOpen ? "rotate(45deg) translate(5px,5px)" : ""
            }} />
            <span style={{
              display: "block",
              width: 24,
              height: 2,
              background: C.text,
              borderRadius: 2,
              transition: "all .3s",
              opacity: menuOpen ? 0 : 1
            }} />
            <span style={{
              display: "block",
              width: 24,
              height: 2,
              background: C.text,
              borderRadius: 2,
              transition: "all .3s",
              transform: menuOpen ? "rotate(-45deg) translate(5px,-5px)" : ""
            }} />
          </button>
        </div>
      </nav>

      <div className={`mob-menu${menuOpen ? " open" : ""}`} style={{
        display: menuOpen ? "flex" : "none",
        position: "fixed",
        inset: 0,
        background: "rgba(248,250,255,.97)",
        backdropFilter: "blur(20px)",
        zIndex: 998,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "32px"
      }}>
        {LINKS.map(({ id, L }) => (
          <button
            key={id}
            onClick={() => go(id)}
            style={{
              background: "none",
              border: "none",
              fontFamily: "'Syne',sans-serif",
              fontSize: 28,
              fontWeight: 700,
              color: active === id ? C.teal : C.text,
              transition: "color .2s",
              cursor: "pointer"
            }}
          >
            {L}
          </button>
        ))}
        <button
          onClick={() => go("contact")}
          style={{
            padding: "14px 40px",
            borderRadius: 14,
            background: `linear-gradient(135deg,${C.teal},${C.blue})`,
            border: "none",
            color: "white",
            fontWeight: 800,
            fontSize: 16,
            fontFamily: "'Syne',sans-serif",
            boxShadow: `0 6px 24px ${C.shadow}`,
            marginTop: 8,
            cursor: "pointer"
          }}
        >
          Parlons-en →
        </button>
      </div>
    </>
  );
}