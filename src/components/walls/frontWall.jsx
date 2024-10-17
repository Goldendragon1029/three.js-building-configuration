import * as THREE from 'three';

export const FrontWall = (wallWidth, wallHeight, roofAngle, doorWidth, doorHeight, sillHeight, doorFrameWidth) => {
    const newModel = new THREE.Shape();
    newModel.moveTo(0, - wallWidth / 2);
    newModel.lineTo(wallHeight, - wallWidth / 2);
    newModel.lineTo(wallHeight + wallWidth * Math.tan(roofAngle) /2 , 0);
    newModel.lineTo(wallHeight, wallWidth / 2);
    newModel.lineTo(0, wallWidth / 2);
    newModel.closePath();

    const holeModel = new THREE.Path();
    holeModel.moveTo(sillHeight, doorWidth / 2 + doorFrameWidth);
    holeModel.lineTo(sillHeight + doorHeight + doorFrameWidth, doorWidth / 2 + doorFrameWidth);
    holeModel.lineTo(sillHeight + doorHeight + doorFrameWidth, - doorWidth / 2 - doorFrameWidth);
    holeModel.lineTo(sillHeight, - doorWidth / 2 - doorFrameWidth);
    holeModel.closePath();
    newModel.holes.push(holeModel);

    return newModel;
}