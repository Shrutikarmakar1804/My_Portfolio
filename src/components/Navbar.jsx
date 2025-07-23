import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

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

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 10);
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<nav
			className={cn(
				" top-0 left-0 w-full z-50 transition-all duration-300",
				isScrolled
					? "py-2 bg-background/80 backdrop-blur-lg shadow-xl border-b border-border"
					: "py-6 bg-background/60"
			)}
		>
			<div className="container px-4 md:px-8 flex justify-between items-center">
				{/* Logo */}
				<a
					href="#hero"
					className="text-2xl font-extrabold tracking-tight flex items-center gap-2 select-none"
				>
					<span className="bg-gradient-to-r from-primary via-pink-500 to-foreground bg-clip-text text-transparent animate-text-glow drop-shadow-lg">
						<svg
							width="32"
							height="32"
							viewBox="0 0 32 32"
							fill="none"
							className="mr-2"
						>
							<circle
								cx="16"
								cy="16"
								r="14"
								stroke="url(#paint0_linear)"
								strokeWidth="3"
								fill="url(#paint1_radial)"
							/>
							<defs>
								<linearGradient
									id="paint0_linear"
									x1="0"
									y1="0"
									x2="32"
									y2="32"
									gradientUnits="userSpaceOnUse"
								>
									<stop stopColor="#a21caf" />
									<stop offset="1" stopColor="#f472b6" />
								</linearGradient>
								<radialGradient
									id="paint1_radial"
									cx="0"
									cy="0"
									r="1"
									gradientTransform="translate(16 16) scale(14)"
									gradientUnits="userSpaceOnUse"
								>
									<stop stopColor="#f3e8ff" />
									<stop offset="1" stopColor="#f472b6" stopOpacity="0.3" />
								</radialGradient>
							</defs>
						</svg>{" "}
						Shruti's Portfolio
					</span>
				</a>

				{/* Desktop Nav */}
				<div className="hidden md:flex items-center gap-8">
					{navItems.map((item, index) => (
						<a
							key={index}
							href={item.href}
							className="relative group text-base font-semibold text-foreground hover:text-primary transition-colors duration-300 px-2 py-1"
						>
							{item.name}
							<span className="absolute left-0 -bottom-1 h-[3px] w-0 bg-gradient-to-r from-primary to-pink-400 rounded-full transition-all duration-300 group-hover:w-full" />
						</a>
					))}
					<a
						href="#contact"
						className="ml-4 px-5 py-2 rounded-full bg-gradient-to-r from-primary to-pink-500 text-white font-bold shadow-lg hover:scale-105 transition-transform duration-200"
					>
						Hire Me
					</a>
				</div>

				{/* Mobile Menu Button */}
				<button
					onClick={() => setIsMenuOpen(!isMenuOpen)}
					className="md:hidden p-2 z-[60] text-foreground rounded-full bg-background/70 shadow-lg border border-border hover:bg-primary/10 transition"
					aria-label={isMenuOpen ? "Close menu" : "Open menu"}
				>
					{isMenuOpen ? <X size={28} /> : <Menu size={28} />}
				</button>

				{/* Mobile Menu Overlay */}
				<div
					className={cn(
						"fixed inset-0 z-40 bg-background/95 backdrop-blur-xl flex flex-col items-center justify-center space-y-10 transition-all duration-300 md:hidden",
						isMenuOpen
							? "translate-x-0 opacity-100 pointer-events-auto"
							: "translate-x-full opacity-0 pointer-events-none"
					)}
				>
					<button
						onClick={() => setIsMenuOpen(false)}
						className="absolute top-6 right-6 p-2 rounded-full bg-background/80 shadow border border-border"
						aria-label="Close menu"
					>
						<X size={28} />
					</button>
					{navItems.map((item, index) => (
						<a
							key={index}
							href={item.href}
							onClick={() => setIsMenuOpen(false)}
							className="text-3xl font-extrabold text-foreground hover:text-primary transition-colors duration-300 tracking-wide"
						>
							{item.name}
						</a>
					))}
					<a
						href="#contact"
						onClick={() => setIsMenuOpen(false)}
						className="mt-4 px-8 py-3 rounded-full bg-gradient-to-r from-primary to-pink-500 text-white font-bold shadow-lg hover:scale-105 transition-transform duration-200 text-xl"
					>
						Hire Me
					</a>
				</div>
			</div>
		</nav>
	);
};
