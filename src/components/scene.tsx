"use client";

import { useRef, Suspense, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Environment,
  Float,
  ContactShadows,
  PresentationControls,
  Sparkles,
} from "@react-three/drei";
import { useTheme } from "next-themes";
import * as THREE from "three";

function InteriorRoom({ isDark }: { isDark: boolean }) {
  const meshRef = useRef<THREE.Group>(null);
  const { mouse, camera } = useThree();
  const zoomFactor = useRef(0);

  // Cinematic reveal on mount
  useEffect(() => {
    zoomFactor.current = 1;
    const interval = setTimeout(() => {
      zoomFactor.current = 0;
    }, 200);
    return () => clearTimeout(interval);
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      // Smooth mouse parallax
      meshRef.current.rotation.y = THREE.MathUtils.lerp(
        meshRef.current.rotation.y,
        mouse.x * 0.4,
        0.04
      );
      meshRef.current.rotation.x = THREE.MathUtils.lerp(
        meshRef.current.rotation.x,
        -mouse.y * 0.15,
        0.04
      );

      // Subtle breathing float on top of Mouse movement
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
    }

    // Cinematic Camera Reveal
    if (state.camera instanceof THREE.PerspectiveCamera) {
      state.camera.fov = THREE.MathUtils.lerp(state.camera.fov, 45, 0.02);
      state.camera.updateProjectionMatrix();
    }
  });

  return (
    <group ref={meshRef}>
      {/* Floor - Premium Marble or Wood feel */}
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
        <planeGeometry args={[12, 12]} />
        <meshStandardMaterial
          color={isDark ? "#121212" : "#efe6d5"}
          roughness={0.2}
          metalness={0.1}
          envMapIntensity={0.5}
        />
      </mesh>

      {/* Back Wall with Texture simulation */}
      <mesh receiveShadow position={[0, 1.5, -4]}>
        <boxGeometry args={[12, 6, 0.2]} />
        <meshStandardMaterial
          color={isDark ? "#0a0a0c" : "#faf8f5"}
          roughness={0.9}
          envMapIntensity={0.2}
        />
      </mesh>

      {/* Left Wall with Window Cutout logic (simulated by gap) */}
      <mesh
        receiveShadow
        position={[-6, 1.5, 0]}
        rotation={[0, Math.PI / 2, 0]}
      >
        <boxGeometry args={[12, 6, 0.2]} />
        <meshStandardMaterial
          color={isDark ? "#0a0a0c" : "#faf8f5"}
          roughness={0.9}
        />
      </mesh>

      {/* Sofa Suite - High End Fabric */}
      <Float speed={1.5} rotationIntensity={0.03} floatIntensity={0.1}>
        <group position={[0, -0.5, -2]}>
          <mesh castShadow>
            <boxGeometry args={[3.2, 0.6, 1.3]} />
            <meshStandardMaterial
              color={isDark ? "#1c2431" : "#b09572"}
              roughness={0.8}
            />
          </mesh>
          <mesh castShadow position={[0, 0.5, -0.6]}>
            <boxGeometry args={[3.2, 0.9, 0.25]} />
            <meshStandardMaterial
              color={isDark ? "#1c2431" : "#b09572"}
              roughness={0.8}
            />
          </mesh>
        </group>
      </Float>

      {/* Coffee Table - Metal/Wood Hybrid */}
      <mesh castShadow position={[0, -0.85, -0.5]}>
        <boxGeometry args={[1.4, 0.1, 0.8]} />
        <meshStandardMaterial
          color={isDark ? "#2a2118" : "#6b5435"}
          roughness={0.3}
          metalness={0.2}
        />
      </mesh>

      {/* Architectural Dust (Sparkles) in Light Rays */}
      <Sparkles
        count={60}
        scale={[10, 8, 10]}
        size={2}
        speed={0.4}
        color={isDark ? "#c9a84c" : "#ffffff"}
        opacity={0.3}
      />

      {/* Signature Vase - Gold Accents */}
      <Float speed={3} floatIntensity={0.3}>
        <mesh castShadow position={[0.4, -0.55, -0.4]}>
          <cylinderGeometry args={[0.07, 0.12, 0.35, 32]} />
          <meshStandardMaterial
            color="#d4af37"
            roughness={0.1}
            metalness={0.9}
            envMapIntensity={1.5}
          />
        </mesh>
      </Float>

      {/* Feature Lamp - Volumetric Effect */}
      <group position={[1.8, -1, -3]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.04, 0.04, 1.8, 12]} />
          <meshStandardMaterial
            color={isDark ? "#444" : "#b09572"}
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
        <mesh position={[0, 1.1, 0]}>
          <coneGeometry args={[0.35, 0.5, 32]} />
          <meshStandardMaterial
            color="#fffcf5"
            emissive="#d4af37"
            emissiveIntensity={isDark ? 3 : 1}
          />
        </mesh>
        
        {/* Simulated Light Cone (Volumetric) */}
        <mesh position={[0, 0.5, 0]} rotation={[Math.PI, 0, 0]}>
          <coneGeometry args={[0.8, 1.5, 32, 1, true]} />
          <meshBasicMaterial
            color="#d4af37"
            transparent
            opacity={isDark ? 0.05 : 0.02}
            side={THREE.DoubleSide}
          />
        </mesh>

        <pointLight
          position={[0, 1, 0]}
          intensity={isDark ? 5 : 2}
          color="#fff8e7"
          distance={6}
          decay={2}
        />
      </group>

      {/* Window Scenary (Light Source simulation) */}
      <group position={[-5.8, 1.5, 0]}>
        <mesh>
          <boxGeometry args={[0.2, 3.5, 3]} />
          <meshStandardMaterial color={isDark ? "#222" : "#ffffff"} />
        </mesh>
        <mesh position={[0.12, 0, 0]}>
          <boxGeometry args={[0.05, 3.4, 2.9]} />
          <meshStandardMaterial
            color={isDark ? "#1a2a3a" : "#cae7f8"}
            transparent
            opacity={0.4}
            roughness={0}
            metalness={0.5}
          />
        </mesh>
        <spotLight
          position={[0, 2, 0]}
          angle={0.5}
          penumbra={1}
          intensity={isDark ? 2 : 10}
          color="#ffffff"
          castShadow
        />
      </group>
    </group>
  );
}

export function Scene() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        shadows
        camera={{ position: [4, 3, 8], fov: 60 }}
        gl={{ antialias: true, alpha: true, stencil: false, depth: true }}
        className="w-full h-full"
      >
        <color attach="background" args={[isDark ? "#06080a" : "#fdfbf7"]} />
        <fog attach="fog" args={[isDark ? "#06080a" : "#fdfbf7", 12, 25]} />

        <ambientLight intensity={isDark ? 0.2 : 0.6} />
        
        {/* Cinematic Rim Light */}
        <directionalLight
          castShadow
          position={[8, 12, 4]}
          intensity={isDark ? 0.4 : 1.2}
          color="#ffffff"
          shadow-mapSize={[2048, 2048]}
        />

        <Suspense fallback={null}>
          <PresentationControls
            global
            rotation={[0.1, 0.1, 0]}
            polar={[-0.2, 0.3]}
            azimuth={[-0.6, 0.6]}
            snap
          >
            <InteriorRoom isDark={isDark} />
          </PresentationControls>
          
          <ContactShadows
            opacity={0.6}
            scale={12}
            blur={2.5}
            far={10}
            resolution={256}
            color={isDark ? "#000000" : "#4a3c2c"}
          />
          
          <Environment preset={isDark ? "night" : "apartment"} />
        </Suspense>
      </Canvas>
    </div>
  );
}
