import React, { useEffect, useRef } from "react";
import { useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { Water } from "three/examples/jsm/objects/Water.js";

export default function SeaWater() {
  const ref = useRef();
  const normal = useLoader(THREE.TextureLoader, "/textures/water_normal_midpoly.png");
  const created = useRef(false);

  useEffect(() => {
    if (created.current) return;
    created.current = true;

    normal.wrapS = normal.wrapT = THREE.RepeatWrapping;
    normal.repeat.set(6, 6);

    const waterGeometry = new THREE.PlaneGeometry(300, 300);
    const water = new Water(waterGeometry, {
      textureWidth: 1024,
      textureHeight: 1024,
      waterNormals: normal,
      sunDirection: new THREE.Vector3(0.5, 0.8, -0.2),
      sunColor: 0xffffff,
      waterColor: 0x06303f,
      distortionScale: 2.4,
      alpha: 1.0,
      fog: false,
    });

    water.rotation.x = -Math.PI / 2;
    water.position.y = -1.6;
    ref.current.add(water);
  }, []); // run only once

  return <group ref={ref} />;
}
