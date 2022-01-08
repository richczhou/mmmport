import * as THREE from "three"
import { useMemo, useRef } from "react";
import { extend, useFrame } from "@react-three/fiber"

// import particleData from "./jsons/highresestu.json";

import floor from "./jsons/split/floor.json"
import walls from "./jsons/split/walls.json"

import { useCloudMat } from "./cloudMaterial";

export default function Cloud (props) {

    // let colors = new Float32Array(particleData.Cd.flat());
    // let positions = new Float32Array(particleData.position.flat());
    let floor_colors = new Float32Array(floor.Cd.flat());
    let floor_positions = new Float32Array(floor.position.flat());

    let wall_colors = new Float32Array(walls.Cd.flat());
    let wall_positions = new Float32Array(walls.position.flat());

    let floorRef = useRef();
    let wallRef = useRef();

    const mat = useCloudMat(1.0, false);

    useFrame( (state, delta) =>{
        // console.log(cloudRef.current)
        floorRef.current.material.uniforms.uTime.value = state.clock.getElapsedTime();
        wallRef.current.material.uniforms.uTime.value = state.clock.getElapsedTime();
    })

    return (
        <group>
            <points ref={floorRef} material={mat}>
                <bufferGeometry attach="geometry">
                    <bufferAttribute 
                        attachObject={["attributes", "position"]}
                        count={floor_positions.length / 3}
                        array={floor_positions}
                        itemSize={3}
                    />
                    <bufferAttribute 
                        attachObject={["attributes", "color"]}
                        count={floor_colors.length / 3}
                        array={floor_colors}
                        itemSize={3}
                    />
                </bufferGeometry>
            </points>
            <points ref={wallRef} material={mat}>
                <bufferGeometry attach="geometry">
                    <bufferAttribute 
                        attachObject={["attributes", "position"]}
                        count={wall_positions.length / 3}
                        array={wall_positions}
                        itemSize={3}
                    />
                    <bufferAttribute 
                        attachObject={["attributes", "color"]}
                        count={wall_colors.length / 3}
                        array={wall_colors}
                        itemSize={3}
                    />
                </bufferGeometry>
            </points>
        </group>
    );
}