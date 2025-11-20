// -----------------------------
// File: src/components/GrowthCity.jsx
// -----------------------------
import React, { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import gsap from "gsap";

function SmallBuilding({ x = 0, z = 0, h = 0.6 }) {
  return (
    <mesh position={[x, h / 2 - 0.2, z]}>
      <boxGeometry args={[0.4, h, 0.4]} />
      <meshStandardMaterial roughness={0.3} metalness={0.2} />
    </mesh>
  );
}

export default function GrowthCity({ position = [0, 0, 0], onClick, active }) {
  const group = useRef();

  useFrame(({ clock }) => {
    if (group.current)
      group.current.rotation.y = Math.sin(clock.elapsedTime * 0.2) * 0.04;
  });

  useEffect(() => {
    if (active)
      gsap.to(group.current.scale, {
        x: 1.25,
        y: 1.25,
        z: 1.25,
        duration: 0.6,
      });
    else gsap.to(group.current.scale, { x: 1, y: 1, z: 1, duration: 0.6 });
  }, [active]);

  return (
    <group ref={group} position={position} onClick={onClick}>
      <mesh position={[0, -0.3, 0]}>
        <cylinderGeometry args={[1.2, 1.4, 0.12, 24]} />
        <meshStandardMaterial />
      </mesh>

      <SmallBuilding x={-0.6} z={-0.2} h={0.9} />
      <SmallBuilding x={-0.1} z={0.3} h={1.4} />
      <SmallBuilding x={0.6} z={-0.2} h={0.7} />

      <Html position={[0, 1.3, 0]} center>
        <div className={"panel" + (active ? " active" : "")}>
          <h3>Projects & Freelance</h3>
          <p>
            Built multiple projects, freelancing gigs, billing apps, 3D
            experiments.
          </p>
        </div>
      </Html>
    </group>
  );
}
