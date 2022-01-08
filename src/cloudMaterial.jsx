import * as THREE from "three"
import { ShaderMaterial, Uniform } from 'three'
import { useMemo } from 'react'
import { useFrame } from '@react-three/fiber'

export const useCloudMat = ( size, active ) => {
  const mat = useMemo(
    () =>
      new ShaderMaterial({
        uniforms: {
          uSize: new Uniform(size),
          uTime: new Uniform(0),
          uSelected: new Uniform(active)
        },
        vertexShader: vert,
        fragmentShader: frag
      }),
    [size, active]
  )

  useFrame(({ clock }) => {
    mat.uniforms.uTime.value = clock.getElapsedTime() / 2
  })

  return mat;
}

const vert = `
    uniform float uSize;
    uniform float uTime;
    uniform bool uSelected;

    attribute vec3 color;

    varying vec3 vColor;
    varying vec3 vPosition;
    varying float vDepth;

    float doubleCircleSeat (float x, float a){
      float min_param_a = 0.0;
      float max_param_a = 1.0;
      a = max(min_param_a, min(max_param_a, a)); 
    
      float y = 0.0;
      if (x <= a){
        y = sqrt(a*a - (x-a)*(x-a));
      } else {
        y = 1.0 - sqrt((1.0-a)*(1.0-a) - (x-a)*(x-a));
      }
      return y;
    }

    float random (vec2 st) {
      return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
    }

    float map(float value, float min1, float max1, float min2, float max2) {
      return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
    }

    void main() {
      vColor = color;
      vPosition = position;
      float amp = 0.2;

      // more jiggle
      if(uSelected) {
        amp = 1.0;
      }

      // Adding subtle bob
      vPosition += vec3(
        amp * random(vPosition.yz) * sin(amp*uTime + 20.*random(vPosition.yz)),
        amp * random(vPosition.xz) * sin(amp*uTime + 20.*random(vPosition.xz)),
        amp * random(vPosition.xy) * sin(amp*uTime + 20.*random(vPosition.xy))
      );

      vec4 modelPosition = modelMatrix * vec4(vPosition, 1.0);
      vec4 viewPosition = viewMatrix * modelPosition;
      vec4 projectedPosition = projectionMatrix * viewPosition;

      gl_Position = projectedPosition;

      // size attenuation ? why is there a line lol 
      vDepth = exp(-0.03 * clamp(gl_Position.w, 0.0, 1000.0));
      gl_PointSize = uSize * vDepth;

      if(uSelected) {
        gl_PointSize *= 1.5;
      }
    }
    `

const frag = `
    uniform bool uSelected;

    varying vec3 vColor;
    varying vec3 vPosition;
    varying float vDepth;
    
    void main() {

      // gl_FragColor = vec4(vColor, 1.0);

      // saturation attenuation to white
      gl_FragColor = vec4(vColor * exp(-vDepth + 0.75), 1.0);

      // saturation attenuation to black
      // gl_FragColor = vec4(vColor * vDepth, 1.0);
      
      //debugging
      // gl_FragColor = vec4(vDepth, 0, 0, 1.0);

      // adjusting color brightness
      gl_FragColor = vec4(gl_FragColor.rgb *= 0.8, 1.0);

      // changing color based on selected
      if(!uSelected) {
        gl_FragColor = vec4(gl_FragColor.rgb *= 0.7, 1.0);
      }
    }
    `