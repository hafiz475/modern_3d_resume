import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";

const stages = [
  {
    id: "mech",
    years: "2019–2021",
    title: "Mechanical Engineer",
    text: "Assembly & QA of bikes.",
  },
  {
    id: "front",
    years: "2021–2023",
    title: "Frontend Developer",
    text: "Learned web dev, worked on UI and payment modules.",
  },
  {
    id: "growth",
    years: "2023",
    title: "Projects & Freelance",
    text: "Billing apps, freelance projects, 3D experiments.",
  },
  {
    id: "senior",
    years: "2024–Present",
    title: "Senior / Fullstack",
    text: "Senior Fullstack roles, ownership & mentoring.",
  },
];

export default function TimelineNodes({ activeStage, setActiveStage }) {
  return (
    <group position={[-6, 0.6, -5]}>
      {stages.map((s, i) => (
        <StageNode
          key={s.id}
          index={i}
          data={s}
          position={[i * 4.2, 0, 0]}
          onClick={() => setActiveStage(s.id)}
          active={activeStage === s.id}
        />
      ))}
    </group>
  );
}

function StageNode({ position, data, onClick, active }) {
  const ref = useRef();
  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.y = Math.sin(clock.elapsedTime * 0.6) * 0.08;
    ref.current.position.y =
      Math.sin(clock.elapsedTime * 0.8 + position[0]) * 0.06 +
      (active ? 0.25 : 0);
  });

  return (
    <group position={position}>
      <mesh ref={ref} onClick={onClick} castShadow>
        <sphereGeometry args={[0.45, 32, 32]} />
        <meshStandardMaterial
          color={active ? "#ffd36b" : "#78a6ff"}
          emissive={active ? "#ffefc2" : "#335577"}
        />
      </mesh>

      <Html distanceFactor={8} position={[0, 0.9, 0]}>
        <div
          style={{
            background: "rgba(12,14,22,0.86)",
            padding: 10,
            color: "#e8f4ff",
            borderRadius: 8,
            fontSize: 12,
            pointerEvents: "auto",
          }}
        >
          <strong>{data.years}</strong>
          <div style={{ opacity: 0.9 }}>{data.title}</div>
          {active && (
            <div style={{ marginTop: 6, fontSize: 11 }}>{data.text}</div>
          )}
        </div>
      </Html>
    </group>
  );
}
