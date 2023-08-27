import "./style.css";
import { Linear, gsap } from "gsap";

import Swiper from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

let pageloaded = false;

const pageName = location.pathname.replace("/", "").replace(".html", "");

ScrollTrigger.normalizeScroll();

let smoother = ScrollSmoother.create({
    wrapper: "#smooth-wrapper",
    content: "#smooth-content",
    smooth: 1.5,
    effects: true,
});

ScrollTrigger.normalizeScroll(true);

// HTML Divs Loaded
window.addEventListener("DOMContentLoaded", (event) => {
    ScrollTrigger.refresh();
});

// All images and assets loaded
window.addEventListener("load", function () {
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
        swiper.slidePrev();
    };
    nextButton.onclick = () => {
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
    gsap.set("header>div", { y: "-200%", opacity: 0 });
    if (pageName === "") {
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
        gsap.set("#modal", { opacity: 0, pointerEvents: "none" });
        gsap.set("#modal .background .cover-1", { y: "-100%" });
        gsap.set("#modal .background .cover-2", { y: "100%" });
        gsap.set("#modal .form-wrapper", { opacity: 0, scale: 1.25 });
        gsap.set("#form-submit-success-feedback", {
            pointerEvents: "none",
        });
        gsap.set("#form-submit-success-feedback > *", {
            y: 100,
            opacity: 0,
        });
    } else if (pageName === "teams") {
        gsap.set(".card-wrapper", { y: "150%" });
        gsap.set("#commet", { scaleY: 0, transformOrigin: "top" });
        gsap.set("#team-button", { y: "200%", opacity: 0 });
        gsap.set("#modal", { opacity: 0, pointerEvents: "none" });
        gsap.set("#modal .background .cover-1", { y: "-100%" });
        gsap.set("#modal .background .cover-2", { y: "100%" });
        gsap.set("#modal .form-wrapper", { opacity: 0, scale: 1.25 });
        gsap.set("#form-submit-success-feedback", {
            pointerEvents: "none",
        });
        gsap.set("#form-submit-success-feedback > *", {
            y: 100,
            opacity: 0,
        });
    } else if (pageName === "contact") {
        gsap.set("#form-submit-success-feedback > *", {
            y: 100,
            opacity: 0,
        });
    }
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

addEventListener("DOMContentLoaded", backToTop);

if (pageName === "") {
    addEventListener("DOMContentLoaded", swiperInit);

    addEventListener("DOMContentLoaded", marquee);
}

addEventListener("DOMContentLoaded", positionElements);

addEventListener("DOMContentLoaded", followCursor);

addEventListener("load", () => {
    pageloaded = true;
    splitText();

    if (pageName !== "") {
        gsap.to("#load-cover", {
            y: "-100%",
            pointerEvents: "none",
            duration: 0,
            onComplete: main,
        });
    }
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

if (pageName === "") {
    loader();
}

function main() {
    function headerAnimation() {
        gsap.to("header>div", {
            y: 0,
            opacity: 1,
            ease: "expo.out",
            duration: 2,
            onComplete() {
                gsap.set("nav#menu-dropdown", { transitionDuration: "500ms" });
            },
        });
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
                start: "20% center",
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
            .from(
                "#spotify > div > div > p + div > *",
                {
                    y: "100%",
                    opacity: 0,
                    stagger: 0.25,
                },
                "-=0.75"
            );
    }

    function waitlist() {
        const timeline = gsap.timeline({
            scrollTrigger: {
                trigger: "#waitlist",
                start: "20% center",
            },
        });

        timeline
            .from("#waitlist > div  h2", {
                y: "100%",
                opacity: 0,
                duration: 1.5,
                ease: "expo.out",
            })
            .to(
                "#waitlist > div  h3 .word",
                {
                    y: 0,
                    opacity: 1,
                    stagger: { each: 0.05, from: "start" },
                    ease: "power3.out",
                    duration: 0.8,
                },
                "-=0.75"
            )
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
        const element = document.getElementById("follow-cursor");
        const buttons = document.querySelectorAll("button, a.button, .fancy-button");

        buttons.forEach((button) => {
            button.onmouseenter = () => {
                gsap.to(element, { scale: 1, opacity: 1 });
            };
            button.onmouseleave = () => {
                gsap.to(element, { scale: 0, opacity: 0 });
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

    function headerDropDown() {
        const menuButton = document.getElementById("menu-button");
        const navMenu = document.getElementById("menu-dropdown");

        menuButton.onclick = () => navMenu.classList.toggle("open");

        addEventListener("click", (e) => {
            if (menuButton.contains(e.target) || navMenu.contains(e.target)) {
                return;
            } else {
                navMenu.classList.remove("open");
            }
        });
    }

    function teamHero() {
        const timeline = gsap.timeline();

        timeline
            .to("#hero-image-wrapper", {
                clipPath: "polygon(10% 10%, 90% 10%, 90% 90%, 10% 90%)",
                duration: 1.5,
                ease: "expo.out",
                delay: 0.5,
            })
            .to(
                "#hero-image-wrapper",
                {
                    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                    duration: 1.5,
                    ease: "expo.out",
                    borderRadius: 23,
                },
                "-=0.75"
            )
            .to(".card-wrapper", { y: 0, ease: "expo.out", duration: 2 }, "-=1.5")
            .to(
                ".card-wrapper .card",
                {
                    rotateY: 360,
                    ease: "power0",
                    duration: 5,
                    repeat: -1,
                },
                "-=2"
            )
            .to(
                "#hero h1 .word",
                {
                    y: 0,
                    opacity: 1,
                    stagger: { each: 0.05, from: "start" },
                    ease: "power3.out",
                    duration: 0.8,
                },
                "-=4"
            );

        gsap.to("#commet", {
            scaleY: 1,
            ease: "expo.out",
            delay: 3,
            duration: 3,
            scrollTrigger: {
                trigger: "#commet",
                start: "top 75%",
            },
        });

        gsap.to("#team-button", {
            y: 0,
            opacity: 1,
            duration: 1.5,
            scrollTrigger: {
                trigger: "#team-button",
                start: "top 75%",
            },
        });
    }

    function teamMembers() {
        document.querySelectorAll("#team-members article").forEach((article) => {
            const timeline = gsap.timeline({
                scrollTrigger: {
                    trigger: article,
                    start: "top center",
                },
            });

            timeline
                .from(article, {
                    opacity: 0,
                    y: 50,
                    transformOrigin: "bottom",
                    duration: 1.5,
                    ease: "power2",
                })
                .from(
                    article.querySelector("div"),
                    {
                        opacity: 0,
                        scale: 0.75,
                        ease: "back.out(2)",
                        duration: 1,
                    },
                    "-=1"
                );
        });
    }

    function teamText() {
        document.querySelectorAll("#team-text h2 .line").forEach((line) => {
            gsap.set(line, { y: 0, opacity: 1, scale: 1 });

            gsap.to(line, {
                color: "#D0D5DD",
                scrollTrigger: {
                    trigger: line,
                    start: "top center",
                    end: "bottom center",
                    scrub: true,
                },
            });
        });
    }

    function contactHero() {
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
            );
    }

    function modal() {
        const modalButtons = document.querySelectorAll(".request-modal");
        const closeModalButton = document.querySelectorAll(".close-modal-button");

        const timeline = gsap.timeline({ paused: true });

        timeline
            .to("#modal", { opacity: 1, duration: 0.25 })
            .to("#modal .cover-1", { y: 0, ease: "expo.out", duration: 1.5 }, "cover")
            .to("#modal .cover-2", { y: 0, ease: "expo.out", duration: 1.5 }, "cover")
            .to(
                "#modal .form-wrapper",
                { scale: 1, opacity: 1, duration: 1.5, ease: "expo.out" },
                "-=1"
            );

        modalButtons.forEach((button) => {
            button.onclick = () => {
                gsap.set("#modal", { pointerEvents: "auto" });
                if (gsap.getProperty("#modal form", "opacity") === 0) {
                    gsap.set("#form-submit-success-feedback", { pointerEvents: "auto" });
                }
                timeline.play();
            };
        });

        closeModalButton.forEach((button) => {
            button.onclick = () => {
                gsap.set("#modal", { pointerEvents: "none" });
                gsap.set("#modal #form-submit-success-feedback", { pointerEvents: "none" });
                timeline.timeScale(1.5);
                timeline.reverse();
            };
        });
    }

    function contactForm() {
        const form = document.querySelector("form");

        window.addEventListener("form-submitted", (e) => {
            document.getElementById("user-name-feedback").innerHTML = e.detail;

            const timeline = gsap.timeline({ delay: 1.5 });

            gsap.set("#form-submit-success-feedback", { pointerEvents: "auto" });

            timeline.to("form", { opacity: 0 }).to("#form-submit-success-feedback > *", {
                y: 0,
                opacity: 1,
                duration: 2,
                ease: "power4",
                stagger: 0.125,
            });
        });
    }

    headerAnimation();
    headerDropDown();
    fancyButton();

    if (pageName === "") {
        heroAnimation();
        future();
        steps();
        cards();
        getStarted();
        toggle();
        alert();
        testimonial();
        spotify();
        animatedCheckboxes();
        modal();
        contactForm();
        waitlist();
    } else if (pageName === "teams") {
        teamHero();
        waitlist();
        modal();
        teamMembers();
        teamText();
    } else if (pageName === "contact") {
        contactHero();
        contactForm();
    }
}
