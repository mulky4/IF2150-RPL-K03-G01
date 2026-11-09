import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="border-border bg-card hidden border-t md:block">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-6 px-6 py-6 lg:px-30">
        <div className="flex items-center gap-4">
          <Logo />
          <p className="text-caption text-text-secondary">
            © 2026 RekanBumi · Mendukung SDG 13 &amp; SDG 15
          </p>
        </div>
        <nav
          aria-label="Tautan footer"
          className="text-label text-primary flex gap-6"
        >
          <span>Tentang</span>
          <span>Kebijakan Privasi</span>
          <span>Bantuan</span>
        </nav>
      </div>
    </footer>
  );
}
