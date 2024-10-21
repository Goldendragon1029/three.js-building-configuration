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

    const [moveWidth, setMoveWidth] = useState( - buildingLength / 2 );
    const [moveLength, setMoveLength] = useState(0);

    useEffect(() => {
      if (buildingType === 'Simple') {
        setMoveWidth( - buildingLength / 2 ); 
        setMoveLength(0);
      } else {
        setMoveWidth(buildingWidth / 2 - buildingLength / 2);
        setMoveLength(buildingLength / 2);
      }
    }, [buildingType, buildingLength, buildingWidth]);

    const wallLoader = useLoader(TextureLoader, './image/material/wall.jpg');

    const sideWallTexture = wallLoader.clone();
    sideWallTexture.wrapS = THREE.RepeatWrapping;
    sideWallTexture.wrapT = THREE.RepeatWrapping;
    sideWallTexture.repeat.set(1, 3);

    const backWallTexture = wallLoader.clone();
    backWallTexture.wrapS = THREE.RepeatWrapping;
    backWallTexture.wrapT = THREE.RepeatWrapping;
    backWallTexture.repeat.set(1, 3);
    backWallTexture.rotation = Math.PI / 2;

    return (
        <group>
            <group>
                <mesh position={[moveWidth, 0, - buildingWidth / 2 + moveLength]} castShadow>
                    <extrudeGeometry args={[SideWall(buildingLength, wallHeight, wallDepth), extrudeSettings( - wallDepth)]}/>
                    <meshLambertMaterial map={sideWallTexture} bumpMap={sideWallTexture} bumpScale={0.02} side={THREE.DoubleSide} toneMapped={false} />
                </mesh>
            </group>
            {buildingType === 'Complex' && 
                <group position={[ - buildingLength / 2, 0, - buildingWidth / 2 - buildingLength / 2]}>
                    <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
                        <extrudeGeometry args={[BackWall(buildingWidth, wallHeight, roofAngle), extrudeSettings( - wallDepth)]}/>
                        <meshLambertMaterial map={backWallTexture} bumpMap={backWallTexture} bumpScale={0.02} side={THREE.DoubleSide} toneMapped={false} />
                    </mesh>
                </group>
            }
        </group>
    )
}
export default Right;