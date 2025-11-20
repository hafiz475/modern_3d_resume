import React, { Suspense, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Html, Sky, OrbitControls, Stats, useGLTF } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import SeaWater from "../components/SeaWater";
import Boat from "../components/Boat";
import SeagullFlock from "../components/SeagullFlock";
import TimelineNodes from "../scenes/TimelineNodes";
import CameraRig from "../utils/CameraRig";

useGLTF.preload("/models/sailboat_midpoly.glb");
useGLTF.preload("/models/fishingboat_midpoly.glb");
useGLTF.preload("/models/seagull_midpoly.glb");

export default function Experience() {
  const [activeStage, setActiveStage] = useState(null);
  const controlsRef = useRef();

  // raw local path of your uploaded resume (developer-provided path)
  const RESUME_PATH = "/mnt/data/Md.Hafiz.pdf";

  return (
    <Canvas camera={{ position: [0, 3.5, 12], fov: 45 }} shadows>
      <color attach="background" args={["#071126"]} />
      <ambientLight intensity={0.7} />
      <directionalLight position={[12, 18, 6]} intensity={1.2} castShadow />

      <Suspense fallback={null}>
        <Sky sunPosition={[0.5, 1, -0.3]} />

        <SeaWater />

        <Boat
          src="/models/sailboat_midpoly.glb"
          position={[-6, -0.6, -6]}
          rotation={[0, 0.2, 0]}
        />

        <Boat
          src="/models/fishingboat_midpoly.glb"
          position={[5, -0.6, -3]}
          rotation={[0, -0.12, 0]}
        />

        <SeagullFlock count={12} area={14} />

        <TimelineNodes
          activeStage={activeStage}
          setActiveStage={setActiveStage}
        />

        <CameraRig activeStage={activeStage} controlsRef={controlsRef} />
        <EffectComposer>
          <Bloom
            luminanceThreshold={0.18}
            luminanceSmoothing={0.9}
            height={300}
          />
        </EffectComposer>
      </Suspense>

      <OrbitControls
        ref={controlsRef}
        maxPolarAngle={Math.PI / 2.1}
        minDistance={5}
        maxDistance={40}
      />

      <Html fullscreen>
        <div className="ui">
          <h1>Mohammed Hafiz — Interactive 6-Year Journey</h1>
          <p>Click timeline nodes in the scene to fly between stages.</p>
          <div className="cards">
            <div className="card">2019–2021 — Mechanical Engineer</div>
            <div className="card">2021–2023 — Frontend Developer</div>
            <div className="card">2023 — Projects & Freelance</div>
            <div className="card">2024–Present — Senior Fullstack</div>
          </div>
          <div style={{ marginTop: 8 }}>
            <a
              href={RESUME_PATH}
              style={{
                color: "#cfe7ff",
                textDecoration: "underline",
                pointerEvents: "auto",
              }}
              download
            >
              Download Resume (uploaded)
            </a>
          </div>
        </div>
      </Html>

      <Stats />
    </Canvas>
  );
}
