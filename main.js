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

const backToTopButton = document.getElementById("back-to-top");

backToTopButton.onclick = () => {
    gsap.to(smoother, {
        scrollTop: smoother.offset("#hero", "top top"),
        duration: 2,
        ease: "expo.inOut",
    });
};

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

addEventListener("DOMContentLoaded", marquee);

addEventListener("DOMContentLoaded", () => {
    const prevButton = document.querySelector("button#prev");
    const nextButton = document.querySelector("button#next");
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
});
