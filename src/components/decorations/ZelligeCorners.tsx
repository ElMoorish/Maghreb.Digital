"use client";

import { motion } from "framer-motion";
import Image from "next/image";

// Each quadrant of the Zellige image moves to a corner
const ZelligeQuadrant = ({
    position,
}: {
    position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
}) => {
    // Different clip paths to show different parts of the image
    const clipPaths = {
        "top-left": "polygon(0 0, 50% 0, 50% 50%, 0 50%)",
        "top-right": "polygon(50% 0, 100% 0, 100% 50%, 50% 50%)",
        "bottom-left": "polygon(0 50%, 50% 50%, 50% 100%, 0 100%)",
        "bottom-right": "polygon(50% 50%, 100% 50%, 100% 100%, 50% 100%)",
    };

    // Start position (centered, overlapping)
    const initialPosition = {
        "top-left": { x: "25%", y: "25%" },
        "top-right": { x: "-25%", y: "25%" },
        "bottom-left": { x: "25%", y: "-25%" },
        "bottom-right": { x: "-25%", y: "-25%" },
    };

    // End position (corners)
    const finalPosition = {
        "top-left": { top: 0, left: 0 },
        "top-right": { top: 0, right: 0 },
        "bottom-left": { bottom: 0, left: 0 },
        "bottom-right": { bottom: 0, right: 0 },
    };

    // Diagonal floating animation after opening
    const floatAnimation = {
        "top-left": { x: [0, 8, 0], y: [0, 8, 0] },
        "top-right": { x: [0, -8, 0], y: [0, 8, 0] },
        "bottom-left": { x: [0, 8, 0], y: [0, -8, 0] },
        "bottom-right": { x: [0, -8, 0], y: [0, -8, 0] },
    };

    const positionStyles = finalPosition[position];

    return (
        <motion.div
            className="absolute w-[300px] h-[300px] pointer-events-none"
            style={{
                ...positionStyles,
                clipPath: clipPaths[position],
            }}
            initial={{
                x: initialPosition[position].x,
                y: initialPosition[position].y,
                opacity: 0,
                scale: 0.8,
            }}
            animate={{
                x: 0,
                y: 0,
                opacity: 1,
                scale: 1,
            }}
            transition={{
                duration: 1.5,
                ease: [0.4, 0, 0.2, 1],
                delay: 0.3,
            }}
        >
            <motion.div
                animate={floatAnimation[position]}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2,
                }}
                className="w-full h-full"
            >
                <Image
                    src="/zellige.png"
                    alt=""
                    fill
                    className="object-cover opacity-30"
                    priority
                />
            </motion.div>
        </motion.div>
    );
};

export function ZelligeCorners() {
    return (
        <>
            <ZelligeQuadrant position="top-left" />
            <ZelligeQuadrant position="top-right" />
            <ZelligeQuadrant position="bottom-left" />
            <ZelligeQuadrant position="bottom-right" />
        </>
    );
}
