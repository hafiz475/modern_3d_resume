import { useEffect } from "react";
import { useThree } from "@react-three/fiber";
import gsap from "gsap";

const stagePositions = {
  mech: { cam: [-8, 2.6, -6], target: [-6, 0, -6] },
  front: { cam: [-2.2, 2.4, -4.2], target: [-1.5, 0, -4] },
  growth: { cam: [2.5, 2.2, -3.2], target: [2.2, 0, -3] },
  senior: { cam: [6.2, 2.8, -2.2], target: [5, 0, -2] },
  null: { cam: [0, 3.5, 12], target: [0, 0, 0] }
};

export default function CameraRig({ activeStage, controlsRef }) {
  const { camera } = useThree();

  useEffect(() => {
    const key = activeStage || "null";
    const pos = stagePositions[key] || stagePositions.null;

    // tween camera position
    gsap.to(camera.position, {
      x: pos.cam[0],
      y: pos.cam[1],
      z: pos.cam[2],
      duration: 1.2,
      ease: "power2.inOut",
      onUpdate: () => {
        // lazy lookAt the target each frame for a smoother effect
        camera.lookAt(pos.target[0], pos.target[1], pos.target[2]);
      }
    });
  }, [activeStage]);

  return null;
}
