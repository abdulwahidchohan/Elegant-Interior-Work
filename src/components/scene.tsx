"use client";

import { useRef, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Environment,
  Float,
  ContactShadows,
  PresentationControls,
} from "@react-three/drei";
import { useTheme } from "next-themes";
import * as THREE from "three";

function InteriorRoom({ isDark }: { isDark: boolean }) {
  const meshRef = useRef<THREE.Group>(null);
  const { mouse } = useThree();

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y = THREE.MathUtils.lerp(
        meshRef.current.rotation.y,
        mouse.x * 0.3,
        0.05
      );
      meshRef.current.rotation.x = THREE.MathUtils.lerp(
        meshRef.current.rotation.x,
        -mouse.y * 0.1,
        0.05
      );
    }
  });

  return (
    <group ref={meshRef}>
      {/* Floor */}
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial
          color={isDark ? "#1a1a1a" : "#e8d5b7"}
          roughness={0.8}
          metalness={0.1}
        />
      </mesh>

      {/* Back Wall */}
      <mesh receiveShadow position={[0, 1.5, -4]}>
        <boxGeometry args={[10, 6, 0.1]} />
        <meshStandardMaterial
          color={isDark ? "#0d1117" : "#f5f0e8"}
          roughness={0.9}
        />
      </mesh>

      {/* Left Wall */}
      <mesh
        receiveShadow
        position={[-5, 1.5, 0]}
        rotation={[0, Math.PI / 2, 0]}
      >
        <boxGeometry args={[10, 6, 0.1]} />
        <meshStandardMaterial
          color={isDark ? "#0d1117" : "#f5f0e8"}
          roughness={0.9}
        />
      </mesh>

      {/* Sofa */}
      <Float speed={1} rotationIntensity={0.05} floatIntensity={0.1}>
        <group position={[0, -0.5, -2]}>
          <mesh castShadow>
            <boxGeometry args={[3, 0.5, 1.2]} />
            <meshStandardMaterial
              color={isDark ? "#2d3748" : "#c4a882"}
              roughness={0.7}
            />
          </mesh>
          <mesh castShadow position={[0, 0.4, -0.5]}>
            <boxGeometry args={[3, 0.8, 0.2]} />
            <meshStandardMaterial
              color={isDark ? "#2d3748" : "#c4a882"}
              roughness={0.7}
            />
          </mesh>
          <mesh castShadow position={[-1.4, 0.35, 0]}>
            <boxGeometry args={[0.2, 0.7, 1.2]} />
            <meshStandardMaterial
              color={isDark ? "#2d3748" : "#c4a882"}
              roughness={0.7}
            />
          </mesh>
          <mesh castShadow position={[1.4, 0.35, 0]}>
            <boxGeometry args={[0.2, 0.7, 1.2]} />
            <meshStandardMaterial
              color={isDark ? "#2d3748" : "#c4a882"}
              roughness={0.7}
            />
          </mesh>
        </group>
      </Float>

      {/* Coffee Table */}
      <mesh castShadow position={[0, -0.85, -0.5]}>
        <boxGeometry args={[1.2, 0.05, 0.7]} />
        <meshStandardMaterial
          color={isDark ? "#4a3728" : "#8b7355"}
          roughness={0.4}
          metalness={0.1}
        />
      </mesh>

      {/* Decorative Vase */}
      <Float speed={2} floatIntensity={0.2}>
        <mesh castShadow position={[0, -0.6, -0.5]}>
          <cylinderGeometry args={[0.08, 0.12, 0.3, 16]} />
          <meshStandardMaterial
            color="#c9a84c"
            roughness={0.3}
            metalness={0.4}
          />
        </mesh>
      </Float>

      {/* Lamp */}
      <group position={[1.5, -1, -3]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.05, 0.05, 1.5, 8]} />
          <meshStandardMaterial
            color={isDark ? "#888" : "#c9a84c"}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
        <mesh position={[0, 1, 0]}>
          <coneGeometry args={[0.3, 0.4, 16]} />
          <meshStandardMaterial
            color="#fff8e7"
            emissive="#c9a84c"
            emissiveIntensity={isDark ? 0.8 : 0.4}
          />
        </mesh>
        <pointLight
          position={[0, 0.8, 0]}
          intensity={isDark ? 2 : 1}
          color="#fff8e7"
          distance={4}
        />
      </group>

      {/* Window Frame */}
      <group position={[-4.8, 1.5, 0]}>
        <mesh>
          <boxGeometry args={[0.15, 3, 2.5]} />
          <meshStandardMaterial color={isDark ? "#333" : "#e8e0d0"} />
        </mesh>
        <mesh position={[0.08, 0, 0]}>
          <boxGeometry args={[0.1, 2.9, 2.4]} />
          <meshStandardMaterial
            color={isDark ? "#1a2a3a" : "#87ceeb"}
            transparent
            opacity={0.3}
            roughness={0}
            metalness={0.1}
          />
        </mesh>
      </group>
    </group>
  );
}

export function Scene() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <Canvas
      shadows
      camera={{ position: [3, 2, 6], fov: 50 }}
      gl={{ antialias: true, alpha: true }}
      className="w-full h-full"
    >
      <color attach="background" args={[isDark ? "#0d1117" : "#2c2416"]} />
      <fog attach="fog" args={[isDark ? "#0d1117" : "#2c2416", 10, 20]} />

      <ambientLight intensity={isDark ? 0.3 : 0.5} />
      <directionalLight
        castShadow
        position={[5, 10, 5]}
        intensity={isDark ? 0.5 : 1.5}
        color={isDark ? "#6699cc" : "#fffaf0"}
        shadow-mapSize={[1024, 1024]}
      />

      <Suspense fallback={null}>
        <PresentationControls
          global
          rotation={[0.13, 0.1, 0]}
          polar={[-0.4, 0.2]}
          azimuth={[-1, 0.75]}
          config={{ mass: 2, tension: 400 }}
          snap={{ mass: 4, tension: 400 }}
        >
          <InteriorRoom isDark={isDark} />
        </PresentationControls>
        <ContactShadows
          opacity={0.5}
          scale={10}
          blur={1}
          far={10}
          resolution={256}
          color="#000000"
        />
        <Environment preset={isDark ? "night" : "apartment"} />
      </Suspense>
    </Canvas>
  );
}
