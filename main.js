import "./style.css";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Linear, gsap } from "gsap";

import Swiper from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

let pageloaded = false;

let smoother = ScrollSmoother.create({
    smooth: 1.5,
    effects: true,
    wrapper: "#smooth-wrapper",
    content: "#smooth-content",
});

ScrollTrigger.normalizeScroll(true);

// HTML Divs Loaded
window.addEventListener("DOMContentLoaded", (event) => {
    ScrollTrigger.refresh();
});

// All images and assets loaded
document.addEventListener("load", function () {
    ScrollTrigger.refresh();
});

function marquee() {
    const container = document.getElementById("marquee");
    const totalDistance = container.clientWidth;
    gsap.to(container, {
        repeat: -1,
        x: "-" + totalDistance,
        ease: Linear.easeNone,
        duration: 10,
    });
}

function backToTop() {
    const backToTopButton = document.getElementById("back-to-top");

    backToTopButton.onclick = () => {
        gsap.to(smoother, {
            scrollTop: smoother.offset("#hero", "top top"),
            duration: 2,
            ease: "expo.inOut",
        });
    };
}

function swiperInit() {
    const prevButton = document.getElementById("prev");
    const nextButton = document.getElementById("next");
    const swiper = new Swiper(".testimonial-swiper", {
        modules: [Navigation],
        slidesPerView: "auto",
        spaceBetween: 48,
    });

    prevButton.onclick = () => {
        console.log("prev");
        swiper.slidePrev();
    };
    nextButton.onclick = () => {
        console.log("next");
        swiper.slideNext();
    };
}

function splitText() {
    const allWords = [];
    const allLines = [];
    const allChars = [];
    const splitWordText = document.querySelectorAll(".split-word");
    const splitLineText = document.querySelectorAll(".split-line");
    const splitCharText = document.querySelectorAll(".split-char");

    splitWordText.forEach((text) => {
        const words = new SplitType(text, {
            type: "words",
        });

        allWords.push(...words.words);
    });

    splitLineText.forEach((text) => {
        const lines = new SplitType(text, {
            type: "words",
        });

        allLines.push(...lines.lines);
    });

    splitCharText.forEach((text) => {
        const lines = new SplitType(text, {
            type: "chars",
        });

        allChars.push(...lines.chars);
    });

    gsap.set(allWords, { y: "100%", opacity: 0 });
    gsap.set(allLines, { y: "100%", opacity: 0, scale: 0.8 });
}

function positionElements() {
    window.scrollTo(0, 0);
    gsap.set("header>div", { y: "-200%", opacity: 0 });
    gsap.set("#alert > .container > div > div > img:nth-child(1)", {
        x: "-200%",
        opacity: 0,
        scale: 1.2,
    });
    gsap.set("#alert > .container > div > div > img:nth-child(2)", { y: -164 });
    gsap.set("#hero button", { opacity: 0, y: "100%", ease: "power3.out", duration: 2 }, "-=1");
    gsap.set(
        "#hero button + img",
        { opacity: 0, y: "100%", ease: "power3.out", duration: 2 },
        "-=1.85"
    );
}

function followCursor() {
    const element = document.getElementById("follow-cursor");

    window.addEventListener("mousemove", (e) => {
        element.animate(
            {
                left: e.pageX + "px",
                top: e.pageY + "px",
            },
            { duration: 400, fill: "forwards" }
        );
    });
}
addEventListener("DOMContentLoaded", marquee);

addEventListener("DOMContentLoaded", backToTop);

addEventListener("DOMContentLoaded", swiperInit);

addEventListener("DOMContentLoaded", positionElements);

addEventListener("DOMContentLoaded", followCursor);

addEventListener("load", () => {
    pageloaded = true;
    splitText();
});

