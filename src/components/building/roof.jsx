import * as THREE from 'three';
import { TextureLoader } from 'three';
import { extrudeSettings } from "../units";
import { useLoader } from '@react-three/fiber';
import { useSelector } from 'react-redux';
import { RightRoof } from '../walls/rightRoof';
import { LeftRoof } from '../walls/leftRoof';
import { RidgeRoof } from '../walls/ridgeRoof';
import { useMemo } from 'react';

const Roof = () => {

    const buildingWidth = useSelector((state) => state.width);
    const buildingLength = useSelector((state) => state.length);
    const roofType = useSelector((state) => state.roofType);
    const angle = useSelector((state) => state.roofAngle);

    const wallDepth = 0.05;
    const ridgeDepth = 0.02;
    const wallHeight = 3;
    const roofAngle = angle * Math.PI / 180;
    const roofLength = buildingLength + 0.7;
    const roofWidth = buildingWidth + 0.7;
    const horizontalLoader = useLoader(TextureLoader, './image/material/horizontalTexture.jpg');
    const verticalLoader = useLoader(TextureLoader, './image/material/verticalTexture.jpg');

    const horizontalTexture = horizontalLoader.clone();
    horizontalTexture.wrapS = THREE.RepeatWrapping;
    horizontalTexture.wrapT = THREE.RepeatWrapping;
    horizontalTexture.repeat.set(2, 3);
    
    const verticalTexture = verticalLoader.clone();
    verticalTexture.wrapS = THREE.RepeatWrapping;
    verticalTexture.wrapT = THREE.RepeatWrapping;
    verticalTexture.repeat.set(2, 3);

    let selectedTexture = horizontalTexture;
    
    selectedTexture = useMemo(() => {
        const newTexture = roofType === 'Horizontal' ? horizontalTexture : verticalTexture;
        return newTexture
    }, [roofType, horizontalTexture, verticalTexture]);

    return (
        <group>
            <group position={[0, wallHeight + buildingWidth * Math.tan(roofAngle) / 2, 0]} >
                <mesh rotation={[ -  Math.PI / 2 - roofAngle, 0, 0]} castShadow>
                    <extrudeGeometry args={[RightRoof(roofWidth, roofLength, roofAngle), extrudeSettings(wallDepth)]}/>
                    <meshLambertMaterial map={selectedTexture} bumpMap={selectedTexture} bumpScale={0.02} side={THREE.DoubleSide} toneMapped={false} />
                </mesh>
            </group>

            <group position={[0, wallHeight + buildingWidth * Math.tan(roofAngle) / 2, 0]} >
                <mesh rotation={[ - Math.PI / 2 + roofAngle, 0, 0]} castShadow>
                    <extrudeGeometry args={[LeftRoof(roofWidth, roofLength, roofAngle), extrudeSettings(wallDepth)]}/>
                    <meshLambertMaterial map={selectedTexture} bumpMap={selectedTexture} bumpScale={0.02} side={THREE.DoubleSide} toneMapped={false} />
                </mesh>
            </group>

            <group position={[roofLength / 2, buildingWidth / 2 * Math.tan(roofAngle) + wallHeight - roofWidth / 2 * Math.tan(roofAngle), 0]} >
                <mesh rotation={[0, Math.PI / 2, 0]}>
                    <extrudeGeometry args={[RidgeRoof(roofWidth, wallDepth, roofAngle), extrudeSettings(ridgeDepth)]}/>
                    <meshStandardMaterial color={0x888888} side={THREE.DoubleSide} metalness={5} roughness={1}/>
                </mesh>
            </group>

            <group position={[ - roofLength / 2, buildingWidth / 2 * Math.tan(roofAngle) + wallHeight - roofWidth / 2 * Math.tan(roofAngle), 0]} rotation={[0, Math.PI, 0]}>
                <mesh rotation={[0, Math.PI / 2, 0]}>
                    <extrudeGeometry args={[RidgeRoof(roofWidth, wallDepth, roofAngle), extrudeSettings(ridgeDepth)]}/>
                    <meshStandardMaterial color={0x888888} side={THREE.DoubleSide} metalness={5} roughness={1}/>
                </mesh>
            </group>
            
            <group position={[  roofLength / 2 + ridgeDepth, buildingWidth / 2 * Math.tan(roofAngle) + wallHeight + wallDepth / Math.cos(roofAngle) - roofWidth / 20 / 2 * Math.tan(roofAngle), 0]} rotation={[0, Math.PI, 0]}>
                <mesh rotation={[0, Math.PI / 2, 0]}>
                    <extrudeGeometry args={[RidgeRoof(roofWidth / 20, ridgeDepth, roofAngle), extrudeSettings(roofLength + ridgeDepth * 2)]}/>
                    <meshStandardMaterial color={0x888888} side={THREE.DoubleSide} metalness={5} roughness={1}/>
                </mesh>
            </group>
        </group>
    )
}
export default Roof;