"use client";

import { useRef, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, OrbitControls, ContactShadows } from "@react-three/drei";
import * as THREE from "three";

function Panorama({ imageUrl }: { imageUrl: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[500, 60, 40]} />
      <meshBasicMaterial 
        side={THREE.BackSide} 
        map={new THREE.TextureLoader().load(imageUrl)} 
      />
    </mesh>
  );
}

export function PanoramaViewer({ imageUrl }: { imageUrl: string }) {
  return (
    <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black">
      <Canvas camera={{ position: [0, 0, 0.1], fov: 75 }}>
        <Suspense fallback={null}>
          <Panorama imageUrl={imageUrl} />
          <OrbitControls 
            enableZoom={false} 
            enablePan={false}
            rotateSpeed={-0.5}
            autoRotate
            autoRotateSpeed={0.5}
          />
        </Suspense>
      </Canvas>
      <div className="absolute bottom-6 left-6 bg-black/60 backdrop-blur-md text-white text-[10px] px-3 py-1.5 rounded-full uppercase tracking-[0.3em] font-bold border border-white/10">
        Interactive 360° View
      </div>
    </div>
  );
}
