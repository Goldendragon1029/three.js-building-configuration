import { useMemo } from "react";
import * as THREE from 'three';
import { extrudeSettings } from "../units";

const Building = () => {
    const model = useMemo(() => {
        const newModel = new THREE.Shape()
        newModel.moveTo(0, -2);
        newModel.lineTo(4, -2);
        newModel.lineTo(5, 0);
        newModel.lineTo(4, 2);
        newModel.lineTo(0, 2);
        newModel.closePath();

        const holeModel = new THREE.Path()
        holeModel.moveTo(0, -1);
        holeModel.lineTo(2, -1);
        holeModel.lineTo(2.5, 0);
        holeModel.lineTo(2, 1);
        holeModel.lineTo(0, 1);
        holeModel.closePath();

        newModel.holes.push(holeModel)


        return newModel;
    }, [])
    return(
        <group>
            <group position={[-0.25, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
                <mesh rotation={[Math.PI / 2, 0, 0]}>
                    <extrudeGeometry args={[model, extrudeSettings(0.5)]}/>
                    <meshStandardMaterial color={'green'} side={THREE.DoubleSide} metalness={5} roughness={1}/>
                </mesh>
            </group>
        </group>
    )
}
export default Building;
