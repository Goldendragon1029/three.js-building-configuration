import * as THREE from 'three';

export const WoodDoor = (doorWidth, doorHeight, miniHoleNumber) => {
    const sideWidth = 0.2;
    const miniHoleWidth = (doorWidth - sideWidth * (miniHoleNumber + 1)) / miniHoleNumber;

    const newModel = new THREE.Shape();
    newModel.moveTo(0, doorWidth / 2);
    newModel.lineTo(doorHeight, doorWidth / 2);
    newModel.lineTo(doorHeight, - doorWidth / 2);
    newModel.lineTo(0, - doorWidth / 2);
    newModel.closePath();

    const holeModel = new THREE.Path();
    holeModel.moveTo(doorHeight / 2 + sideWidth, doorWidth / 2 - sideWidth);
    holeModel.lineTo(doorHeight - sideWidth, doorWidth / 2 - sideWidth);
    holeModel.lineTo(doorHeight - sideWidth, - doorWidth / 2 + sideWidth);
    holeModel.lineTo(doorHeight / 2 + sideWidth, - doorWidth / 2 + sideWidth);
    holeModel.closePath();

    for (let index = 0; index < miniHoleNumber; index++){
        const miniHole = new THREE.Path();
        miniHole.moveTo(sideWidth, sideWidth * (index + 1) + miniHoleWidth * (index + 1) - doorWidth / 2);
        miniHole.lineTo(doorHeight / 2 - sideWidth, sideWidth * (index + 1) + miniHoleWidth * (index + 1) - doorWidth / 2);
        miniHole.lineTo(doorHeight / 2 - sideWidth, sideWidth * (index + 1) + miniHoleWidth * index - doorWidth / 2);
        miniHole.lineTo(sideWidth, sideWidth * (index + 1) + miniHoleWidth * index - doorWidth / 2);
        miniHole.closePath();

        newModel.holes.push(miniHole);
    }

    newModel.holes.push(holeModel);
    return newModel;
}