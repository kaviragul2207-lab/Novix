import React from 'react';
import Hero from "./Hero";
import Services from "./Services";
import Process from "./Process";
import Contact from "./Contact";
import Footer from "./Footer";

export default function Home() {
    return (
        <>
            <Hero />
            <Services />
            <Process />
            <Contact />
            <Footer />
        </>
    );
}
