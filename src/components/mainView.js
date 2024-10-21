import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import SimpleBuilding from "./building";
import { useSelector } from "react-redux";
import { Button, ButtonGroup } from "@mui/material";
import { CameraController } from "./camera";
import { useState } from "react";

const MainView = () =>{
    const [position, setPosition] = useState({
        x: 10,
        y: 10,
        z: 10
    });
    const width = useSelector((state) => state.width);
    const length = useSelector((state) => state.length);
    const roofType = useSelector((state) => state.roofType);
    const doorType = useSelector((state) => state.doorType);
    const roofAngle = useSelector((state) => state.roofAngle);

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
            <Canvas style={{ height: "100vh", width: "100%" }} shadows camera={{near: 1, far: 70}}>
                <color attach="background" args={[0xccccff]} />
                <SimpleBuilding 
                    width={width}
                    length={length}
                    roofType={roofType}
                    doorType={doorType}
                    roofAngle={roofAngle}
                />
                <directionalLight 
                    position={[20, 10, 10]}
                    intensity={3}
                    castShadow
                    shadow-mapSize-width={1024} 
                    shadow-mapSize-height={1024}
                    shadow-camera-near={0.1}
                    shadow-camera-far={50}
                    shadow-camera-right={20}
                    shadow-camera-left={-20}
                    shadow-camera-top={20}
                    shadow-camera-bottom={-20}
                />
                <ambientLight intensity={0.1}/>
                <CameraController position={position}/>
                <OrbitControls 
                    maxPolarAngle={Math.PI / 2 - 0.05}
                    enablePan={false}
                    minDistance={16}
                    maxDistance={40}
                />
                <fog attach={"fog"} color={"gray"} near={40} far={70} />
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