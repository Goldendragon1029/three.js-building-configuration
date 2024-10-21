import * as THREE from 'three';

export const cutRidge = (roofWidth, wallDepth, roofAngle) => {
    const newModel = new THREE.Shape();
    const height = wallDepth / 10 / Math.cos(roofAngle);
    newModel.lineTo(0, roofWidth / 2 * Math.tan(roofAngle) + wallDepth / Math.cos(roofAngle) + height);
    newModel.lineTo( - roofWidth / 2 - wallDepth * Math.sin(roofAngle), wallDepth * Math.cos(roofAngle) + height);
    newModel.lineTo( - roofWidth / 2, 0 + height);
    newModel.lineTo(0, roofWidth / 2 * Math.tan(roofAngle) + height);
    newModel.closePath();
    return newModel;
}