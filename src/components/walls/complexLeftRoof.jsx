import * as THREE from 'three';

export const ComplexLeftRoof = (roofWidth, roofLength, roofAngle) => {
    const newModel = new THREE.Shape();
    newModel.moveTo(0, 0);
    newModel.lineTo(roofWidth / 2 + roofLength, 0);
    newModel.lineTo(roofWidth / 2 + roofLength, - roofWidth / 2 / Math.cos(roofAngle));
    newModel.lineTo( - roofWidth / 2, - roofWidth / 2 / Math.cos(roofAngle));
    newModel.lineTo();
    newModel.closePath();
    return newModel;
}