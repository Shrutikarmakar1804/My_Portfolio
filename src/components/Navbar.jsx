import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

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
        };
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const handleNavClick = (href) => {
        setActive(href);
        setIsMenuOpen(false);
    };

    return (
        <nav
            className={cn(
                "fixed w-full z-40 transition-all duration-300 border-b",
                isScrolled
                    ? "py-3 bg-background/80 backdrop-blur-md shadow-md border-primary/10"
                    : "py-5 border-transparent"
            )}
        >
            <div className="container flex items-center justify-between">
                <a
                    className="text-xl font-bold flex items-center gap-2"
                    href="#hero"
                >
                    <span className="relative z-10 bg-gradient-to-r from-primary to-pink-500 bg-clip-text text-transparent drop-shadow">
                        Shruti's
                    </span>
                    <span className="text-foreground">Portfolio</span>
                </a>

                {/* desktop nav */}
                <div className="hidden md:flex items-center space-x-8">
                    {navItems.map((item) => (
                        <a
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "mx-2 text-base font-medium transition-colors duration-300 relative group",
                                active === item.href
                                    ? "text-primary"
                                    : "text-foreground hover:text-primary"
                            )}
                            onClick={() => handleNavClick(item.href)}
                        >
                            {item.name}
                            <span className="block h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 rounded-full mt-1" />
                        </a>
                    ))}
                </div>

                {/* Mobile Nav */}
                <button
                    onClick={() => setIsMenuOpen((prev) => !prev)}
                    className="md:hidden p-2 text-foreground z-50"
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                >
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                <div
                    className={cn(
                        "fixed inset-0 bg-background/95 backdrop-blur-md z-40 flex flex-col items-center justify-center transition-all duration-300 md:hidden",
                        isMenuOpen
                            ? "opacity-100 pointer-events-auto translate-x-0"
                            : "opacity-0 pointer-events-none translate-x-full"
                    )}
                    style={{ transitionProperty: "opacity, transform" }}
                >
                    <div className="flex flex-col space-y-8 text-xl font-bold">
                        {navItems.map((item) => (
                            <a
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "text-foreground/80 hover:text-primary transition-colors duration-300",
                                    active === item.href && "text-primary"
                                )}
                                onClick={() => handleNavClick(item.href)}
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