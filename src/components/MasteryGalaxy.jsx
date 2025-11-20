// -----------------------------
// File: src/components/MasteryGalaxy.jsx
// -----------------------------
import React, { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import gsap from "gsap";

export default function MasteryGalaxy({
  position = [0, 0, 0],
  onClick,
  active,
}) {
  const group = useRef();

  useFrame(({ clock }) => {
    if (group.current) group.current.rotation.y = clock.elapsedTime * 0.2;
  });

  useEffect(() => {
    if (active)
      gsap.to(group.current.scale, { x: 1.4, y: 1.4, z: 1.4, duration: 0.6 });
    else gsap.to(group.current.scale, { x: 1, y: 1, z: 1, duration: 0.6 });
  }, [active]);

  return (
    <group ref={group} position={position} onClick={onClick}>
      <mesh>
        <sphereGeometry args={[1.05, 32, 32]} />
        <meshStandardMaterial
          emissive={[0.2, 0.15, 0.35]}
          roughness={0.1}
          metalness={0.2}
        />
      </mesh>

      <Html position={[0, 1.2, 0]} center>
        <div className={"panel" + (active ? " active" : "")}>
          <h3>Fullstack & Mastery</h3>
          <p>
            Now: Senior Fullstack Developer. React, Node, 3D, Firebase —
            building creative products.
          </p>
        </div>
      </Html>
    </group>
  );
}
