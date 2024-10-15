import { useMemo } from "react";
import * as THREE from 'three';

export const DoorFrame = (doorWidth, doorHeight, doorFrameWidth) => {
    const doorFrameModel = useMemo(() => {

        const newModel = new THREE.Shape();
        newModel.moveTo(0, doorWidth / 2);
        newModel.lineTo(0, doorWidth / 2 + doorFrameWidth);
        newModel.lineTo(doorHeight + doorFrameWidth, doorWidth / 2 + doorFrameWidth);
        newModel.lineTo(doorHeight + doorFrameWidth, -doorWidth / 2 - doorFrameWidth);
        newModel.lineTo(0, - doorWidth / 2 - doorFrameWidth);
        newModel.lineTo(0, - doorWidth / 2);
        newModel.lineTo(doorHeight, - doorWidth / 2);
        newModel.lineTo(doorHeight, doorWidth / 2);
        newModel.closePath();

        return newModel;
    }, [doorWidth, doorHeight, doorFrameWidth]);
    return doorFrameModel;
}