import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Lenis from "lenis";
import React from 'react';
import Navbar from "./components/Navbar";
import Preloader from "./components/Preloader";
import Home from "./components/Home";
import About from "./components/About";
import Services from "./components/Services";
import Process from "./components/Process";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
};

export default function App() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const lenis = new Lenis();
        let frameId;

        function raf(time) {
            lenis.raf(time);
            frameId = requestAnimationFrame(raf);
        }

        frameId = requestAnimationFrame(raf);

        return () => {
            cancelAnimationFrame(frameId);
            lenis.destroy();
        };
    }, []);

    return (
        <>
            {loading && <Preloader onComplete={() => setLoading(false)} />}
            <main className={`bg-black min-h-screen text-white content ${loading ? 'invisible' : ''}`} style={{ visibility: loading ? 'hidden' : 'visible' }}>
                <Router>
                    <ScrollToTop />
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/who-we-are" element={<About />} />
                        <Route path="/services" element={<><Services /><Footer /></>} />
                        <Route path="/process" element={<><Process /><Footer /></>} />
                        <Route path="/contact" element={<><Contact /><Footer /></>} />
                    </Routes>
                </Router>
            </main>
        </>
    );
}
