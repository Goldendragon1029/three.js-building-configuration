import * as THREE from 'three';
import { TextureLoader } from 'three';
import { extrudeSettings } from "../units";
import { useLoader } from '@react-three/fiber';
import { useSelector } from 'react-redux';
import { SideWall } from '../walls/sideWall';

const Left = () => {

    const buildingWidth = useSelector((state) => state.width);
    const buildingLength = useSelector((state) => state.length);

    const wallDepth = 0.05;
    const wallHeight = 3;

    const wallLoader = useLoader(TextureLoader, './image/material/wall.jpg');

    const sideWallTexture = wallLoader.clone();
    sideWallTexture.wrapS = THREE.RepeatWrapping;
    sideWallTexture.wrapT = THREE.RepeatWrapping;
    sideWallTexture.repeat.set(1, 3);

    return (
        <group>
            <mesh position={[ - buildingLength / 2 - wallDepth, 0, buildingWidth / 2]} castShadow>
                <extrudeGeometry args={[SideWall(buildingLength, wallHeight, wallDepth), extrudeSettings(wallDepth)]}/>
                <meshLambertMaterial map={sideWallTexture} bumpMap={sideWallTexture} bumpScale={0.02} side={THREE.DoubleSide} toneMapped={false} />
            </mesh>
        </group>
    )
}
export default Left;