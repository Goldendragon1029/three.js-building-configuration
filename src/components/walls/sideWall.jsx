import * as THREE from 'three';

export const SideWall = (wallLength, wallHeight) => {
    const newModel = new THREE.Shape();
    newModel.moveTo(0, 0);
    newModel.lineTo(0, wallHeight);
    newModel.lineTo(wallLength  , wallHeight);
    newModel.lineTo(wallLength  , 0);
    newModel.closePath();
    return newModel;
}