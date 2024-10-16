import * as THREE from 'three';

export const DoorGlass = (doorWidth, doorHeight) => {
    const sideWidth = 0.2;
    const newModel = new THREE.Shape();
    newModel.moveTo(doorHeight / 2 + sideWidth, doorWidth / 2 - sideWidth);
    newModel.lineTo(doorHeight - sideWidth, doorWidth / 2 - sideWidth);
    newModel.lineTo(doorHeight - sideWidth, - doorWidth / 2 + sideWidth);
    newModel.lineTo(doorHeight / 2 + sideWidth, - doorWidth / 2 + sideWidth);
    newModel.closePath();
    return newModel;
}