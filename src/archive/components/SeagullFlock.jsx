import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTFModel } from "../archive/utils/loaders";

function rand(a, b) { return a + Math.random() * (b - a); }

export default function SeagullFlock({ src = "/models/seagull_midpoly.glb", count = 10, area = 12 }) {
  const gltf = useGLTFModel(src);
  // create clones once
  const clones = useMemo(() => {
    const arr = [];
    for (let i = 0; i < count; i++) {
      arr.push(gltf.scene.clone(true));
    }
    return arr;
  }, [gltf, count]);

  const birds = useMemo(() => {
    return new Array(count).fill().map(() => ({
      pos: [rand(-area, area), rand(2, 5), rand(-area / 2, area)],
      vel: [rand(-0.02, 0.02), rand(-0.006, 0.006), rand(-0.02, 0.02)]
    }));
  }, [count, area]);

  const refs = useRef([]);
  refs.current = refs.current || [];

  useFrame((_, delta) => {
    birds.forEach((b, i) => {
      b.vel[0] += (Math.random() - 0.5) * 0.002;
      b.vel[1] += (Math.random() - 0.5) * 0.001;
      b.vel[2] += (Math.random() - 0.5) * 0.002;

      b.pos[0] += b.vel[0] * 60 * delta;
      b.pos[1] += b.vel[1] * 60 * delta;
      b.pos[2] += b.vel[2] * 60 * delta;

      const limit = area * 1.1;
      if (b.pos[0] > limit) b.vel[0] -= 0.03 * delta;
      if (b.pos[0] < -limit) b.vel[0] += 0.03 * delta;
      if (b.pos[2] > limit) b.vel[2] -= 0.03 * delta;
      if (b.pos[2] < -limit) b.vel[2] += 0.03 * delta;
      if (b.pos[1] < 1.3) b.vel[1] += 0.02 * delta;
      if (b.pos[1] > 6) b.vel[1] -= 0.02 * delta;

      const ref = refs.current[i];
      if (ref) {
        ref.position.set(b.pos[0], b.pos[1], b.pos[2]);
        ref.rotation.y = Math.atan2(-b.vel[2], b.vel[0]) + Math.PI / 2;
        ref.rotation.x = -b.vel[1] * 4;
      }
    });
  });

  return clones.map((obj, i) => (
    <primitive
      key={i}
      ref={el => refs.current[i] = el}
      object={obj}
      scale={[0.55, 0.55, 0.55]}
      position={birds[i].pos}
    />
  ));
}
