import * as THREE from 'three';
import { extrudeSettings } from "../units";
import { useSelector } from 'react-redux';
import { Pillar } from '../walls/pillar';

const Trim = () => {

    const buildingWidth = useSelector((state) => state.width);
    const buildingLength = useSelector((state) => state.length);

    const wallHeight = 3;
    const pillarWidth = 0.1;

    return (
        <group>
            <group position={[buildingLength / 2 - pillarWidth / 4, 0, - buildingWidth / 2 + pillarWidth / 4]}>
                <mesh rotation={[ - Math.PI / 2, 0, 0]}>
                    <extrudeGeometry args={[Pillar(pillarWidth), extrudeSettings(wallHeight)]} />
                    <meshStandardMaterial color={0x666666} side={THREE.DoubleSide} metalness={5} roughness={1} />
                </mesh>
            </group>
            <group position={[ - buildingLength / 2 + pillarWidth / 4, 0, - buildingWidth / 2 + pillarWidth / 4]} rotation={[0, Math.PI / 2, 0]}>
                <mesh rotation={[ - Math.PI / 2, 0, 0]}>
                    <extrudeGeometry args={[Pillar(pillarWidth), extrudeSettings(wallHeight)]} />
                    <meshStandardMaterial color={0x666666} side={THREE.DoubleSide} metalness={5} roughness={1} />
                </mesh>
            </group>
            <group position={[ - buildingLength / 2 + pillarWidth / 4, 0,  buildingWidth / 2 - pillarWidth / 4]} rotation={[0, Math.PI, 0]}>
                <mesh rotation={[ - Math.PI / 2, 0, 0]}>
                    <extrudeGeometry args={[Pillar(pillarWidth), extrudeSettings(wallHeight)]} />
                    <meshStandardMaterial color={0x666666} side={THREE.DoubleSide} metalness={5} roughness={1} />
                </mesh>
            </group>
            <group position={[  buildingLength / 2 - pillarWidth / 4, 0,  buildingWidth / 2 - pillarWidth / 4]} rotation={[0, - Math.PI / 2, 0]}>
                <mesh rotation={[ - Math.PI / 2, 0, 0]}>
                    <extrudeGeometry args={[Pillar(pillarWidth), extrudeSettings(wallHeight)]} />
                    <meshStandardMaterial color={0x666666} side={THREE.DoubleSide} metalness={5} roughness={1} />
                </mesh>
            </group>
        </group>
    )
}
export default Trim;