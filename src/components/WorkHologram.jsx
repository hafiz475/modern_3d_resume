// -----------------------------
// File: src/components/WorkHologram.jsx
// -----------------------------
import React, { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Html, Line } from "@react-three/drei";
import gsap from "gsap";

export default function WorkHologram({
  position = [0, 0, 0],
  onClick,
  active,
}) {
  const group = useRef();

  useFrame(({ clock }) => {
    if (group.current)
      group.current.rotation.y = Math.sin(clock.elapsedTime * 0.6) * 0.08;
  });

  useEffect(() => {
    if (active) {
      gsap.to(group.current.position, { y: 0.4, duration: 0.4 });
    } else {
      gsap.to(group.current.position, { y: 0, duration: 0.4 });
    }
  }, [active]);

  return (
    <group ref={group} position={position} onClick={onClick}>
      <mesh position={[0, 0.2, 0]}>
        <boxGeometry args={[1.6, 0.02, 1]} />
        <meshStandardMaterial
          emissive={[0.05, 0.2, 0.6]}
          roughness={0.1}
          metalness={0.2}
        />
      </mesh>

      <Html position={[0, 0.6, 0]} center>
        <div className={"panel" + (active ? " active" : "")}>
          <h3>Frontend Journey</h3>
          <p>
            Quit mechanical job → learned HTML/CSS/JS → React → worked at a
            software company.
          </p>
        </div>
      </Html>
    </group>
  );
}
