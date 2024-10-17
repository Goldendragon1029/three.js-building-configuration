import * as THREE from 'three';
import { TextureLoader } from 'three';
import { extrudeSettings } from "../units";
import { useLoader } from '@react-three/fiber';
import { useSelector } from 'react-redux';
import { BackWall } from '../walls/backWall';

const Back = () => {

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

    return (
        <group position={[ - buildingLength / 2, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <mesh rotation={[Math.PI / 2, 0, 0]} castShadow>
                <extrudeGeometry args={[BackWall(buildingWidth, wallHeight, roofAngle), extrudeSettings( - wallDepth)]}/>
                <meshLambertMaterial map={frontWallTexture} bumpMap={frontWallTexture} bumpScale={0.02} side={THREE.DoubleSide} toneMapped={false} />
            </mesh>
        </group>
    )
}
export default Back;