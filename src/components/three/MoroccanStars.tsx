"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Create 8-pointed Moroccan star shape
function createStarGeometry() {
    const shape = new THREE.Shape();
    const outerRadius = 1;
    const innerRadius = 0.4;
    const points = 8;

    for (let i = 0; i < points * 2; i++) {
        const radius = i % 2 === 0 ? outerRadius : innerRadius;
        const angle = (i * Math.PI) / points - Math.PI / 2;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        if (i === 0) {
            shape.moveTo(x, y);
        } else {
            shape.lineTo(x, y);
        }
    }
    shape.closePath();

    return new THREE.ShapeGeometry(shape);
}

function Star({ position, scale, rotationSpeed }: { position: [number, number, number]; scale: number; rotationSpeed: number }) {
    const meshRef = useRef<THREE.Mesh>(null);
    const geometry = useMemo(() => createStarGeometry(), []);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.z += rotationSpeed;
            meshRef.current.position.y = position[1] + Math.sin(state.clock.getElapsedTime() + position[0]) * 0.1;
        }
    });

    return (
        <mesh ref={meshRef} position={position} scale={scale} geometry={geometry}>
            <meshBasicMaterial color="#D4AF37" transparent opacity={0.15} side={THREE.DoubleSide} />
        </mesh>
    );
}

function Stars() {
    const stars = useMemo(() => {
        const result = [];
        for (let i = 0; i < 15; i++) {
            result.push({
                position: [
                    (Math.random() - 0.5) * 12,
                    (Math.random() - 0.5) * 8,
                    (Math.random() - 0.5) * 3 - 2,
                ] as [number, number, number],
                scale: Math.random() * 0.5 + 0.3,
                rotationSpeed: (Math.random() - 0.5) * 0.005,
            });
        }
        return result;
    }, []);

    return (
        <>
            {stars.map((star, i) => (
                <Star key={i} {...star} />
            ))}
        </>
    );
}

export function MoroccanStars() {
    return (
        <div className="absolute inset-0 z-0 pointer-events-none opacity-60">
            <Canvas camera={{ position: [0, 0, 5], fov: 60 }} dpr={[1, 2]} gl={{ alpha: true }}>
                <Stars />
            </Canvas>
        </div>
    );
}
