import { Suspense, useState, useRef } from "react"
import { Canvas, extend, useFrame } from "@react-three/fiber"
import { OrbitControls, Environment } from "@react-three/drei"
import './App.css';

import Desk from "./Desk";
import Cloud from "./Cloud";

import alison from "./jsons/split/alison.json"
import eric from "./jsons/split/eric.json"
import max from "./jsons/split/max.json"
import dan from "./jsons/split/dan.json"
import sea from "./jsons/split/sea.json"
import ming from "./jsons/split/ming.json"
import kimbo from "./jsons/split/kimbo.json"
import jackie from "./jsons/split/jackie.json"
import rachel from "./jsons/split/rachel.json"
import richard from "./jsons/split/richard.json"

export default function App () {

  return (
    <>
    <Canvas gl={{alpha:false}} camera={{position: [38, 25, 38]}}>

      {/* make the clear color blue */}
      <color attach="background" args={["#0a1212"]} />
      <OrbitControls 
        autoRotate 
        autoRotateSpeed={3.0}
        enableDamping
        dampingFactor={0.5}
        enablePan={false}
        minPolarAngle={Math.PI/4}
        maxPolarAngle={Math.PI/2}
        minDistance={5}
        maxDistance={100}/>

      {/* STUFF */}
      <Desk
        json={alison}
        position={[16.5, 2, -12]} 
        userData={{id: "alison",
                   label: "Alison Hu", 
                   text:"UX & HCI Designer"}} 
      />
      <Desk
        json={eric}
        position={[16.5, 2, -5]} 
        userData={{id: "eric",
                   label: "Eric Zhao", 
                   text:"Interaction & UX Designer"}} 
      />
      <Desk
        json={max}
        position={[4, 2, -12]} 
        userData={{id: "max",
                   label: "Max Shim", 
                   text:"Environments Designer"}} 
      />
      <Desk
        json={dan}
        position={[4, 2, -5]} 
        userData={{id: "dan",
                   label: "Daniel Zhu", 
                   text:"Digital & HCI Designer"}} 
      />
      <Desk
        json={rachel}
        position={[16.5, 2, 14]} 
        userData={{id: "rachel",
                   label: "Rachel Legg", 
                   text:"Environments Designer"}} 
      />
      <Desk
        json={richard}
        position={[16.5, 2, 21]} 
        userData={{id: "richard",
                   label: "Richard Zhou", 
                   text:"WebGL & AR/VR Designer"}} 
      />
      <Desk
        json={jackie}
        position={[5, 2, 14]} 
        userData={{id: "jackie",
                   label: "Jiaqi Wang", 
                   text:"Environments Designer"}} 
      />
      <Desk
        json={kimbo}
        position={[5, 2, 21]} 
        userData={{id: "kimbo",
                   label: "Michael Kim", 
                   text:"3D Artist & Designer"}} 
      />
      <Desk
        json={sea}
        position={[-7, 2, 14]} 
        userData={{id: "sea",
                   label: "Se-A Kim", 
                   text:"Environments Designer"}} 
      />
      <Desk
        json={ming}
        position={[-7, 2, 21]} 
        userData={{id: "ming",
                   label: "Ruoming Xin", 
                   text:"Graphic Designer"}} 
      />

      <Cloud />

    </Canvas>
    </>
  )
}