import React, { Suspense, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Html, Stats } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import SunsetSea from "../scenes/SunsetSea";
import TimelineNodes from "../scenes/TimelineNodes";
import CameraRig from "../utils/CameraRig";

export default function Experience() {
  const [activeStage, setActiveStage] = useState(null);

  return (
    <Canvas camera={{ position: [0, 3, 12], fov: 45 }} shadows>
      <color attach="background" args={["#071126"]} />
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 10, 5]} intensity={1} castShadow />
      <Suspense fallback={null}>
        <SunsetSea />
        <TimelineNodes activeStage={activeStage} setActiveStage={setActiveStage} />
        <CameraRig activeStage={activeStage} />
        <EffectComposer>
          <Bloom luminanceThreshold={0.18} luminanceSmoothing={0.9} height={300} />
        </EffectComposer>
      </Suspense>

      <OrbitControls enabled={false} />
      <Html fullscreen>
        <div style={{ position: "absolute", top: 18, left: 18, color: "#dfefff" }}>
          <h2 style={{ margin: 0 }}>Mohammed Hafiz — Interactive 6-Year Journey</h2>
          <p style={{ margin: 0, opacity: 0.85 }}>Click the nodes on the sea to explore each chapter.</p>
        </div>
      </Html>
      <Stats />
    </Canvas>
  );
}
