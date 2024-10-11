import { Canvas } from "@react-three/fiber";
import { FirstPersonControls, OrbitControls } from "@react-three/drei";
import Building from "./building/building";

// import Plane from "./plane";

const MainView = () =>{

    

    return (
        <Canvas style={{ height: "100vh", width: "100%" }}>
            {/* <FirstPersonControls movementSpeed={3}/> */}
            <color attach="background" args={[0xccccff]} />
            <Building />
            <directionalLight position={[2, 5, 1]} />
            <OrbitControls />
            <axesHelper args={[5]} />
            <gridHelper args={[20, 20]} />
        </Canvas>
    );
}
export default MainView