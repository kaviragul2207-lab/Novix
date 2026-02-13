import React, { useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ServiceIcon = ({ type }) => {

    if (type === "IT Services") {
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-12 h-12 text-red-500"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 6.75h15m-15 4.5h15m-15 4.5h15"
                />
            </svg>
        );
    }

    if (type === "Digital Marketing") {
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-12 h-12 text-red-500"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 3v18h18M7.5 15l3-3 3 2.25L18 9"
                />
            </svg>
        );
    }

    if (type === "Business Consultancy") {
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-12 h-12 text-red-500"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.5 6.75V5.25A2.25 2.25 0 0014.25 3h-4.5A2.25 2.25 0 007.5 5.25v1.5M3.75 9h16.5v8.25A2.25 2.25 0 0118 19.5H6A2.25 2.25 0 013.75 17.25V9z"
                />
            </svg>
        );
    }


    return null;
};

export default function Services() {
    const sectionRef = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Card Entrance
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                }
            });

            tl.fromTo(".service-card",
                { y: 100, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.2,
                    ease: "power3.out"
                }
            );

            // Staggered Text Reveal within cards
            // This runs after cards appear, or we can sequence it.
            // Let's just create a scrolltrigger for the text to slide up slightly.
            gsap.fromTo(".service-content",
                { y: 20, opacity: 0 },
                {
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 70%",
                    },
                    y: 0,
                    opacity: 1,
                    duration: 0.6,
                    stagger: 0.1,
                    ease: "power2.out",
                    delay: 0.5 // Wait for cards to start appearing
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const services = [
        {
            type: "IT Services",
            title: "IT Services",
            tagline: "Powering your digital core with resilient architecture.",
            desc: "We don't just write code; we build scalable digital foundations. From custom software architecture to cloud-based efficiency, we ensure your business infrastructure is fast, secure, and ready for future growth."
        },
        {
            type: "Digital Marketing",
            title: "Digital Marketing",
            tagline: "Precision-targeted strategies for a saturated market.",
            desc: "Visibility is only the beginning. We leverage data-driven insights and creative storytelling to place your brand in front of the right eyes. Our focus is on high-conversion funnels that turn passive scrollers into loyal advocates."
        },
        {
            type: "Business Consultancy",
            title: "Business Consultancy",
            tagline: "Bridging the gap between vision and market reality.",
            desc: "Scale with confidence. We provide the strategic roadmap needed to navigate complex market shifts. By analyzing your operations and identifying untapped potential, we help you transform ambitious ideas into sustainable, profitable realities."
        }
    ];

    return (
        <section id="services" ref={sectionRef} className="py-24 px-6 md:px-12 bg-black text-white relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold mb-16 text-center tracking-tight">
                Our <span className="text-red-500">Services</span>
            </h2>

            <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto group/list">
                {services.map((service, i) => (
                    <div
                        key={i}
                        className="service-card group bg-gradient-to-b from-slate-900 to-black border border-white/10 p-8 rounded-xl hover:border-red-500/40 transition-all duration-500 hover:shadow-[0_0_30px_rgba(239,68,68,0.15)] relative overflow-hidden group-hover/list:hover:opacity-100 group-hover/list:opacity-50"
                    >
                        <div className="absolute inset-0 bg-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                        <div className="mb-6 bg-slate-800/50 w-20 h-20 rounded-lg flex items-center justify-center group-hover:bg-red-500/10 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                            <ServiceIcon type={service.type} />
                        </div>

                        <div className="service-content">
                            <h3 className="text-2xl font-bold mb-2 text-white group-hover:text-red-400 transition-colors">{service.title}</h3>
                            <p className="text-red-500 font-medium mb-4 text-sm uppercase tracking-wider">{service.tagline}</p>
                            <p className="text-slate-400 leading-relaxed text-base group-hover:text-slate-200 transition-colors">
                                {service.desc}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
