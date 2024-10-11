import { Canvas } from "@react-three/fiber";
import { FirstPersonControls, OrbitControls } from "@react-three/drei";
import Wall from "./building/wall";

// import Plane from "./plane";

const MainView = () =>{

    

    return (
        <Canvas style={{ height: "100vh", width: "100%" }}>
            {/* <FirstPersonControls movementSpeed={3}/> */}
            <color attach="background" args={[0xccccff]} />
            <Wall />
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