function loader() {
    const loader = document.getElementById("loader");
    const svg = loader.querySelector("svg");
    const cover = loader.querySelector("#cover");

    const topR = svg.children[0];
    const bottomR = svg.children[1];
    const text = svg.children[2];

    gsap.set(topR, { rotate: 45, opacity: 0 });
    gsap.set(bottomR, { rotate: 45, opacity: 0 });
    gsap.set(text, { x: "-100%", opacity: 0 });
    gsap.set(cover, { scaleX: 0, transformOrigin: "right" });

    const logoTimeline = gsap.timeline();
    const coverTimeline = gsap.timeline({
        repeat: -1,
        yoyo: false,
        repeatDelay: 0.75,
        delay: 3,
        defaults: {
            delay: 0.75,
            duration: 0.75,
            ease: "sine.out",
        },
    });

    logoTimeline
        .to("#load-cover", { opacity: 0, pointerEvents: "none", duration: 0 })
        .to(topR, { rotate: 0, opacity: 1, delay: 1 })
        .to(bottomR, { rotate: 0, opacity: 1 })
        .to(text, {
            x: 0,
            opacity: 1,
            ease: "expo.out",
            duration: 1.5,
        });

    coverTimeline
        .to(cover, { scaleX: 1, delay: 0 })
        .to(cover, {
            scaleX: 0,
            delay: 0,
            transformOrigin: "left",
            onComplete() {
                if (pageloaded) {
                    coverTimeline.kill();
                    gsap.to(loader, {
                        y: "-100%",
                        onComplete: main,
                        duration: 1.25,
                        ease: "expo.in",
                    });
                }
            },
        })
        .to(cover, { scaleX: 1, delay: 1, delay: 0.75 })
        .to(cover, {
            scaleX: 0,
            delay: 0,
            transformOrigin: "right",
            onComplete() {
                if (pageloaded) {
                    coverTimeline.kill();
                    gsap.to(loader, {
                        y: "-100%",
                        onComplete: main,
                        duration: 1.25,
                        ease: "expo.in",
                    });
                }
            },
        });
}

loader();

