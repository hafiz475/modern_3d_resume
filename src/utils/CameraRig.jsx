import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import gsap from "gsap";

const stagePositions = {
  mech: { cam: [-8, 2.5, -6], target: [-5, 0, -6] },
  front: { cam: [-2, 2.5, -4], target: [-1.5, 0, -4] },
  growth: { cam: [2.5, 2.2, -3], target: [2.2, 0, -3] },
  senior: { cam: [6, 2.6, -2], target: [5, 0, -2] },
  null: { cam: [0, 3, 12], target: [0, 0, 0] },
};

export default function CameraRig({ activeStage }) {
  const { camera, gl } = useThree();

  useEffect(() => {
    const target = stagePositions[activeStage] || stagePositions.null;
    gsap.to(camera.position, {
      x: target.cam[0],
      y: target.cam[1],
      z: target.cam[2],
      duration: 1.2,
      ease: "power2.inOut",
    });
    // If you want a lookAt target, you can use a tweening library to update controls' target if using OrbitControls ref
  }, [activeStage]);

  return null;
}
