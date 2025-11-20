import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { useGLTFModel } from "../utils/loaders";

export default function Boat({ src = "/models/sailboat_midpoly.glb", position = [0, 0, 0], rotation = [0, 0, 0] }) {
  const ref = useRef();
  const gltf = useGLTFModel(src);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (ref.current) {
      ref.current.position.y = position[1] + Math.sin(t * 0.55) * 0.08;
      ref.current.rotation.z = Math.sin(t * 0.2) * 0.02;
    }
  });

  return (
    <Float rotationIntensity={0.03} floatIntensity={0.03}>
      <primitive ref={ref} object={gltf.scene} position={position} rotation={rotation} />
    </Float>
  );
}
