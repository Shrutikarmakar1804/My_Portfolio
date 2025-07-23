import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils"; // optional, for class merging

const navItems = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [active, setActive] = useState("#hero");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);

      // Optional: scrollspy logic
      const current = navItems.find((item) => {
        const el = document.querySelector(item.href);
        return el && window.scrollY >= el.offsetTop - 80;
      });
      if (current) setActive(current.href);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href) => {
    setActive(href);
    setIsMenuOpen(false);
  };

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 w-full z-50 border-b transition-all duration-300",
        isScrolled
          ? "py-3 bg-background/80 backdrop-blur-xl shadow-md border-primary/10"
          : "py-5 border-transparent"
      )}
    >
      <div className="container flex items-center justify-between px-4 md:px-8">
        {/* Logo */}
        <a href="#hero" className="text-2xl font-bold flex gap-2 items-center text-glow">
          <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent drop-shadow">
            Shruti's
          </span>
          <span className="text-foreground">Portfolio</span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-8">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => handleNavClick(item.href)}
              className={cn(
                "relative px-2 py-1 font-medium transition-all duration-300 group text-base",
                active === item.href
                  ? "text-primary glow-text"
                  : "text-foreground hover:text-primary hover:glow-text"
              )}
            >
              {item.name}
              <span
                className={cn(
                  "absolute left-0 -bottom-1 h-0.5 w-full origin-left scale-x-0 bg-primary transition-transform duration-300 group-hover:scale-x-100",
                  active === item.href && "scale-x-100"
                )}
              />
            </a>
          ))}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="md:hidden p-2 text-foreground z-50"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Menu Panel */}
        <div
          className={cn(
            "fixed inset-0 bg-background/95 backdrop-blur-2xl z-40 flex flex-col items-center justify-center transition-all duration-500 md:hidden",
            isMenuOpen
              ? "opacity-100 pointer-events-auto translate-x-0"
              : "opacity-0 pointer-events-none translate-x-full"
          )}
          style={{ transitionProperty: "opacity, transform" }}
        >
          <div className="flex flex-col space-y-8 text-2xl font-bold">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => handleNavClick(item.href)}
                className={cn(
                  "transition-all duration-300 hover:scale-105",
                  active === item.href
                    ? "text-primary glow-text"
                    : "text-foreground/80 hover:text-primary hover:glow-text"
                )}
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};
