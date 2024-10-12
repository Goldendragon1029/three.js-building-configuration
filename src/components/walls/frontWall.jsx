import { useMemo } from "react";
import * as THREE from 'three';

export const FrontWall = (wallWidth, wallHeight, roofAngle) => {
    const frontModel = useMemo(() => {
        const newModel = new THREE.Shape();
        newModel.moveTo(0, - wallWidth / 2);
        newModel.lineTo(wallHeight, - wallWidth / 2);
        newModel.lineTo(wallHeight + wallWidth * Math.tan(roofAngle) /2 , 0);
        newModel.lineTo(wallHeight, wallWidth / 2);
        newModel.lineTo(0, wallWidth / 2);
        newModel.closePath();
        return newModel;
    }, [wallWidth, wallHeight, roofAngle]);
    return frontModel;
}