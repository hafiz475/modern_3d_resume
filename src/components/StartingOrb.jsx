// -----------------------------
// File: src/components/StartingOrb.jsx
// -----------------------------
import React, { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshWobbleMaterial } from "@react-three/drei";
import gsap from "gsap";

export default function StartingOrb({ position = [0, 0, 0], onClick, active }) {
  const ref = useRef();

  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.y = clock.elapsedTime * 0.3;
  });

  useEffect(() => {
    if (active) {
      gsap.to(ref.current.scale, { x: 1.6, y: 1.6, z: 1.6, duration: 0.6 });
    } else {
      gsap.to(ref.current.scale, { x: 1, y: 1, z: 1, duration: 0.6 });
    }
  }, [active]);

  return (
    <mesh ref={ref} position={position} onClick={onClick} castShadow>
      <icosahedronGeometry args={[0.8, 3]} />
      <MeshWobbleMaterial factor={0.6} speed={2} attach="material" />
    </mesh>
  );
}
