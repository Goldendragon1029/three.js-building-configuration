import * as THREE from 'three';
import { extrudeSettings } from "../units";
import { FrontWall } from "../walls/frontWall";
import { BackWall } from "../walls/backWall";
import { SideWall } from "../walls/sideWall";
import { RightRoof } from "../walls/rightRoof";
import { LeftRoof } from "../walls/leftRoof";

// const holeModel = new THREE.Path()
// holeModel.moveTo(0, -1);
// holeModel.lineTo(2, -1);
// holeModel.lineTo(2.5, 0);
// holeModel.lineTo(2, 1);
// holeModel.lineTo(0, 1);
// holeModel.closePath();
// newModel.holes.push(holeModel)



const SimpleBuilding = (props) => {
    const wallDepth = 0.1;
    const wallHeight = 3;
    const roofAngle = 30 * Math.PI / 180;
    const roofLength = props.length * 1.1;
    const roofWidth = props.width * 1.2;
    
    return(
        <group>
            <group position={[props.length / 2, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
                <mesh rotation={[Math.PI / 2, 0, 0]}>
                    <extrudeGeometry args={[FrontWall(props.width, wallHeight, roofAngle), extrudeSettings(wallDepth)]}/>
                    <meshStandardMaterial color={'green'} side={THREE.DoubleSide} metalness={5} roughness={1}/>
                </mesh>
            </group>
            <group position={[ - props.length / 2, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
                <mesh rotation={[Math.PI / 2, 0, 0]}>
                    <extrudeGeometry args={[BackWall(props.width, wallHeight, roofAngle), extrudeSettings( - wallDepth)]}/>
                    <meshStandardMaterial color={'green'} side={THREE.DoubleSide} metalness={5} roughness={1}/>
                </mesh>
            </group>
            <group>
                <mesh position={[ - props.length / 2 - wallDepth, 0, - props.width / 2]}>
                    <extrudeGeometry args={[SideWall(props.length, wallHeight, wallDepth), extrudeSettings( - wallDepth)]}/>
                    <meshStandardMaterial color={'green'} side={THREE.DoubleSide} metalness={5} roughness={1}/>
                </mesh>
            </group>
            <group>
                <mesh position={[ - props.length / 2 - wallDepth, 0, props.width / 2]}>
                    <extrudeGeometry args={[SideWall(props.length, wallHeight, wallDepth), extrudeSettings(wallDepth)]}/>
                    <meshStandardMaterial color={'green'} side={THREE.DoubleSide} metalness={5} roughness={1}/>
                </mesh>
            </group>
            <group position={[0, wallHeight + props.width * Math.tan(roofAngle) / 2, 0]} >
                <mesh rotation={[ -  Math.PI / 2 - roofAngle, 0, 0]}>
                    <extrudeGeometry args={[RightRoof(roofWidth, roofLength, roofAngle), extrudeSettings(wallDepth)]}/>
                    <meshStandardMaterial color={'green'} side={THREE.DoubleSide} metalness={5} roughness={1}/>
                </mesh>
            </group>

            <group position={[0, wallHeight + props.width * Math.tan(roofAngle) / 2, 0]} >
                <mesh rotation={[ - Math.PI / 2 + roofAngle, 0, 0]}>
                    <extrudeGeometry args={[LeftRoof(roofWidth, roofLength, roofAngle), extrudeSettings(wallDepth)]}/>
                    <meshStandardMaterial color={'green'} side={THREE.DoubleSide} metalness={5} roughness={1}/>
                </mesh>
            </group>
        </group>
    )
}
export default SimpleBuilding;
