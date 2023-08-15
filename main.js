import "./style.css";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Linear, gsap } from "gsap";

import Swiper from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

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

addEventListener("DOMContentLoaded", marquee);

addEventListener("DOMContentLoaded", backToTop);

addEventListener("DOMContentLoaded", swiperInit);
