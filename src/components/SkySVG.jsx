import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

/*
  SkySVG renders:
  - rect background (color animated)
  - sun (circle) with glow
  - moon (circle) with subtle glow
  - clouds (groups of ellipses)
  - rain (lines, generated)
  - snow (small circles)
  It listens to a global CustomEvent "scene-change" with detail.scene (string).
*/

const WIDTH = 1400;
const HEIGHT = 720;

export default function SkySVG({ initialScene = "afternoon" }) {
  const svgRef = useRef();
  const sunRef = useRef();
  const moonRef = useRef();
  const cloudGroupRef = useRef();
  const rainGroupRef = useRef();
  const snowGroupRef = useRef();
  const skyRef = useRef();
  const tl = useRef(null);

  // create rain elements once
  useEffect(() => {
    const rg = rainGroupRef.current;
    rg.innerHTML = ""; // clear
    for (let i = 0; i < 50; i++) {
      const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
      line.setAttribute("x1", Math.random() * WIDTH);
      line.setAttribute("y1", Math.random() * HEIGHT);
      line.setAttribute("x2", 0);
      line.setAttribute("y2", 12);
      line.setAttribute("stroke", "rgba(200,220,255,0.65)");
      line.setAttribute("stroke-width", "1");
      line.setAttribute("stroke-linecap", "round");
      line.style.opacity = 0;
      rg.appendChild(line);
    }
    const sg = snowGroupRef.current;
    sg.innerHTML = "";
    for (let i = 0; i < 40; i++) {
      const c = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      c.setAttribute("cx", Math.random() * WIDTH);
      c.setAttribute("cy", Math.random() * HEIGHT);
      c.setAttribute("r", 1 + Math.random() * 2);
      c.setAttribute("fill", "white");
      c.style.opacity = 0;
      sg.appendChild(c);
    }
  }, []);

  // helper to animate clouds floating
  function animateClouds(show = true) {
    const clouds = cloudGroupRef.current.querySelectorAll(".cloud");
    clouds.forEach((c, i) => {
      gsap.killTweensOf(c);
      if (show) {
        gsap.to(c, { x: (i % 2 === 0 ? 60 : -40), duration: 18 + i * 2, ease: "none", repeat: -1, yoyo: true });
        gsap.to(c, { opacity: 1, duration: 0.6 });
      } else {
        gsap.to(c, { opacity: 0, duration: 0.6 });
      }
    });
  }

  // helper to animate rain
  function animateRain(on = false) {
    const lines = rainGroupRef.current.querySelectorAll("line");
    gsap.killTweensOf(lines);
    lines.forEach((ln, i) => {
      ln.style.opacity = on ? 1 : 0;
      if (on) {
        gsap.to(ln, {
          y: HEIGHT + 60,
          duration: 1.4 + Math.random() * 0.8,
          ease: "none",
          repeat: -1,
          delay: Math.random() * 0.6,
          onRepeat: () => { ln.setAttribute("y1", -30); ln.setAttribute("y2", -18); }
        });
      }
    });
  }

  // animate snow
  function animateSnow(on = false) {
    const flakes = snowGroupRef.current.querySelectorAll("circle");
    gsap.killTweensOf(flakes);
    flakes.forEach((f, i) => {
      f.style.opacity = on ? 1 : 0;
      if (on) {
        gsap.to(f, {
          attr: { cy: HEIGHT + 10 },
          duration: 5 + Math.random() * 4,
          ease: "none",
          repeat: -1,
          delay: Math.random() * 1.5,
        });
      }
    });
  }

  // animate sun + moon positions and sky color by scene
  function goToScene(scene) {
    const sun = sunRef.current;
    const moon = moonRef.current;
    const sky = skyRef.current;

    gsap.killTweensOf([sun, moon, sky]);
    // defaults
    const skyColors = {
      afternoon: "#8ec5ff",
      sunset: "#ff9a76",
      night: "#06112a",
      sunrise: "#ffd7b5",
      cloudy: "#9fb2c9",
      raining: "#8aa0b6",
      winter: "#9dc4d9",
      night2: "#041025"
    };

    // animate based on scene
    switch (scene) {
      case "afternoon":
        gsap.to(sky, { fill: skyColors.afternoon, duration: 1.2 });
        gsap.to(sun, { attr: { cx: WIDTH * 0.75, cy: HEIGHT * 0.25, r: 44 }, duration: 1.4, ease: "power2.inOut" });
        gsap.to(moon, { attr: { cx: WIDTH * 1.2, cy: HEIGHT * 0.25, r: 26 }, duration: 1.4 });
        animateClouds(false);
        animateRain(false);
        animateSnow(false);
        break;

      case "sunset":
        gsap.to(sky, { fill: skyColors.sunset, duration: 1.6 });
        gsap.to(sun, { attr: { cx: WIDTH * 0.6, cy: HEIGHT * 0.4, r: 56 }, duration: 1.6 });
        gsap.to(moon, { attr: { cx: WIDTH * 1.2, cy: HEIGHT * -0.1, r: 22 }, duration: 1.6 });
        animateClouds(true);
        animateRain(false);
        animateSnow(false);
        break;

      case "night":
      case "night2":
        gsap.to(sky, { fill: skyColors.night, duration: 1.2 });
        gsap.to(sun, { attr: { cx: WIDTH * 1.3, cy: HEIGHT * -0.2, r: 10 }, duration: 1.2 });
        gsap.to(moon, { attr: { cx: WIDTH * 0.8, cy: HEIGHT * 0.2, r: 48 }, duration: 1.2 });
        animateClouds(false);
        animateRain(false);
        animateSnow(false);
        break;

      case "sunrise":
        gsap.to(sky, { fill: skyColors.sunrise, duration: 1.6 });
        gsap.to(sun, { attr: { cx: WIDTH * 0.35, cy: HEIGHT * 0.45, r: 46 }, duration: 1.6 });
        gsap.to(moon, { attr: { cx: WIDTH * 1.3, cy: HEIGHT * 0.1, r: 20 }, duration: 1.6 });
        animateClouds(true);
        animateRain(false);
        animateSnow(false);
        break;

      case "cloudy":
        gsap.to(sky, { fill: skyColors.cloudy, duration: 1.2 });
        gsap.to(sun, { attr: { cx: WIDTH * 0.9, cy: HEIGHT * 0.25, r: 24 }, duration: 1.2 });
        gsap.to(moon, { attr: { cx: WIDTH * 1.3, cy: HEIGHT * 0.1, r: 14 }, duration: 1.2 });
        animateClouds(true);
        animateRain(false);
        animateSnow(false);
        break;

      case "raining":
        gsap.to(sky, { fill: skyColors.raining, duration: 1.0 });
        gsap.to(sun, { attr: { cx: WIDTH * 1.1, cy: HEIGHT * -0.2, r: 18 }, duration: 1.0 });
        gsap.to(moon, { attr: { cx: WIDTH * 1.25, cy: HEIGHT * 0.0, r: 12 }, duration: 1.0 });
        animateClouds(true);
        animateRain(true);
        animateSnow(false);
        break;

      case "winter":
        gsap.to(sky, { fill: skyColors.winter, duration: 1.0 });
        gsap.to(sun, { attr: { cx: WIDTH * 1.05, cy: HEIGHT * -0.25, r: 18 }, duration: 1.0 });
        gsap.to(moon, { attr: { cx: WIDTH * 0.9, cy: HEIGHT * 0.18, r: 16 }, duration: 1.0 });
        animateClouds(true);
        animateRain(false);
        animateSnow(true);
        break;

      default:
        break;
    }
  }

  // listen for scene-change global event
  useEffect(() => {
    function onScene(e) {
      goToScene(e.detail.scene);
    }
    window.addEventListener("scene-change", onScene);

    // initial
    goToScene(initialScene);

    return () => {
      window.removeEventListener("scene-change", onScene);
      if (tl.current) { tl.current.kill(); tl.current = null; }
      gsap.killTweensOf("*");
    };
  }, [initialScene]);

  return (
    <svg ref={svgRef} viewBox={`0 0 ${WIDTH} ${HEIGHT}`} preserveAspectRatio="xMidYMid slice" className="sky-svg">
      {/* sky */}
      <rect ref={skyRef} x="0" y="0" width={WIDTH} height={HEIGHT} fill="#8ec5ff" />

      {/* sun */}
      <g>
        <circle ref={sunRef} cx={WIDTH * 0.75} cy={HEIGHT * 0.25} r="44" fill="#ffd36b" />
        <circle cx={WIDTH * 0.75} cy={HEIGHT * 0.25} r="110" fill="#ffd36b" opacity="0.08" />
      </g>

      {/* moon */}
      <g>
        <circle ref={moonRef} cx={WIDTH * 1.2} cy={HEIGHT * 0.25} r="26" fill="#e6f0ff" opacity="0.95" />
      </g>

      {/* clouds group */}
      <g ref={cloudGroupRef} className="clouds" transform="translate(0,20)">
        <g className="cloud" transform="translate(80,80)" opacity="0.0">
          <ellipse rx="68" ry="22" cx="0" cy="0" fill="#ffffff" opacity="0.92" />
          <ellipse rx="46" ry="20" cx="38" cy="-10" fill="#ffffff" opacity="0.88" />
          <ellipse rx="44" ry="18" cx="-36" cy="-8" fill="#ffffff" opacity="0.88" />
        </g>
        <g className="cloud" transform="translate(360,40)" opacity="0.0">
          <ellipse rx="54" ry="18" cx="0" cy="0" fill="#ffffff" opacity="0.9" />
          <ellipse rx="40" ry="16" cx="30" cy="-8" fill="#ffffff" opacity="0.88" />
        </g>
        <g className="cloud" transform="translate(680,90)" opacity="0.0">
          <ellipse rx="86" ry="26" cx="0" cy="0" fill="#ffffff" opacity="0.86" />
          <ellipse rx="46" ry="18" cx="-48" cy="-6" fill="#ffffff" opacity="0.86" />
        </g>
      </g>

      {/* rain group (hidden initially) */}
      <g ref={rainGroupRef} id="rain-layer" opacity="1" />

      {/* snow group (hidden initially) */}
      <g ref={snowGroupRef} id="snow-layer" opacity="1" />

    </svg>
  );
}
