import { useEffect, useState } from 'react';
import * as THREE from 'three';
import { TextureLoader } from 'three';
import { extrudeSettings } from "../units";
import { useLoader } from '@react-three/fiber';
import { useSelector } from 'react-redux';
import { SideWall } from '../walls/sideWall';
import { BackWall } from '../walls/backWall';

const Right = () => {

    const buildingType = useSelector((state) => state.buildingType);
    const buildingWidth = useSelector((state) => state.width);
    const buildingLength = useSelector((state) => state.length);
    const angle = useSelector((state) => state.roofAngle);

    const wallDepth = 0.05;
    const wallHeight = 3;
    const roofAngle = angle * Math.PI / 180;

    const [moveLength, setMoveLength] = useState( - buildingLength / 2 );

    useEffect(() => {
      if (buildingType === 'Simple') {
        setMoveLength( - buildingLength / 2 ); 
      } else {
        setMoveLength(buildingWidth / 2);
      }
    }, [buildingType, buildingLength, buildingWidth]);

    const wallLoader = useLoader(TextureLoader, './image/material/wall.jpg');

    const sideWallTexture = wallLoader.clone();
    sideWallTexture.wrapS = THREE.RepeatWrapping;
    sideWallTexture.wrapT = THREE.RepeatWrapping;
    sideWallTexture.repeat.set(1, 3);

    return (
        <group>
            <group>
                <mesh position={[moveLength, 0, - buildingWidth / 2]} castShadow>
                    <extrudeGeometry args={[SideWall(buildingLength, wallHeight, wallDepth), extrudeSettings( - wallDepth)]}/>
                    <meshLambertMaterial map={sideWallTexture} bumpMap={sideWallTexture} bumpScale={0.02} side={THREE.DoubleSide} toneMapped={false} />
                </mesh>
            </group>
            {buildingType === 'Complex' && 
                <group position={[0, 0, - buildingWidth / 2 - buildingLength]}>
                    <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
                        <extrudeGeometry args={[BackWall(buildingWidth, wallHeight, roofAngle), extrudeSettings( - wallDepth)]}/>
                        <meshLambertMaterial map={sideWallTexture} bumpMap={sideWallTexture} bumpScale={0.02} side={THREE.DoubleSide} toneMapped={false} />
                    </mesh>
                </group>
            }
        </group>
    )
}
export default Right;