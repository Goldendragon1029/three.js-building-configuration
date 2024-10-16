import { Canvas } from "@react-three/fiber";
import {  OrbitControls } from "@react-three/drei";
import SimpleBuilding from "./building/building";
import { useSelector } from "react-redux";
import { Button, ButtonGroup } from "@mui/material";
import { CameraController } from "./camera";
import { useState } from "react";

// import Plane from "./plane";

const MainView = () =>{
    // const building = useSelector((state) => state.buildingType);
    const [position, setPosition] = useState({
        x: 10,
        y: 10,
        z: 10
    });
    const width = useSelector((state) => state.width);
    const length = useSelector((state) => state.length);
    const roofType = useSelector((state) => state.roofType);
    const doorType = useSelector((state) => state.doorType);

    const handleCamera = (value) => {
        switch (value) {
            case 'front':
                setPosition({
                    x: 15,
                    y: 7,
                    z: 0
                })
                break;
            case 'right':
                setPosition({
                    x: 0,
                    y: 7,
                    z: 15
                })
                break;
            case 'left':
                setPosition({
                    x: 0,
                    y: 7,
                    z: -15
                })
                break;
            case 'back':
                setPosition({
                    x: -15,
                    y: 7,
                    z: 0
                })
                break;
            default:
                break;
        }
    }

    return (
        <>
            <Canvas style={{ height: "100vh", width: "100%" }}>
                {/* <FirstPersonControls movementSpeed={3}/> */}
                <color attach="background" args={[0xccccff]} />
                <SimpleBuilding 
                    width={width}
                    length={length}
                    roofType={roofType}
                    doorType={doorType}
                />
                <directionalLight position={[-10, -5, 5]} />
                <directionalLight position={[10, 5, -5]} />
                <directionalLight position={[2, 5, -1]} />
                <CameraController position={position}/>
                <OrbitControls />
                <axesHelper args={[5]} />
                <gridHelper args={[30, 30]} />
            </Canvas>
            <ButtonGroup variant="contained" aria-label="Basic button group" className="absolute z-10 p-1 right-20 top-20">
                <Button className="text-black bg-white opacity-80" onClick={() => handleCamera('front')}>Front</Button>
                <Button className="text-black bg-white opacity-80" onClick={() => handleCamera('right')}>Right</Button>
                <Button className="text-black bg-white opacity-80" onClick={() => handleCamera('left')}>Left</Button>
                <Button className="text-black bg-white opacity-80" onClick={() => handleCamera('back')}>Back</Button>
            </ButtonGroup>
        </>
    );
}
export default MainView