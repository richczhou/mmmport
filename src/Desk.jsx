import * as THREE from "three"
import { useRef, useState } from "react"
import { useFrame } from "@react-three/fiber"
import { Html } from "@react-three/drei"
import { useCloudMat } from "./cloudMaterial"
import './App.css';


function Desk ({json, ...props}) {
    const deskRef = useRef();
    const stickRef = useRef();
    const cloudRef = useRef();
    const [mouseState, setMouseState] = useState({isHovered: false})

    const mat = useCloudMat(3.0, mouseState.isHovered);

    let user_colors = new Float32Array(json.Cd.flat());
    let user_positions = new Float32Array(json.position.flat());

    // giving each div bar its own "id"
    let classNames = "bar ";
    classNames += props.userData.room;

    let barSettings = {height: 0, opacity: 100};

    useFrame((state) => {

        // Stalk behaviors
        if (mouseState.isHovered) {

            gsap.to(barSettings, {duration: 0.5, height: 250, opacity: 100})
            // gsap.to(stickRef.current, {duration: 0.5, height: 200})

            stickRef.current.style.height = `${barSettings.height}px`
            stickRef.current.style.transform = `translateY(${-barSettings.height}px)`
            stickRef.current.style.opacity = barSettings.opacity;
        } else {

            gsap.to(barSettings, {duration: 0, height: 0, opacity: 0})
            // gsap.to(stickRef.current, {duration: 0.5, height: 0})
            stickRef.current.style.height = `${barSettings.height}px`
            stickRef.current.style.transform = `translateY(${-barSettings.height}px)`
            stickRef.current.style.opacity = barSettings.opacity;
        }
    })

    return (
        <group>
        <mesh 
            {...props}
            ref={deskRef}
            visible={false}
            onPointerOver={(e) => {
                e.stopPropagation();
                setMouseState({...mouseState, isHovered: true})
            }}
            onPointerOut={(e) => {
                e.stopPropagation()
                setMouseState({isActive: false, isHovered: false})
            }}>
            <boxBufferGeometry args={[10, 5, 5]} />
            <meshStandardMaterial roughness={.3} />
        </mesh>
        <points ref={cloudRef} material={mat}>
            <bufferGeometry attach="geometry">
                <bufferAttribute 
                    attachObject={["attributes", "position"]}
                    count={user_positions.length / 3}
                    array={user_positions}
                    itemSize={3}
                />
                <bufferAttribute 
                    attachObject={["attributes", "color"]}
                    count={user_colors.length / 3}
                    array={user_colors}
                    itemSize={3}
                />
            </bufferGeometry>
        </points>
        <Html
            position={props.position}>
            <div className={classNames} ref={stickRef}>
            <h1 className={"label"}> {props.userData.label} </h1>
            <p className={"text"}>{props.userData.text}</p>
            </div>
        </Html>
        </group>
    )
}

export default Desk;