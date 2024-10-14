import * as THREE from 'three';
import { useMemo } from 'react';
import { TextureLoader } from 'three';
import { extrudeSettings } from "../units";
import { FrontWall } from "../walls/frontWall";
import { BackWall } from "../walls/backWall";
import { SideWall } from "../walls/sideWall";
import { RightRoof } from "../walls/rightRoof";
import { LeftRoof } from "../walls/leftRoof";
import { RidgeRoof } from '../walls/ridgeRoof';
import { useLoader } from '@react-three/fiber';

// const holeModel = new THREE.Path()
// holeModel.moveTo(0, -1);
// holeModel.lineTo(2, -1);
// holeModel.lineTo(2.5, 0);
// holeModel.lineTo(2, 1);
// holeModel.lineTo(0, 1);
// holeModel.closePath();
// newModel.holes.push(holeModel)



const SimpleBuilding = (props) => {
    const wallDepth = 0.05;
    const ridgeDepth = 0.02;
    const wallHeight = 3;
    const roofAngle = 30 * Math.PI / 180;
    const roofLength = props.length * 1.1;
    const roofWidth = props.width * 1.2;

    const horizontalLoader = useLoader(TextureLoader, './image/material/horizontalTexture.jpg');
    const verticalLoader = useLoader(TextureLoader, './image/material/verticalTexture.jpg');

    const horizontalTexture = horizontalLoader.clone();
    horizontalTexture.wrapS = THREE.RepeatWrapping;
    horizontalTexture.wrapT = THREE.RepeatWrapping;
    horizontalTexture.repeat.set(2,3);
    
    const verticalTexture = verticalLoader.clone();
    verticalTexture.wrapS = THREE.RepeatWrapping;
    verticalTexture.wrapT = THREE.RepeatWrapping;
    verticalTexture.repeat.set(2,3);
    
    let selectedTexture = horizontalTexture;
    
    selectedTexture = useMemo(() => {
        const newTexture = props.roofType === 'Horizontal' ? horizontalTexture : verticalTexture;
        return newTexture
    }, [props.roofType, horizontalTexture, verticalTexture]);
    
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
                    <meshLambertMaterial map={selectedTexture} bumpMap={selectedTexture} bumpScale={0.02} side={THREE.DoubleSide} toneMapped={false} />
                </mesh>
            </group>

            <group position={[0, wallHeight + props.width * Math.tan(roofAngle) / 2, 0]} >
                <mesh rotation={[ - Math.PI / 2 + roofAngle, 0, 0]}>
                    <extrudeGeometry args={[LeftRoof(roofWidth, roofLength, roofAngle), extrudeSettings(wallDepth)]}/>
                    <meshLambertMaterial map={selectedTexture} bumpMap={selectedTexture} bumpScale={0.02} side={THREE.DoubleSide} toneMapped={false} />
                </mesh>
            </group>

            <group position={[roofLength / 2, props.width / 2 * Math.tan(roofAngle) + wallHeight - roofWidth / 2 * Math.tan(roofAngle), 0]} >
                <mesh rotation={[0, Math.PI / 2, 0]}>
                    <extrudeGeometry args={[RidgeRoof(roofWidth, wallDepth, roofAngle), extrudeSettings(ridgeDepth)]}/>
                    <meshStandardMaterial color={0x964b00} side={THREE.DoubleSide} metalness={5} roughness={1}/>
                </mesh>
            </group>

            <group position={[ - roofLength / 2, props.width / 2 * Math.tan(roofAngle) + wallHeight - roofWidth / 2 * Math.tan(roofAngle), 0]} rotation={[0, Math.PI, 0]}>
                <mesh rotation={[0, Math.PI / 2, 0]}>
                    <extrudeGeometry args={[RidgeRoof(roofWidth, wallDepth, roofAngle), extrudeSettings(ridgeDepth)]}/>
                    <meshStandardMaterial color={0x964b00} side={THREE.DoubleSide} metalness={5} roughness={1}/>
                </mesh>
            </group>
            
            <group position={[  roofLength / 2 + ridgeDepth, props.width / 2 * Math.tan(roofAngle) + wallHeight + wallDepth / Math.cos(roofAngle) - roofWidth / 10 / 2 * Math.tan(roofAngle), 0]} rotation={[0, Math.PI, 0]}>
                <mesh rotation={[0, Math.PI / 2, 0]}>
                    <extrudeGeometry args={[RidgeRoof(roofWidth / 10, ridgeDepth, roofAngle), extrudeSettings(roofLength + ridgeDepth * 2)]}/>
                    <meshStandardMaterial color={0x964b00} side={THREE.DoubleSide} metalness={5} roughness={1}/>
                </mesh>
            </group>

        </group>
    )
}
export default SimpleBuilding;
