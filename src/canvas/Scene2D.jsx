import React, { useRef, useEffect, useState } from "react";
import SkySVG from "../components/SkySVG";
import SandLine from "../components/SandLine";
import { gsap } from "gsap";

/*
  Scene2D: orchestrates the 8-step sequence and handles click-to-advance.
  Scenes:
    0 = afternoon
    1 = sunset
    2 = night
    3 = sunrise
    4 = cloudy
    5 = raining
    6 = winter (snow)
    7 = night (again) -> loops to 0
*/

const SCENES = ["afternoon","sunset","night","sunrise","cloudy","raining","winter","night2"];

export default function Scene2D() {
  const [index, setIndex] = useState(0);
  const containerRef = useRef();
  const tlRef = useRef(null);

  // advance scene (called on click)
  function nextScene() {
    setIndex((i) => (i + 1) % SCENES.length);
  }

  // keyboard control: right arrow = next
  useEffect(() => {
    function onKey(e) {
      if (e.key === "ArrowRight") nextScene();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // play the timeline for the current scene (SkySVG exposes playForScene)
  useEffect(() => {
    // tell the child to animate to the current scene
    const event = new CustomEvent("scene-change", { detail: { scene: SCENES[index] }});
    window.dispatchEvent(event);

    // If we want auto-advance after some time for certain scenes, use timeout:
    // e.g. auto advance from afternoon->sunset after 4s
    if (SCENES[index] === "afternoon") {
      tlRef.current = gsap.delayedCall(5, nextScene);
    } else {
      // allow manual click to progress; optionally add automatic for other scenes
      if (tlRef.current) { tlRef.current.kill(); tlRef.current = null; }
      // small auto-advance for dramatic scenes:
      if (["sunset","sunrise","raining","winter"].includes(SCENES[index])) {
        tlRef.current = gsap.delayedCall(5.5, nextScene);
      }
    }

    return () => {
      if (tlRef.current) { tlRef.current.kill(); tlRef.current = null; }
    };
  }, [index]);

  // click handler anywhere on scene advances
  return (
    <div
      ref={containerRef}
      className="scene-container"
      onClick={nextScene}
      role="button"
      aria-label="Advance scene (click or Right Arrow)"
    >
      {/* Sky + sun/moon/clouds/rain/snow are drawn inside SkySVG */}
      <SkySVG initialScene={SCENES[index]} />

      {/* Sand line */}
      <SandLine />

      {/* top-right small UI indicator */}
      <div className="top-right-indicator">
        <div className="dot" />
      </div>

      {/* simple HUD showing current scene */}
      <div className="hud">
        <div className="hud-inner">
          <strong>{SCENES[index].toUpperCase()}</strong>
          <div className="hint">Click anywhere to advance</div>
        </div>
      </div>
    </div>
  );
}
