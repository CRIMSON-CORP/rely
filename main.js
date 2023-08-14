import "./style.css";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsap } from "gsap";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

let smoother = ScrollSmoother.create({
    smooth: 1.5,
    effects: true,
    normalizeScroll: true,
    wrapper: "#smooth-wrapper",
    content: "#smooth-content",
});

console.log(smoother);

// HTML Divs Loaded
window.addEventListener("DOMContentLoaded", (event) => {
    ScrollTrigger.refresh();
});
// All images and assets loaded
document.addEventListener("load", function () {
    ScrollTrigger.refresh();
});
