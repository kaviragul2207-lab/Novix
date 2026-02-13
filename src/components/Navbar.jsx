import { useState, useRef, useLayoutEffect } from "react";
import { Link } from 'react-router-dom';
import gsap from "gsap";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);
    const overlayRef = useRef(null);
    const tl = useRef(null);
    const buttonRef = useRef(null);
    const logoRef = useRef(null);

    // Initialize Animations
    useLayoutEffect(() => {
        // Entrance Animation for Logo and Button
        const ctx = gsap.context(() => {
            gsap.fromTo([logoRef.current, buttonRef.current],
                { y: -50, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, ease: "power4.out", stagger: 0.2, delay: 0.5 }
            );

            // Menu Timeline
            tl.current = gsap.timeline({ paused: true });
            tl.current
                .to(overlayRef.current, {
                    opacity: 1,
                    pointerEvents: "all",
                    duration: 0.5,
                    ease: "power3.inOut"
                })
                .fromTo(
                    menuRef.current.children,
                    { x: 100, opacity: 0 }, // Changed from y to x
                    { x: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: "power4.out" },
                    "-=0.2"
                );
        });

        return () => {
            tl.current?.kill();
            ctx.revert();
        };
    }, []);

    // Handle Open/Close Animation
    useLayoutEffect(() => {
        if (isOpen) {
            tl.current.play();
        } else {
            tl.current.reverse();
        }
    }, [isOpen]);

    const scrollToSection = (id) => {
        setIsOpen(false);
        const element = document.getElementById(id);
        if (element) {
            // Wait for menu to close before scrolling
            setTimeout(() => {
                element.scrollIntoView({ behavior: "smooth" });
            }, 600);
        }
    };

    return (
        <>
            {/* 1. Logo (Fixed Top-Left) */}
            <div ref={logoRef} className="relative top-8 left-8 z-[60]">
                <img
                    src="Novix logo.png"
                    alt="NOVIX STUDIOS"
                    className="h-12 md:h-16 w-auto cursor-pointer object-contain hover:opacity-80 transition-opacity"
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                />
            </div>

            {/* 2. Floating Circular Menu Button (Fixed Top-Right) */}
            <div className="absolute top-8 right-8 z-[60]">
                <button
                    ref={buttonRef}
                    onClick={() => setIsOpen(!isOpen)}
                    className="relative w-10 h-10 backdrop-blur-md /20 flex items-center justify-center text-white hover: hover:border-red-600 transition-all duration-300 group shadow-lg opacity-0"
                    aria-label="Toggle Menu"
                >
                    {/* Hamburger / Close Icon Logic */}
                    <div className="relative w-6 h-5 overflow-hidden">
                        <span className={`absolute top-0 left-0 w-full h-0.5 bg-white transition-all duration-300 ${isOpen ? "rotate-45 top-2.5" : "top-0"}`}></span>
                        <span className={`absolute top-1/2 left-0 w-full h-0.5 bg-white transition-all duration-300 -translate-y-1/2 ${isOpen ? "opacity-0 translate-x-full" : "opacity-100"}`}></span>
                        <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-white transition-all duration-300 ${isOpen ? "-rotate-45 bottom-2" : "bottom-0"}`}></span>
                    </div>
                </button>
            </div>

            {/* 3. Full-Screen Menu Overlay */}
            <div
                ref={overlayRef}
                className="fixed inset-0 z-50 opacity-0 pointer-events-none flex flex-col items-end justify-center pr-10 md:pr-20 bg-black/60 backdrop-blur-sm bg-gradient-to-l from-black via-black/40 to-transparent"
            >
                {/* Menu List */}
                <ul ref={menuRef} className="space-y-6 text-right">
                    {['Home', 'Services', 'Process', 'Contact'].map((item, index) => (
                        <li key={index} className="overflow-hidden">
                            <Link
                                to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                                onClick={() => setIsOpen(false)}
                                className="text-4xl md:text-6xl font-bold text-white uppercase tracking-tighter hover:text-red-500 transition-colors duration-300 block cursor-pointer"
                            >
                                {item}
                            </Link>

                        </li>

                    ))}

                </ul>

            </div>

        </>

    );

}
