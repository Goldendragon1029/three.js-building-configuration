import * as THREE from 'three';

export const RidgeRoof = (roofWidth, wallDepth, roofAngle) => {
    const newModel = new THREE.Shape();
    newModel.moveTo(roofWidth / 2, 0);
    newModel.lineTo(roofWidth / 2 + wallDepth * Math.sin(roofAngle), wallDepth * Math.cos(roofAngle));
    newModel.lineTo(0, roofWidth / 2 * Math.tan(roofAngle) + wallDepth / Math.cos(roofAngle));
    newModel.lineTo( - roofWidth / 2 - wallDepth * Math.sin(roofAngle), wallDepth * Math.cos(roofAngle));
    newModel.lineTo( - roofWidth / 2, 0);
    newModel.lineTo(0, roofWidth / 2 * Math.tan(roofAngle));
    newModel.closePath();
    return newModel;
}