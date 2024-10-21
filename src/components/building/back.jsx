import * as THREE from 'three';
import { TextureLoader } from 'three';
import { extrudeSettings } from "../units";
import { useLoader } from '@react-three/fiber';
import { useSelector } from 'react-redux';
import { BackWall } from '../walls/backWall';
import { SideWall } from '../walls/sideWall';

const Back = () => {

    const buildingType = useSelector((state) => state.buildingType);
    const buildingWidth = useSelector((state) => state.width);
    const buildingLength = useSelector((state) => state.length);
    const angle = useSelector((state) => state.roofAngle);

    const wallDepth = 0.05;
    const wallHeight = 3;
    const roofAngle = angle * Math.PI / 180;

    const wallLoader = useLoader(TextureLoader, './image/material/wall.jpg');

    const frontWallTexture = wallLoader.clone();
    frontWallTexture.wrapS = THREE.RepeatWrapping;
    frontWallTexture.wrapT = THREE.RepeatWrapping;
    frontWallTexture.repeat.set(2, 3);
    frontWallTexture.rotation = Math.PI / 2;

    const sideWallTexture = wallLoader.clone();
    sideWallTexture.wrapS = THREE.RepeatWrapping;
    sideWallTexture.wrapT = THREE.RepeatWrapping;
    sideWallTexture.repeat.set(2, 3);

    return (
        <group>
            {buildingType === 'Simple' && 
                <group position={[ - buildingLength / 2, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
                    <mesh rotation={[Math.PI / 2, 0, 0]} castShadow>
                        <extrudeGeometry args={[BackWall(buildingWidth, wallHeight, roofAngle), extrudeSettings( - wallDepth)]}/>
                        <meshLambertMaterial map={frontWallTexture} bumpMap={frontWallTexture} bumpScale={0.02} side={THREE.DoubleSide} toneMapped={false} />
                    </mesh>
                </group>
            }
            {buildingType === 'Complex' &&
                <group position={[ - buildingWidth / 2 - buildingLength / 2, 0, - buildingLength - buildingWidth / 2 + buildingLength / 2]}>
                    <mesh rotation={[0, - Math.PI / 2, 0]} castShadow>
                        <extrudeGeometry args={[SideWall(buildingLength + buildingWidth, wallHeight, wallDepth), extrudeSettings(wallDepth)]}/>
                        <meshLambertMaterial map={sideWallTexture} bumpMap={sideWallTexture} bumpScale={0.02} side={THREE.DoubleSide} toneMapped={false} />
                    </mesh>
                </group>
            }

        </group>
    )
}
export default Back;