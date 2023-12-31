import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stats, OrbitControls, PointMaterial } from "@react-three/drei";
import { useControls } from "leva";
import "./styles/main.scss";

function Waves() {
    const { width } = useControls({ width: 400 });
    const { height } = useControls({ height: 400 });
    const { widthSegments } = useControls({ widthSegments: { value: 200, min: 1, max: 500, step: 10 } });
    const { heightSegments } = useControls({ heightSegments: { value: 200, min: 1, max: 500, step: 10 } });
    const { xFrequency } = useControls({ xFrequency: { value: 40, min: 1, max: 100 } });
    const { yFrequency } = useControls({ yFrequency: { value: 40, min: 1, max: 100 } });
    const { amplitude } = useControls({ amplitude: { value: 20, min: 1, max: 100 } });
    const { speed } = useControls({ speed: { value: 10, min: 1, max: 100, step: 1 } });
    const { pointSize } = useControls({ pointSize: { value: 3, min: 1, max: 20, step: 1 } });
    const { color } = useControls({ color: "#ff0000" });

    const wavesRef = useRef();

    useFrame(() => {
        const timestamp = (Date.now() / 10000) * speed;
        const positions = wavesRef.current.geometry.attributes.position.array;

        for (var i = 2; i < positions.length; i += 3) {
            positions[i] =
                Math.sin(timestamp + positions[i - 1] / xFrequency) *
                Math.sin(timestamp + positions[i - 2] / yFrequency) *
                amplitude;
        }

        wavesRef.current.geometry.attributes.position.needsUpdate = true;
    });

    return (
        <points ref={wavesRef}>
            <planeGeometry args={[width, height, widthSegments, heightSegments]} />
            <PointMaterial transparent color={color} size={pointSize} sizeAttenuation={false} depthWrite={false} />
        </points>
    );
}

function App() {
    return (
        <Canvas camera={{ position: [0, 0, 150] }}>
            <Waves />
            <OrbitControls />
            <Stats />
        </Canvas>
    );
}

export default App;
