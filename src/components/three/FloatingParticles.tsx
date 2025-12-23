"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Particles({ count = 200 }) {
    const mesh = useRef<THREE.Points>(null);
    const mousePosition = useRef({ x: 0, y: 0 });

    // Create particle positions and colors
    const [positions, colors] = useMemo(() => {
        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);

        // Brand colors
        const palette = [
            new THREE.Color("#D4AF37"), // Gold
            new THREE.Color("#CCA483"), // Terracotta
            new THREE.Color("#F2E8DA"), // Beige
        ];

        for (let i = 0; i < count; i++) {
            // Random positions in a wide area
            positions[i * 3] = (Math.random() - 0.5) * 10;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 5;

            // Random color from palette
            const color = palette[Math.floor(Math.random() * palette.length)];
            colors[i * 3] = color.r;
            colors[i * 3 + 1] = color.g;
            colors[i * 3 + 2] = color.b;
        }

        return [positions, colors];
    }, [count]);

    // Handle mouse movement
    if (typeof window !== "undefined") {
        window.addEventListener("mousemove", (e) => {
            mousePosition.current.x = (e.clientX / window.innerWidth) * 2 - 1;
            mousePosition.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
        });
    }

    // Animation
    useFrame((state) => {
        if (!mesh.current) return;

        const time = state.clock.getElapsedTime();

        // Gentle rotation based on mouse
        mesh.current.rotation.x = mousePosition.current.y * 0.1 + time * 0.02;
        mesh.current.rotation.y = mousePosition.current.x * 0.1 + time * 0.03;

        // Gentle floating motion
        mesh.current.position.y = Math.sin(time * 0.3) * 0.2;
    });

    return (
        <points ref={mesh}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    args={[positions, 3]}
                />
                <bufferAttribute
                    attach="attributes-color"
                    args={[colors, 3]}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.05}
                vertexColors
                transparent
                opacity={0.8}
                sizeAttenuation
            />
        </points>
    );
}

export function FloatingParticles() {
    return (
        <div className="absolute inset-0 z-0 pointer-events-none">
            <Canvas
                camera={{ position: [0, 0, 5], fov: 60 }}
                dpr={[1, 2]}
                gl={{ antialias: true, alpha: true }}
            >
                <Particles />
            </Canvas>
        </div>
    );
}
