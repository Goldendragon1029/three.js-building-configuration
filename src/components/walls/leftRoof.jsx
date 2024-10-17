import * as THREE from 'three';

export const LeftRoof = (roofWidth, roofLength, roofAngle) => {
    const newModel = new THREE.Shape();
    newModel.moveTo(roofLength / 2, 0);
    newModel.lineTo( - roofLength / 2, 0);
    newModel.lineTo( - roofLength / 2, - roofWidth / 2 / Math.cos(roofAngle));
    newModel.lineTo(roofLength / 2, - roofWidth / 2 / Math.cos(roofAngle));
    newModel.closePath();
    return newModel;
}