import { useMemo } from "react";
import * as THREE from 'three';

export const SideWall = (wallLength, wallHeight, wallDepth) => {
    const sideModel = useMemo(() => {
        const newModel = new THREE.Shape();
        newModel.moveTo(0, 0);
        newModel.lineTo(0, wallHeight);
        newModel.lineTo(wallLength + 2 * wallDepth , wallHeight);
        newModel.lineTo(wallLength + 2 * wallDepth , 0);
        newModel.closePath();
        return newModel;
    }, [wallLength, wallHeight, wallDepth]);
    return sideModel;
}