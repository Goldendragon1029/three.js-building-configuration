import * as THREE from 'three';

export const Pillar = (pillarWidth) => {
        const newModel = new THREE.Shape();
        newModel.moveTo(0, 0);
        newModel.lineTo(0, pillarWidth);
        newModel.lineTo(pillarWidth, pillarWidth);
        newModel.lineTo(pillarWidth, 0);
        newModel.closePath();
        return newModel;
}