import { useMemo } from "react";
import * as THREE from 'three';

export const FrontWall = (wallWidth, wallHeight, roofAngle) => {
    const frontModel = useMemo(() => {
        const holeModel = new THREE.Path();
        holeModel.moveTo(0.5, -1);
        holeModel.lineTo(2, -1);
        holeModel.lineTo(2.5, 0);
        holeModel.lineTo(2, 1);
        holeModel.lineTo(0.5, 1);
        holeModel.closePath();
        const newModel = new THREE.Shape();
        newModel.moveTo(0, - wallWidth / 2);
        newModel.lineTo(wallHeight, - wallWidth / 2);
        newModel.lineTo(wallHeight + wallWidth * Math.tan(roofAngle) /2 , 0);
        newModel.lineTo(wallHeight, wallWidth / 2);
        newModel.lineTo(0, wallWidth / 2);
        newModel.closePath();
        newModel.holes.push(holeModel);
        return newModel;
    }, [wallWidth, wallHeight, roofAngle]);
    return frontModel;
}