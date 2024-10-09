import { Canvas } from "@react-three/fiber";
import { OrbitControls, RoundedBox } from "@react-three/drei";

const MainView = () =>{
    return (
        <Canvas style={{ height: "100vh", width: "100%" }}>
            <color attach="background" args={[0xccccff]} />
            <RoundedBox>
            <meshBasicMaterial color={"green"} />
            </RoundedBox>
            <OrbitControls />
        </Canvas>
    );
}
export default MainView