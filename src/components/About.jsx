import React, { useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import Footer from './Footer';

const About = () => {
    const contentRef = useRef(null);
    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".about-section", {
                opacity: 0,
                y: 50,
                stagger: 0.3,
                duration: 1,
                ease: "power3.out"
            });
        }, contentRef);

        return () => ctx.revert();
    }, []);

    return (
        <>
            <div className="min-h-screen bg-black text-white" ref={contentRef}>
                <div className="p-8 md:p-24">
                    <header className="mb-20">
                        <h1 className="text-5xl md:text-8xl font-bold tracking-tighter uppercase">
                            Novix Studios <span className="text-[#e32626]">Manifesto</span>
                        </h1>
                    </header>

                    <div className="max-w-4xl space-y-20">
                        <section className="about-section">
                            <h2 className="text-red-500 font-medium mb-4 text-xl">Our Philosophy</h2>
                            <p className="text-2xl md:text-4xl leading-tight font-medium">
                                At Novix Studios, we believe that the digital landscape is more than just a collection of pixels and code - it is a living, breathing extension of a brand’s soul. We sit at the volatile intersection of raw artistic expression and disciplined technical architecture. Our mission is not simply to build websites, but to construct digital ecosystems that resonate, engage, and endure. We don't just follow trends; we dissect them to understand why they work, then we build something better.
                            </p>
                        </section>

                        <section className="about-section">
                            <h2 className="text-red-500 font-medium mb-4 text-xl">Design & Logic</h2>
                            <p className="text-2xl md:text-4xl leading-tight font-medium">
                                "Designing Ideas, Developing Impact" is not just our tagline; it is our operational framework. We merge aesthetic brilliance with robust functionality, ensuring that every interaction feels intuitive and every visual tells a story. We challenge the ordinary to deliver the extraordinary.
                            </p>
                        </section>

                        <section className="about-section">
                            <h2 className="text-red-500 font-medium mb-4 text-xl">Client Partnership</h2>
                            <p className="text-2xl md:text-4xl leading-tight font-medium">
                                We don't work for you; we work with you. Your vision is our blueprint. We translate your abstract ideas into concrete digital realities, maintaining transparency, agility, and a relentless focus on quality throughout the journey.
                            </p>
                        </section>
                    </div>
                </div>
            </div>
            <div className="flex justify-center py-12">
                <Link
                    to="/"
                    className="hero-btn group inline-flex items-center gap-4 bg-red-600 hover:bg-red-700 text-white px-6 py-4 rounded-full transition-all duration-300 shadow-[0_0_25px_rgba(239,68,68,0.35)] hover:shadow-[0_0_40px_rgba(239,68,68,0.55)] cursor-pointer"
                >
                    <span>Back to Home</span>
                    <span className="hero-arrow transition-transform duration-300 group-hover:-translate-x-1">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M5 12H19M19 12L12 5M19 12L12 19"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </span>
                </Link>
            </div>
            <Footer />
        </>
    );
};

export default About;
