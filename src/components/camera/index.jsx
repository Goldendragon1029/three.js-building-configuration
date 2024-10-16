import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from 'three';

export const CameraController = (props) => {
    const { camera } = useThree();
    const [isMoving, setIsMoving] = useState(true);
    const targetPosition = useRef(new THREE.Vector3(props.position.x, props.position.y, props.position.z));

    useEffect(() => {
        setIsMoving(true);
        targetPosition.current.set(props.position.x, props.position.y, props.position.z);
    }, [props.position]);

    useFrame(() => {
        if (isMoving) {
            camera.position.lerp(targetPosition.current, 0.03);
            const distance = camera.position.distanceTo(targetPosition.current);
            if (distance < 1) {
                setIsMoving(false);
            }
            camera.lookAt(0,0,0);
        }
    })

    return null;
}