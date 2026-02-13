
import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import SplitType from "split-type";
import "./Preloader.css";

const Preloader = ({ onComplete }) => {
    const preloaderRef = useRef(null);
    const progressBarRef = useRef(null);
    const percentageRef = useRef(null);

    useLayoutEffect(() => {
        // Check if the content text exists to avoid errors
        const loadingText = new SplitType(".loading-text.initial", { types: "chars" });
        const completeText = new SplitType(".loading-text.complete", {
            types: "chars"
        });

        // Initial states
        // Initial states
        gsap.set(".loading-text.complete", { y: "100%" });
        gsap.set(loadingText.chars, { opacity: 0, y: 100 });
        gsap.set(completeText.chars, { opacity: 0, y: 100 });

        // Animate in loading text
        gsap.to(loadingText.chars, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.05,
            ease: "power2.out"
        });

        const colorStages = [
            { bg: "rgba(0, 0, 0, 1)", text: "rgba(228, 204, 204, 1)" },
            { bg: "rgba(0, 0, 0, 1)", text: "rgba(229, 209, 209, 1)" },
            { bg: "rgba(0, 0, 0, 1)", text: "rgba(194, 175, 175, 1)" },
            { bg: "rgba(0, 0, 0, 1)", text: "rgba(194, 175, 175, 1)" }
        ];

        function updateColors(progress) {
            const stage = Math.floor(progress / 25);
            if (stage < colorStages.length) {
                if (preloaderRef.current) {
                    preloaderRef.current.style.backgroundColor = colorStages[stage].bg;
                }
                if (progressBarRef.current) {
                    progressBarRef.current.style.backgroundColor = colorStages[stage].text;
                }
                document
                    .querySelectorAll(".loading-text .char, .percentage")
                    .forEach((el) => {
                        el.style.color = colorStages[stage].text;
                    });
            }
        }

        const tl = gsap.timeline({
            onComplete: () => {
                if (onComplete) onComplete();
            }
        });

        tl.to(progressBarRef.current, {
            width: "100%",
            duration: 5,
            ease: "power1.inOut",
            onUpdate: function () {
                const progress = Math.round(this.progress() * 100);
                if (percentageRef.current) {
                    percentageRef.current.textContent = progress;
                }
                updateColors(progress);
            }
        })
            .to(".loading-text.initial", {
                y: "-100%",
                duration: 0.5,
                ease: "power2.inOut"
            })
            .to(
                ".loading-text.complete",
                {
                    y: "0%",
                    duration: 0.5,
                    ease: "power2.inOut"
                },
                "<"
            )
            .to(
                completeText.chars,
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.3,
                    stagger: 0.03,
                    ease: "power2.out"
                },
                "<0.2"
            )
            .to(preloaderRef.current, {
                y: "-100vh",
                duration: 1,
                ease: "power2.inOut",
                delay: 0.8
            })
            .set(
                ".content", // This selector targets the element with class 'content' (e.g. <main>)
                {
                    visibility: "visible"
                },
                "-=1"
            );

        tl.set(preloaderRef.current, {
            display: "none"
        });

        // Cleanup function
        return () => {
            // We might want to revert specific things, but if we unmount, we want the content to stay visible.
            // ctx.revert() would hide content again if it was originally hidden.
            // So we just let it be.
            // However, we should kill the timeline if component unmounts mid-way.
            tl.kill();
        };
    }, [onComplete]);

    return (
        <div className="preloader" ref={preloaderRef}>
            <div className="progress-container">
                <div className="progress-bar" ref={progressBarRef}></div>
            </div>
            <div className="text-container">
                <div className="loading-text initial">Loading</div>
                <div className="loading-text complete">Complete</div>
            </div>
            <div className="percentage" ref={percentageRef}>0</div>
        </div>
    );
};

export default Preloader;
