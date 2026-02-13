import { useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Process() {
    const sectionRef = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Title Entrance
            gsap.fromTo(".process-title",
                { y: 50, opacity: 0 },
                {
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 80%",
                        toggleActions: "play none none reverse"
                    },
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    ease: "power3.out"
                }
            );

            // Pinned Sequence
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "+=2000",
                    pin: true,
                    scrub: 1,
                }
            });

            // Step 1: Fade In
            tl.to(".process-step-1", { opacity: 1, duration: 1, ease: "power2.out" })
                .to(".process-step-1", { opacity: 0, scale: 0.9, duration: 1, ease: "power2.in" }, "+=0.5")

                // Step 2
                .fromTo(".process-step-2",
                    { opacity: 0, scale: 1.1 },
                    { opacity: 1, scale: 1, duration: 1, ease: "power2.out" }
                )
                .to(".process-step-2", { opacity: 0, scale: 0.9, duration: 1, ease: "power2.in" }, "+=0.5")

                // Step 3
                .fromTo(".process-step-3",
                    { opacity: 0, scale: 1.1 },
                    { opacity: 1, scale: 1, duration: 1, ease: "power2.out" }
                );

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const steps = [
        { id: 1, text: "We Build", sub: "Robust foundations for scalable growth." },
        { id: 2, text: "We Scale", sub: "Optimizing performance for mass adoption." },
        { id: 3, text: "We Deliver", sub: "On-time, value-driven results." },
    ];

    return (
        <section id="process" ref={sectionRef} className="h-screen flex flex-col items-center justify-center bg-black text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900/40 via-black to-black"></div>

            <div className="relative z-10 w-full max-w-4xl px-4 text-center">
                <h2 className="process-title text-sm md:text-base mb-20 text-red-500 font-bold uppercase tracking-[0.3em]">Our Methodology</h2>

                <div className="relative h-[200px] flex items-center justify-center">
                    {steps.map((step) => (
                        <div key={step.id} className={`process-step-${step.id} absolute inset-0 flex flex-col items-center justify-center opacity-0`}>
                            <h3 className="text-5xl md:text-8xl font-black text-white tracking-tight mb-4 drop-shadow-2xl">
                                {step.text}
                            </h3>
                            <p className="text-gray-400 text-lg md:text-2xl font-light">{step.sub}</p>
                        </div>
                    ))}
                </div>
            </div>

        </section>
    );
}
