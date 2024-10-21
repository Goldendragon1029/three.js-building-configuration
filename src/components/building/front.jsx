import * as THREE from 'three';
import { TextureLoader } from 'three';
import { extrudeSettings } from "../units";
import { FrontWall } from "../walls/frontWall";
import { DoorFrame } from '../walls/doorFrame';
import { WoodDoor } from '../walls/woodDoor';
import { DoorPattern } from '../walls/doorPattern';
import { DoorGlass } from '../walls/doorGlass';
import { useLoader } from '@react-three/fiber';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { SideWall } from '../walls/sideWall';

const Front = () => {

    const buildingType = useSelector((state) => state.buildingType);
    const buildingWidth = useSelector((state) => state.width);
    const buildingLength = useSelector((state) => state.length);
    const doorType = useSelector((state) => state.doorType);
    const angle = useSelector((state) => state.roofAngle);


    const [moveWidth, setMoveWidth] = useState(buildingLength / 2);
    const [moveLength, setMoveLength] = useState(0);

    useEffect(() => {
      if (buildingType === 'Simple') {
        setMoveWidth(buildingLength / 2);
        setMoveLength(0);
      } else {
        setMoveWidth(buildingLength / 2 + buildingWidth / 2);
        setMoveLength(buildingLength / 2);
      }
    }, [buildingType, buildingLength, buildingWidth]);
    
    const wallDepth = 0.05;
    const wallHeight = 3;
    const roofAngle = angle * Math.PI / 180;
    const doorWidth = 2.5;
    const doorHeight = 2.5;
    const sillHeight = 0.05;
    const doorFrameWidth = 0.05;
    const miniHoleNumber = 4;
    const sideWidth = 0.2;
    const miniHoleWidth = (doorWidth - sideWidth * (miniHoleNumber + 1)) / miniHoleNumber;
    const bevelSize = 0.02;

    const wallLoader = useLoader(TextureLoader, './image/material/wall.jpg');
    const doorLoader = useLoader(TextureLoader, './image/material/door_displacement_texture.jpg');
    const shaderDoorLoader = useLoader(TextureLoader, './image/material/door_displacement_shader_texture.png');
    const glassLoader = new THREE.CubeTextureLoader().setPath('./image/material/').load(['glass-texture.jpg', 'glass-texture.jpg', 'glass-texture.jpg', 'glass-texture.jpg', 'glass-texture.jpg', 'glass-texture.jpg']);
    
    shaderDoorLoader.rotation = Math.PI / 2;

    const frontWallTexture = wallLoader.clone();
    frontWallTexture.wrapS = THREE.RepeatWrapping;
    frontWallTexture.wrapT = THREE.RepeatWrapping;
    frontWallTexture.repeat.set(2, 3);
    frontWallTexture.rotation = Math.PI / 2;

    const sideWallTexture = wallLoader.clone();
    sideWallTexture.wrapS = THREE.RepeatWrapping;
    sideWallTexture.wrapT = THREE.RepeatWrapping;
    sideWallTexture.repeat.set(2, 3);

    const doorTexture = doorLoader.clone();
    doorTexture.wrapS = THREE.RepeatWrapping;
    doorTexture.wrapT = THREE.RepeatWrapping;
    doorTexture.repeat.set(1, 2);
    doorTexture.rotation = - Math.PI / 2 ;

    return (
        <group>
            <group position={[moveWidth, 0, moveLength]}>
                <group position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
                    <mesh rotation={[Math.PI / 2, 0, 0]}>
                        <extrudeGeometry args={[FrontWall(buildingWidth, wallHeight, roofAngle, doorWidth, doorHeight, sillHeight, doorFrameWidth), extrudeSettings(wallDepth)]}/>
                        <meshLambertMaterial map={frontWallTexture} bumpMap={frontWallTexture} bumpScale={0.02} side={THREE.DoubleSide} toneMapped={false} />
                    </mesh>
                </group>
                <group position={[0, sillHeight, 0]} rotation={[0, 0, Math.PI / 2]}>
                    <mesh rotation={[Math.PI / 2, 0, 0]}>
                        <extrudeGeometry args={[DoorFrame(doorWidth, doorHeight, doorFrameWidth), extrudeSettings(wallDepth + 0.02)]}/>
                        <meshStandardMaterial color={0x666666} side={THREE.DoubleSide} metalness={5} roughness={1} />
                    </mesh>
                </group>
                {doorType === 'Roll-Door' && (<group position={[0, doorHeight / 2 + sillHeight, 0]} rotation={[0, 0, Math.PI / 2]}>
                    <mesh rotation={[Math.PI / 2, 0, 0]}>
                        <planeGeometry args={[doorHeight, doorWidth, 256, 256]} />
                        <meshStandardMaterial displacementMap={doorTexture} map={shaderDoorLoader} bumpMap={doorTexture} bumpScale={1} displacementScale={0.07}  side={THREE.DoubleSide} metalness={0.4} roughness={0.6} color={"white"} emissive={"gray"} />
                    </mesh>
                </group>)}
                {doorType === 'Standard' && (
                    <group>
                        <group position={[0, sillHeight, 0]} rotation={[0, 0, Math.PI / 2]}>
                            <mesh rotation={[Math.PI / 2, 0, 0]}>
                                <extrudeGeometry args={[WoodDoor(doorWidth, doorHeight, miniHoleNumber), extrudeSettings(wallDepth)]}/>
                                <meshStandardMaterial color={0x888888} side={THREE.DoubleSide} metalness={5} roughness={1} />
                            </mesh>
                        </group>

                        <group position={[0, sillHeight, 0]} rotation={[0, 0, Math.PI / 2]}>
                            <mesh rotation={[Math.PI / 2, 0, 0]}>
                                <extrudeGeometry args={[DoorGlass(doorWidth, doorHeight), extrudeSettings(wallDepth / 2)]}/>
                                <meshPhongMaterial envMap={glassLoader} reflectivity={1} color={'white'}/>
                            </mesh>
                        </group>

                        {(() => {
                            const listPatterns = [];
                            for (let index = 0; index < miniHoleNumber; index++) {
                                listPatterns.push(
                                    <group position={[0 + bevelSize / 2, sillHeight, - doorWidth / 2 + sideWidth * (index + 1) + miniHoleWidth * index]} rotation={[0, 0, Math.PI / 2]}>
                                        <mesh rotation={[Math.PI / 2, 0, 0]}>
                                            <extrudeGeometry args={[DoorPattern(doorWidth, doorHeight, miniHoleNumber, sideWidth, bevelSize), extrudeSettings(wallDepth / 2, 0.01, bevelSize, 0, 1)]}/>
                                            <meshStandardMaterial color={0x888888} side={THREE.DoubleSide} metalness={5} roughness={1} />
                                        </mesh>
                                    </group>
                                );
                            }
                            return listPatterns;
                        })()}

                    </group>
                )}
            </group>
            {buildingType === 'Complex' && 
                <group position={[buildingWidth / 2 - buildingLength / 2, 0, - buildingWidth / 2 + buildingLength / 2]}>
                    <mesh rotation={[0, Math.PI / 2, 0]} receiveShadow>
                        <extrudeGeometry args={[SideWall(buildingLength, wallHeight, wallDepth), extrudeSettings(wallDepth)]}/>
                        <meshLambertMaterial map={sideWallTexture} bumpMap={sideWallTexture} bumpScale={0.02} side={THREE.DoubleSide} toneMapped={false} />
                    </mesh>
                </group>
            }
        </group>
    )
}
export default Front;