import { Canvas } from "@react-three/fiber";
import {  OrbitControls } from "@react-three/drei";
import SimpleBuilding from "./building/building";
import { useSelector } from "react-redux";

// import Plane from "./plane";

const MainView = () =>{
    // const building = useSelector((state) => state.buildingType);
    const width = useSelector((state) => state.width);
    const length = useSelector((state) => state.length);
    const roofType = useSelector((state) => state.roofType);
    return (
        <Canvas style={{ height: "100vh", width: "100%" }}>
            {/* <FirstPersonControls movementSpeed={3}/> */}
            <color attach="background" args={[0xccccff]} />
            <SimpleBuilding 
                width={width}
                length={length}
                roofType={roofType}
            />
            <directionalLight position={[-10, -5, 5]} />
            <directionalLight position={[10, 5, -5]} />
            <directionalLight position={[2, 5, -1]} />
            <OrbitControls />
            <axesHelper args={[5]} />
            <gridHelper args={[30, 30]} />
        </Canvas>
    );
}
export default MainView