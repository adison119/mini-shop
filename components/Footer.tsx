export default function Footer() {
  return (
    <footer className="border-t border-foreground/20 bg-background">
      <div className="mx-auto max-w-6xl px-4 py-8 text-xs text-foreground/60">
        © {new Date().getFullYear()} Mini Shop — All rights reserved.
      </div>
    </footer>
    
  );
}
