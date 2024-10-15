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
import { DoorFrame } from '../walls/doorFrame';
import { useLoader } from '@react-three/fiber';

const SimpleBuilding = (props) => {
    const wallDepth = 0.05;
    const ridgeDepth = 0.02;
    const wallHeight = 3;
    const roofAngle = 30 * Math.PI / 180;
    const roofLength = props.length + 0.7;
    const roofWidth = props.width + 0.7;
    const doorWidth = props.width / 3;
    const doorHeight = 2.5;
    const sillHeight = 0.05;
    const doorFrameWidth = 0.05;

    const horizontalLoader = useLoader(TextureLoader, './image/material/horizontalTexture.jpg');
    const verticalLoader = useLoader(TextureLoader, './image/material/verticalTexture.jpg');
    const wallLoader = useLoader(TextureLoader, './image/material/wall.jpg');
    const doorLoader = useLoader(TextureLoader, './image/material/door_displacement_texture.jpg');
    const shaderDoorLoader = useLoader(TextureLoader, './image/material/door_displacement_shader_texture.png');
    shaderDoorLoader.rotation = Math.PI / 2;

    const horizontalTexture = horizontalLoader.clone();
    horizontalTexture.wrapS = THREE.RepeatWrapping;
    horizontalTexture.wrapT = THREE.RepeatWrapping;
    horizontalTexture.repeat.set(2, 3);
    
    const verticalTexture = verticalLoader.clone();
    verticalTexture.wrapS = THREE.RepeatWrapping;
    verticalTexture.wrapT = THREE.RepeatWrapping;
    verticalTexture.repeat.set(2, 3);

    const frontWallTexture = wallLoader.clone();
    frontWallTexture.wrapS = THREE.RepeatWrapping;
    frontWallTexture.wrapT = THREE.RepeatWrapping;
    frontWallTexture.repeat.set(2, 3);
    frontWallTexture.rotation = Math.PI / 2;

    const sideWallTexture = wallLoader.clone();
    sideWallTexture.wrapS = THREE.RepeatWrapping;
    sideWallTexture.wrapT = THREE.RepeatWrapping;
    sideWallTexture.repeat.set(1, 3);

    const doorTexture = doorLoader.clone();
    // doorTexture.wrapS = THREE.ClampToEdgeWrapping;
    // doorTexture.wrapT = THREE.ClampToEdgeWrapping;
    // doorTexture.repeat.set(1, 0.5);
    
    // doorTexture.offset.set(0.5, -0.1);
    doorTexture.wrapS = THREE.RepeatWrapping;
    doorTexture.wrapT = THREE.RepeatWrapping;
    doorTexture.repeat.set(1, 2);
    
    doorTexture.rotation = - Math.PI / 2 ;
    
    let selectedTexture = horizontalTexture;
    
    selectedTexture = useMemo(() => {
        const newTexture = props.roofType === 'Horizontal' ? horizontalTexture : verticalTexture;
        return newTexture
    }, [props.roofType, horizontalTexture, verticalTexture]);
    
    return(
        <group>
            <group position={[props.length / 2, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
                <mesh rotation={[Math.PI / 2, 0, 0]}>
                    <extrudeGeometry args={[FrontWall(props.width, wallHeight, roofAngle, doorWidth, doorHeight, sillHeight, doorFrameWidth), extrudeSettings(wallDepth)]}/>
                    <meshLambertMaterial map={frontWallTexture} bumpMap={frontWallTexture} bumpScale={0.02} side={THREE.DoubleSide} toneMapped={false} />
                </mesh>
            </group>
            <group position={[props.length / 2, sillHeight, 0]} rotation={[0, 0, Math.PI / 2]}>
                <mesh rotation={[Math.PI / 2, 0, 0]}>
                    <extrudeGeometry args={[DoorFrame(doorWidth, doorHeight, doorFrameWidth), extrudeSettings(wallDepth + 0.02)]}/>
                    <meshStandardMaterial color={0x666666} side={THREE.DoubleSide} metalness={5} roughness={1} />
                </mesh>
            </group>
            <group position={[props.length / 2, doorHeight / 2 + sillHeight, 0]} rotation={[0, 0, Math.PI / 2]}>
                <mesh rotation={[Math.PI / 2, 0, 0]}>
                    {/* <extrudeGeometry args={[Door(props.width, wallHeight, roofAngle), extrudeSettings(wallDepth + 0.1)]}/> */}
                    <planeGeometry args={[doorHeight, doorWidth, 256, 256]} />
                    <meshStandardMaterial displacementMap={doorTexture} map={shaderDoorLoader} bumpMap={doorTexture} bumpScale={1} displacementScale={0.07}  side={THREE.DoubleSide} metalness={0.4} roughness={0.6} color={"white"} emissive={"gray"} />
                </mesh>
            </group>
            <group position={[ - props.length / 2, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
                <mesh rotation={[Math.PI / 2, 0, 0]}>
                    <extrudeGeometry args={[BackWall(props.width, wallHeight, roofAngle), extrudeSettings( - wallDepth)]}/>
                    <meshLambertMaterial map={frontWallTexture} bumpMap={frontWallTexture} bumpScale={0.02} side={THREE.DoubleSide} toneMapped={false} />
                </mesh>
            </group>
            <group>
                <mesh position={[ - props.length / 2 - wallDepth, 0, - props.width / 2]}>
                    <extrudeGeometry args={[SideWall(props.length, wallHeight, wallDepth), extrudeSettings( - wallDepth)]}/>
                    <meshLambertMaterial map={sideWallTexture} bumpMap={sideWallTexture} bumpScale={0.02} side={THREE.DoubleSide} toneMapped={false} />
                </mesh>
            </group>
            <group>
                <mesh position={[ - props.length / 2 - wallDepth, 0, props.width / 2]}>
                    <extrudeGeometry args={[SideWall(props.length, wallHeight, wallDepth), extrudeSettings(wallDepth)]}/>
                    <meshLambertMaterial map={sideWallTexture} bumpMap={sideWallTexture} bumpScale={0.02} side={THREE.DoubleSide} toneMapped={false} />
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
            
            <group position={[  roofLength / 2 + ridgeDepth, props.width / 2 * Math.tan(roofAngle) + wallHeight + wallDepth / Math.cos(roofAngle) - roofWidth / 20 / 2 * Math.tan(roofAngle), 0]} rotation={[0, Math.PI, 0]}>
                <mesh rotation={[0, Math.PI / 2, 0]}>
                    <extrudeGeometry args={[RidgeRoof(roofWidth / 20, ridgeDepth, roofAngle), extrudeSettings(roofLength + ridgeDepth * 2)]}/>
                    <meshStandardMaterial color={0x964b00} side={THREE.DoubleSide} metalness={5} roughness={1}/>
                </mesh>
            </group>

        </group>
    )
}
export default SimpleBuilding;