function main() {
    window.scrollTo(0, 0);
    function headerAnimation() {
        gsap.to("header>div", { y: 0, opacity: 1, ease: "expo.out", duration: 2 });
    }

    function heroAnimation() {
        let timeline = gsap.timeline({ delay: 1 });
        timeline
            .to("#hero h1 .word", {
                y: 0,
                opacity: 1,
                stagger: { each: 0.05, from: "start" },
                ease: "power3.out",
                duration: 0.8,
            })
            .to(
                "#hero p .line",
                {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    ease: "power3.out",
                    duration: 1,
                    stagger: { each: 0.1, from: "start" },
                },
                "-=0.5"
            )
            .to("#hero button", { opacity: 1, y: 0, ease: "power3.out", duration: 2 }, "-=1")
            .to(
                "#hero button + img",
                { opacity: 1, y: 0, ease: "power3.out", duration: 2 },
                "-=1.85"
            );
    }

    function future() {
        const timeline = gsap.timeline({
            scrollTrigger: {
                trigger: "#future",
                start: "top center",
            },
        });

        timeline
            .to("#future h2 .line", {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 2,
                ease: "power3.out",
                stagger: { each: 0.125 },
            })
            .from(
                "#future h2 + img",
                {
                    opacity: 0,
                    y: "100%",
                    duration: 2,
                    ease: "expo.out",
                },
                "-=1.5"
            );
    }

    function steps() {
        const timeline = gsap.timeline({
            scrollTrigger: {
                trigger: "#steps ul",
                start: "top center",
            },
        });

        timeline.from("#steps ul li", {
            scale: 0.8,
            opacity: 0,
            stagger: 0.2,
            opacity: 0,
            duration: 1.5,
            ease: "back.out(1.7)",
        });
    }

    function cards() {
        const articleCards = document.querySelectorAll("#cards article");
        articleCards.forEach((card, index) => {
            const timeline = gsap.timeline({
                scrollTrigger: {
                    trigger: card,
                    start: "top center",
                },
            });

            timeline
                .from(card, {
                    opacity: 0,
                    y: "50%",
                    ease: "back.out",
                    duration: 1.5,
                    delay: index * 0.25,
                })
                .to(
                    card.querySelectorAll(".word"),
                    {
                        y: 0,
                        opacity: 1,
                        stagger: { each: 0.05, from: "start" },
                        ease: "power3.out",
                        duration: 0.8,
                    },
                    "-=1"
                )
                .to(
                    card.querySelectorAll(".line"),
                    {
                        opacity: 1,
                        scale: 1,
                        y: 0,
                        ease: "power3.out",
                        duration: 1.5,
                        stagger: { each: 0.1, from: "start" },
                    },
                    "-=1.75"
                )
                .from(
                    card.children[2],
                    {
                        y: "100%",
                        opacity: 0,
                        duration: 1.5,
                        ease: "expo.out",
                    },
                    "-=1"
                );
            if (card.children[3]) {
                timeline.from(
                    card.children[3],
                    {
                        y: "100%",
                        opacity: 0,
                        duration: 1.5,
                        ease: "expo.out",
                    },
                    "-=1"
                );
            }
        });
    }

    function getStarted() {
        const timeline = gsap.timeline({
            scrollTrigger: {
                trigger: "#get-started",
                start: "top center",
            },
        });

        timeline
            .to("#get-started h2 .word", {
                y: 0,
                opacity: 1,
                stagger: { each: 0.05, from: "start" },
                ease: "power3.out",
                duration: 0.8,
            })
            .to(
                "#get-started p .line",
                {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    ease: "power3.out",
                    duration: 1,
                    stagger: { each: 0.1, from: "start" },
                },
                "-=0.5"
            )
            .from(
                "#get-started button",
                { opacity: 0, y: "100%", ease: "power3.out", duration: 2 },
                "-=1"
            );
    }

    function toggle() {
        const textTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: "#toggle > .container > div > article",
                start: "top 75%",
            },
        });

        const toggleTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: "#toggle > .container > div > div",
                start: "top 75%",
            },
        });

        textTimeline
            .to("#toggle > .container > div > article h2 .word", {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 0.8,
                ease: "power3.out",
                stagger: { each: 0.05 },
            })
            .to(
                "#toggle > .container > div > article > p .line",
                {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    ease: "power3.out",
                    duration: 1,
                    stagger: { each: 0.1, from: "start" },
                },
                "-=1"
            );

        toggleTimeline.from("#toggle > .container > div > div > article", {
            opacity: 0,
            y: "200%",
            ease: "expo.out",
            duration: 2,
            stagger: 0.25,
            delay: 1,
        });
    }

    function alert() {
        const alertTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: "#alert > .container > div > div",
                start: "top 75%",
            },
        });

        alertTimeline
            .to("#alert > .container > div > div > img:nth-child(2)", {
                delay: 1,
                y: 0,
                duration: 1,
                ease: "back.out(1.5)",
            })
            .to(
                "#alert > .container > div > div > img:nth-child(1)",
                {
                    x: 0,
                    opacity: 1,
                    duration: 1,
                    ease: "expo.out",
                },
                "-=1"
            )
            .to(
                "#alert > .container > div > div > img:nth-child(1)",
                {
                    scale: 1,
                    duration: 0.5,
                },
                "-=0.25"
            )
            .to(
                "#alert > .container > div h2 .line",
                {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    ease: "power3.out",
                    duration: 1,
                    stagger: { each: 0.1, from: "start" },
                },
                "-=3"
            );
    }

    function testimonial() {
        gsap.to("#testimonial h2 .word", {
            y: 0,
            opacity: 1,
            stagger: { each: 0.05, from: "start" },
            ease: "power3.out",
            duration: 0.8,
            scrollTrigger: {
                trigger: "#testimonial h2",
                start: "top center",
            },
        });
    }

    function spotify() {
        gsap.from("#spotify > div > img:nth-child(1)", {
            opacity: 0,
            x: "-100%",
            ease: "expo.out",
            duration: 2,
            scrollTrigger: {
                trigger: "#spotify > div > img:nth-child(1)",
                start: "top 75%",
            },
        });

        gsap.from("#spotify > div > img:nth-of-type(2)", {
            opacity: 0,
            x: "100%",
            duration: 2,
            ease: "expo.out",
            scrollTrigger: {
                trigger: "#spotify > div > img:nth-of-type(2)",
                start: "top 75%",
            },
        });

        const contenTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: "#spotify > div",
                start: "top center",
            },
        });

        contenTimeline
            .to("#spotify > div > div > h2 .word", {
                y: 0,
                opacity: 1,
                stagger: { each: 0.05, from: "start" },
                ease: "power3.out",
                duration: 0.8,
            })
            .to(
                "#spotify > div > div > p .line",
                {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    ease: "power3.out",
                    duration: 1,
                    stagger: { each: 0.1, from: "start" },
                },
                "-=0.5"
            )
            .from("#spotify > div > div > p + div > *", {
                y: "100%",
                opacity: 0,
                stagger: 0.25,
            });
    }

    function waitlist() {
        const timeline = gsap.timeline({
            scrollTrigger: {
                trigger: "#waitlist",
                start: "top 75%",
            },
        });

        timeline
            .from("#waitlist > div  h2", {
                y: "100%",
                opacity: 0,
                duration: 1.5,
                ease: "expo.out",
            })
            .to("#waitlist > div  h3 .word", {
                y: 0,
                opacity: 1,
                stagger: { each: 0.05, from: "start" },
                ease: "power3.out",
                duration: 0.8,
            })
            .from(
                "#waitlist > div  button",
                {
                    y: "100%",
                    opacity: 0,
                    duration: 1.5,
                    ease: "expo.out",
                },
                "-=0.75"
            );
    }

    function fancyButton() {
        const fancyButtons = document.querySelectorAll(".fancy-button");
        const element = document.getElementById("follow-cursor");
        const buttons = document.querySelectorAll("button, a.button");

        buttons.forEach((button) => {
            button.onmouseenter = () => {
                gsap.to(element, { scale: 1, opacity: 1 });
            };
            button.onmouseleave = () => {
                gsap.to(element, { scale: 0, opacity: 0 });
            };
        });

        fancyButtons.forEach((button) => {
            const mainText = button.querySelector(".text-main");
            const underText = button.querySelector(".text-under");
            const background = button.querySelector(".background");

            button.onmouseenter = () => {
                gsap.to(element, { scale: 1, opacity: 1 });
                gsap.to(mainText, { y: "-100%", ease: "expo.out", duration: 1.1 });
                gsap.to(underText, { y: "-100%", ease: "expo.out", duration: 1.1 });
                gsap.to(background, { scaleY: 1, ease: "expo.out" });
            };
            button.onmouseleave = () => {
                gsap.to(element, { scale: 0, opacity: 0 });
                gsap.to(mainText, { y: "0%", ease: "expo.out", duration: 1.1 });
                gsap.to(underText, { y: "0%", ease: "expo.out", duration: 1.1 });
                gsap.to(background, { scaleY: 0, ease: "expo.out", duration: 1.1 });
            };
        });
    }

    function animatedCheckboxes() {
        const checkboxes = document.querySelectorAll("#toggle input[type=checkbox]");

        let isChecked = false;

        setInterval(() => {
            isChecked = !isChecked;
            checkboxes[0].checked = isChecked;
            checkboxes[1].checked = !isChecked;
        }, 2000);
    }

    headerAnimation();
    heroAnimation();
    future();
    steps();
    cards();
    getStarted();
    toggle();
    alert();
    testimonial();
    spotify();
    waitlist();
    fancyButton();
    animatedCheckboxes();
}
