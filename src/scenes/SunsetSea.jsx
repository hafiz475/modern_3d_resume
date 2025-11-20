import React, { useRef } from "react";
import { Sky, useTexture, Float } from "@react-three/drei";
import * as THREE from "three";

export default function SunsetSea() {
  const plane = useRef();
  const normal = useTexture("/textures/water-normal.jpg"); // put file in public/textures
  normal.wrapS = normal.wrapT = THREE.RepeatWrapping;
  normal.repeat.set(6, 6);

  // bobbing and slight rotation handled via Float wrapper on boats and procedural normal manipulation in a useFrame if desired

  return (
    <group>
      <Sky distance={450000} sunPosition={[0.5, 0.6, -0.8]} inclination={0.45} azimuth={0.15} />
      <mesh position={[0, 6, -40]}>
        <sphereGeometry args={[6, 32, 32]} />
        <meshBasicMaterial color={"#ffbe7a"} transparent opacity={0.22} />
      </mesh>

      <Float rotationIntensity={0.03}>
        <mesh ref={plane} rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.6, 0]}>
          <planeGeometry args={[300, 300, 64, 64]} />
          <meshStandardMaterial
            color={"#06303f"}
            metalness={0.2}
            roughness={0.15}
            normalMap={normal}
            normalScale={[0.9, 0.9]}
          />
        </mesh>
      </Float>

      {/* Placeholder boats - replace with glTF models loaded via useGLTF */}
      <group position={[-6, -0.6, -6]}>
        <mesh rotation={[0, 0.2, 0]}>
          <boxGeometry args={[2.4, 0.22, 0.7]} />
          <meshStandardMaterial color={"#2f6b8f"} />
        </mesh>
      </group>

      <group position={[5, -0.55, -2]}>
        <mesh rotation={[0, -0.12, 0]}>
          <boxGeometry args={[2.0, 0.18, 0.6]} />
          <meshStandardMaterial color={"#6b2f4f"} />
        </mesh>
      </group>
    </group>
  );
}
