import * as THREE from 'three';

export const BackWall = (wallWidth, wallHeight, roofAngle) => {
    const backModel = new THREE.Shape();
    backModel.moveTo(0, - wallWidth / 2);
    backModel.lineTo(wallHeight, - wallWidth / 2);
    backModel.lineTo(wallHeight + wallWidth * Math.tan(roofAngle) /2 , 0);
    backModel.lineTo(wallHeight, wallWidth / 2);
    backModel.lineTo(0, wallWidth / 2);
    backModel.closePath();
    return backModel;
}