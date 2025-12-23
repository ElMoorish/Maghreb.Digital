"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Sphere } from "@react-three/drei";
import * as THREE from "three";

function AnimatedSphere() {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (!meshRef.current) return;
        const time = state.clock.getElapsedTime();
        meshRef.current.rotation.x = time * 0.1;
        meshRef.current.rotation.y = time * 0.15;
    });

    return (
        <Sphere ref={meshRef} args={[1, 64, 64]} scale={2.5}>
            <MeshDistortMaterial
                color="#D4AF37"
                attach="material"
                distort={0.4}
                speed={1.5}
                roughness={0.2}
                metalness={0.8}
            />
        </Sphere>
    );
}

export function GradientSphere() {
    return (
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] z-0 opacity-30 pointer-events-none">
            <Canvas camera={{ position: [0, 0, 5], fov: 50 }} dpr={[1, 2]}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={1} />
                <pointLight position={[-10, -10, -10]} color="#CCA483" intensity={0.5} />
                <AnimatedSphere />
            </Canvas>
        </div>
    );
}
