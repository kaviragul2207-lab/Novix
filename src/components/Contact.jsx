import { useRef, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
    const sectionRef = useRef(null);
    const formRef = useRef(null);
    const navigate = useNavigate();

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 70%",
                    toggleActions: "play none none reverse"
                }
            });

            // 1. General Title Reveal
            tl.fromTo(".contact-title-line",
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, ease: "power4.out", stagger: 0.1 }
            )
                .fromTo(".contact-sub",
                    { y: 20, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
                    "-=0.5"
                );

            // 2. Left Column: Why Work With Us (Staggered)
            tl.fromTo(".why-us-title",
                { x: -50, opacity: 0 },
                { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
                "-=0.3"
            )
                .fromTo(".why-us-item",
                    { x: -30, opacity: 0 },
                    { x: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "back.out(1.2)" },
                    "-=0.4"
                );

            // 3. Right Column: Form Stagger
            tl.fromTo(".contact-input",
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power2.out" },
                "-=0.2" // Overlap slightly with the end of the left column animation
            )
                .fromTo(".contact-btn",
                    { scale: 0.9, opacity: 0 },
                    { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.7)" },
                    "-=0.3"
                );

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="contact" ref={sectionRef} className="py-24 px-6 md:px-12 bg-black text-white relative">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_var(--tw-gradient-stops))] from-red-900/20 via-black to-black -z-10"></div>

            <div className="max-w-2xl mx-auto text-center mb-16">
                <div className="overflow-hidden">
                    <h2 className="contact-title-line text-3xl md:text-5xl font-bold mb-6 tracking-tight inline-block">
                        Get in <span className="text-red-500">Touch</span>
                    </h2>
                </div>
                <p className="contact-sub text-gray-400 text-lg">
                    Have a project in mind? Let's build something amazing together.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-16 max-w-7xl mx-auto items-start">

                {/* LEFT CONTENT */}
                <div className="space-y-8 self-center pl-4 md:pl-0">
                    <h3 className="why-us-title text-4xl font-bold relative inline-block">
                        Why <span className="text-red-500">Work With Us</span>
                        <span className="absolute -bottom-2 left-0 w-1/3 h-1 bg-red-600 rounded-full"></span>
                    </h3>

                    <ul className="space-y-6    text-slate-300">
                        {[
                            "Strategy-driven digital solutions",
                            "Modern, scalable technology stack",
                            "Clear communication & transparency",
                            "Long-term partnership mindset",
                        ].map((item, i) => (
                            <li key={i} className="why-us-item flex items-center gap-4 group cursor-default">
                                <div className="p-3 rounded-full bg-red-500/10 group-hover:bg-red-500/20 transition-colors duration-300">
                                    <span className="text-red-500 group-hover:scale-110 transform transition-transform duration-300 block">➜</span>
                                </div>
                                <span className="text-lg group-hover:text-white group-hover:translate-x-2 transition-all duration-300">
                                    {item}
                                </span>
                            </li>
                        ))}
                    </ul>

                    <div className="mt-12">
                        <div
                            onClick={() => {
                                window.scrollTo(0, 0);
                                navigate('/');
                            }}
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
                        </div>
                    </div>
                </div>

                {/* RIGHT FORM */}
                <form
                    ref={formRef}
                    className="w-full max-w-md mx-auto md:ml-auto space-y-4 bg-slate-900/50 p-6 rounded-xl border border-slate-800 shadow-2xl backdrop-blur-sm"
                >
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2 contact-input">
                            <label htmlFor="name" className="text-sm font-medium text-gray-400 ml-1">Name</label>
                            <input
                                type="text"
                                id="name"
                                placeholder="Your Name"
                                className="w-full bg-black/50 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all duration-300"
                            />
                        </div>
                        <div className="space-y-2 contact-input">
                            <label htmlFor="email" className="text-sm font-medium text-gray-400 ml-1">Email</label>
                            <input
                                type="email"
                                id="email"
                                placeholder="Your email"
                                className="w-full bg-black/50 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all duration-300"
                            />
                        </div>
                    </div>

                    <div className="space-y-2 contact-input">
                        <label htmlFor="message" className="text-sm font-medium text-gray-400 ml-1">Message</label>
                        <textarea
                            id="message"
                            rows="5"
                            placeholder="Your message"
                            className="w-full bg-black/50 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all duration-300 resize-none"
                        ></textarea>
                    </div>

                    <button
                        type="button"
                        className="contact-btn w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold py-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-[0_0_20px_rgba(239,68,68,0.3)]"
                    >
                        Send Message
                    </button>

                </form>
            </div>
        </section >

    );
}
