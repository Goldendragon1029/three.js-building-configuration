import * as THREE from 'three';

export const DoorPattern = (doorWidth, doorHeight, miniHoleNumber, sideWidth, bevelSize) => {
    const miniHoleWidth = (doorWidth - sideWidth * (miniHoleNumber + 1)) / miniHoleNumber;
    const newModel = new THREE.Shape();
    newModel.moveTo(sideWidth + bevelSize, miniHoleWidth - bevelSize);
    newModel.lineTo(doorHeight / 2 - sideWidth - bevelSize, miniHoleWidth - bevelSize);
    newModel.lineTo(doorHeight/ 2 - sideWidth -bevelSize, bevelSize);
    newModel.lineTo(sideWidth + bevelSize, bevelSize);
    newModel.closePath();

    return newModel;
}