import React, { useRef } from "react";
import { Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

const stages = [
  { id: "mech", years: "2019–2021", title: "Mechanical Engineer", hint: "Assembly & QA of bikes" },
  { id: "front", years: "2021–2023", title: "Frontend Developer", hint: "Learned React, UI & payments" },
  { id: "growth", years: "2023", title: "Projects & Freelance", hint: "Billing apps & 3D experiments" },
  { id: "senior", years: "2024–Present", title: "Senior Fullstack", hint: "Ownership, mentoring & scale" },
];

export default function TimelineNodes({ activeStage, setActiveStage }) {
  return (
    <group position={[-6, 1, -5]}>
      {stages.map((s, i) => (
        <Stage key={s.id} index={i} stage={s} setActiveStage={setActiveStage} />
      ))}
    </group>
  );
}

function Stage({ index, stage, setActiveStage }) {
  const ref = useRef();
  const pos = [index * 4.2, 0, 0];

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (ref.current) {
      ref.current.position.y = Math.sin(t * 1 + index) * 0.08;
      ref.current.rotation.y = Math.sin(t * 0.6 + index) * 0.12;
    }
  });

  return (
    <group position={pos}>
      <mesh ref={ref} onClick={() => setActiveStage && setActiveStage(stage.id)} castShadow>
        <sphereGeometry args={[0.45, 32, 32]} />
        <meshStandardMaterial color={"#78a6ff"} emissive={"#335577"} />
      </mesh>

      <Html center position={[0, 1, 0]}>
        <div style={{
          padding: "6px 10px",
          borderRadius: 8,
          background: "rgba(6,10,20,0.85)",
          color: "#dfefff",
          fontSize: 12,
          textAlign: "center",
          whiteSpace: "pre-line",
          pointerEvents: "auto"
        }}>
          <strong>{stage.years}</strong>
          <div style={{ opacity: 0.9 }}>{stage.title}</div>
          <div style={{ fontSize: 11, marginTop: 6, opacity: 0.85 }}>{stage.hint}</div>
        </div>
      </Html>
    </group>
  );
}
