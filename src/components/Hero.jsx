import React, { useLayoutEffect, useRef } from "react";
import { Link } from 'react-router-dom';
import gsap from "gsap";

const Hero = () => {
    const component = useRef(null);

    useLayoutEffect(() => {
        // Animation handled by Preloader component now

        const ctx = gsap.context(() => {
            const tl = gsap.timeline();

            // Reveal Animation
            tl.fromTo(".hero-text-line",
                { y: 100, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1.5,
                    ease: "power4.out",
                    stagger: 0.2
                }
            )
                .fromTo(".hero-sub",
                    { y: 50, opacity: 0 },
                    { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
                    "-=0.5"
                )
                .fromTo(".hero-btn",
                    { scale: 0.8, opacity: 0 },
                    { scale: 1, opacity: 1, duration: 1, ease: "elastic.out(1, 0.5)" },
                    "-=0.8"
                );

            // Floating Animation for Shapes
            gsap.to(".geo-shape", {
                y: -20,
                rotation: 360,
                duration: 10,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                stagger: {
                    each: 2,
                    from: "random"
                }
            });
            // Glitch Text Effect
            const glitchAnimation = () => {
                if (!component.current) return;
                const chars = component.current.querySelectorAll(".glitch-char");
                if (!chars.length) return;

                const target = gsap.utils.random(Array.from(chars));
                if (!target) return;

                // Store original text
                if (!target.dataset.original) target.dataset.original = target.textContent;
                const originalText = target.dataset.original;

                const binary = Math.random() > 0.5 ? "1" : "0";

                // Animation
                gsap.to(target, {
                    color: "#ef4444",
                    duration: 0.1,
                    onStart: () => {
                        target.textContent = binary;
                    },
                    onComplete: () => {
                        gsap.to(target, {
                            color: "white",
                            duration: 0.1,
                            onComplete: () => {
                                target.textContent = originalText;
                                // Recursively call with random delay
                                gsap.delayedCall(gsap.utils.random(2, 5), glitchAnimation);
                            }
                        });
                    }
                });
            };

            // Start glitch loop after reveal
            gsap.delayedCall(2, glitchAnimation);
        }, component);

        return () => ctx.revert();

    }, []);

    return (
        <section ref={component} id="home" className="h-screen flex flex-col justify-center px-6 text-left relative z-10 overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-800/20 via-black to-black -z-10"></div>

            <h1 className="
                hero-text-line
                font-heading
                text-white/95
                text-5xl md:text-7xl lg:text-8xl
                font-bold
                tracking-tight
                leading-[1.05]
            ">
                {"Designing Ideas".split("").map((char, index) => (
                    <span key={`l1-${index}`} className="glitch-char inline-block">{char === " " ? "\u00A0" : char}</span>
                ))}
                <br />
                {"Developing Impact".split("").map((char, index) => (
                    <span key={`l2-${index}`} className="glitch-char inline-block">{char === " " ? "\u00A0" : char}</span>
                ))}
            </h1>

            <p className="
                hero-sub
                font-body
                mt-8
                max-w-3xl
                text-lg md:text-xl
                font-medium
                leading-relaxed
                bg-gradient-to-r from-red-500 to-red-300
                bg-clip-text text-transparent
            ">
                We blend creativity and technology to craft meaningful digital experiences.
            </p>

            <div className="mt-10">
                <Link
                    to="/who-we-are"
                    className="hero-btn group inline-flex items-center gap-4 bg-red-600 hover:bg-red-700 text-white px-6 py-4 rounded-full transition-all duration-300 shadow-[0_0_25px_rgba(239,68,68,0.35)] hover:shadow-[0_0_40px_rgba(239,68,68,0.55)] cursor-pointer"
                >
                    <span className="text-lg font-semibold">
                        Who We Are
                    </span>
                    <span className="flex items-center justify-center w-10 h-10 rounded-full bg-white/20 group-hover:bg-white/30 transition-all duration-300">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="hero-arrow w-5 h-5 text-white transition-transform duration-300 group-hover:translate-x-1"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M5 12h14m-6-6 6 6-6 6"
                            />
                        </svg>
                    </span>
                </Link>
            </div>

            {/* Geometric Shapes */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none -z-5 overflow-hidden">
                {/* Cube/Square */}
                <div className="geo-shape absolute top-1/4 right-[10%] w-24 h-24 border border-white/10 rounded-xl bg-white/5 backdrop-blur-sm"></div>

                {/* Circle */}
                <div className="geo-shape absolute bottom-1/3 right-[15%] w-32 h-32 border border-red-500/20 rounded-full bg-red-500/5 backdrop-blur-sm"></div>

                {/* Triangle (using clip-path) */}
                <div className="geo-shape absolute top-1/3 right-[25%] w-20 h-20 bg-slate-700/10 backdrop-blur-sm" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}></div>
            </div>
        </section >
       
    );
}

export default React.memo(Hero);
