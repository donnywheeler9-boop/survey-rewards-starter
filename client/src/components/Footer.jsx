import React, { useState, useEffect } from "react";
import Modal from "./Modal";

// প্রতিটা সেকশন ব্লক আকারে রেন্ডার করার জন্য
function ContentBlocks({ text }) {
  if (!text) return null;
  const sections = text.trim().split(/\n\s*\n+/); // ফাঁকা লাইনে ভাগ করা
  return (
    <div className="space-y-4 text-sm">
      {sections.map((sec, i) => (
        <section
          key={i}
          className="rounded-xl border border-teal-400/70 bg-teal-400/5 overflow-hidden"
        >
          <div className="px-4 py-3 text-gray-200 whitespace-pre-wrap leading-relaxed">
            {sec}
          </div>
        </section>
      ))}
    </div>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(null);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // client/public/legal থেকে টেক্সট লোড করা
  useEffect(() => {
    if (!active) return;
    const fileMap = {
      privacy: "/legal/data-privacy.txt",
      terms: "/legal/terms.txt",
      imprint: "/legal/imprint.txt",
      dnsmpi: "/legal/do-not-sell.txt",
    };
    const file = fileMap[active];
    if (!file) return;

    setLoading(true);
    setError("");
    setContent("");

    fetch(file)
      .then((res) => {
        if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
        return res.text();
      })
      .then((txt) => setContent(txt))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [active]);

  const openModal = (key) => {
    setActive(key);
    setOpen(true);
  };

  const LinkBtn = ({ children, onClick }) => (
    <button
      onClick={onClick}
      className="hover:text-white transition text-left"
      type="button"
    >
      {children}
    </button>
  );

  return (
    <footer className="w-full bg-gray-900 text-gray-300 border-t border-white/10">
      <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between text-sm">
        {/* Left: copyright */}
        <div className="font-medium">
          © {year} <span className="lowercase">surveyrewards</span>
        </div>

        {/* Right: modal-trigger buttons */}
        <nav className="flex items-center gap-6">
          <LinkBtn onClick={() => openModal("privacy")}>Data Privacy</LinkBtn>
          <LinkBtn onClick={() => openModal("terms")}>Terms</LinkBtn>
          <LinkBtn onClick={() => openModal("imprint")}>Imprint</LinkBtn>
          <LinkBtn onClick={() => openModal("dnsmpi")}>Do not sell my personal info</LinkBtn>
        </nav>
      </div>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title={
          active === "privacy"
            ? "Data Privacy"
            : active === "terms"
            ? "Terms"
            : active === "imprint"
            ? "Imprint"
            : active === "dnsmpi"
            ? "Do not sell my personal info"
            : ""
        }
      >
        {loading && <p className="text-sm text-gray-400">Loading…</p>}
        {error && !loading && (
          <p className="text-sm text-red-300">Failed: {error}</p>
        )}
        {!loading && !error && <ContentBlocks text={content} />}
      </Modal>
    </footer>
  );
}
