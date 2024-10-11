import { Canvas } from "@react-three/fiber";
import { FirstPersonControls, OrbitControls, Plane, RoundedBox } from "@react-three/drei";
import { useMemo } from "react";
import * as THREE from 'three';
// import Plane from "./plane";

const MainView = () =>{

    function Extrusion({ start = [0, 0], paths, ...props }) {
        const shape = useMemo(() => {
          const shape = new THREE.Shape()
          shape.moveTo(...start)
          paths.forEach((path) => shape.bezierCurveTo(...path))
          return shape
        }, [start, paths])
        return (
          <mesh>
            <extrudeGeometry args={[shape, props]} />
            <meshPhongMaterial />
          </mesh>
        )
      }

      function Scene() {
        return (
          <Extrusion
            start={[2.5, 2.5]}
            paths={[
              [2.5, 2.5, 2.0, 0, 0, 0],
              [3.0, 0, 3.0, 3.5, 3.0, 3.5],
              [3.0, 5.5, 1.0, 7.7, 2.5, 9.5],
            ]}
            bevelEnabled
            amount={8} />)}

    return (
        <Canvas style={{ height: "100vh", width: "100%" }}>
            {/* <FirstPersonControls movementSpeed={3}/> */}
            <color attach="background" args={[0xccccff]} />
            <Scene />
            <mesh position={[-2, 2, -3]} scale={[1, 0.5, 2]}>
                <boxGeometry args={[2, 3, 2]} />
                <meshNormalMaterial color={0x00bfff}/>
            </mesh>
            <mesh>
                <torusKnotGeometry args={[1.7, 0.3, 256, 256]} />
                <meshToonMaterial color={0x00bfff}/>

            </mesh>
            <directionalLight position={[2, 5, 1]} />
            <OrbitControls />
            <axesHelper args={[5]} />
            <gridHelper args={[20, 20]} />
        </Canvas>
    );
}
export default MainView