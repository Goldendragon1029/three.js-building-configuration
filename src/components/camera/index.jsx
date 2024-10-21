import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from 'three';

export const CameraController = (props) => {
    const { camera } = useThree();
    const [isMoving, setIsMoving] = useState(true);
    const [isSemi, setIsSemi] = useState(false);
    const targetPosition = useRef(new THREE.Vector3(props.position.x, props.position.y, props.position.z));
    const semiTargetPosition = useRef(new THREE.Vector3(props.position.x, props.position.y, props.position.z));
    const calAngle = (position_x, position_z) => {
        let angle = 0;
        if (position_x >= 0) {
            angle = Math.atan(position_z / position_x);
        } else {
            angle = Math.atan(position_z / position_x) +  Math.PI;
        }
        if (angle < 0) {
            angle += 2 * Math.PI;
        }
        return angle;
    }
    useEffect(() => {
        const distance = Math.sqrt(camera.position.x * camera.position.x + camera.position.z * camera.position.z);
        const middleAngle = (calAngle(camera.position.x, camera.position.z) + calAngle(props.position.x, props.position.z)) / 2;
        
        if (Math.abs(calAngle(camera.position.x, camera.position.z) - calAngle(props.position.x, props.position.z)) > Math.PI / 2) {
            semiTargetPosition.current.set(distance * Math.cos(middleAngle), props.position.y, distance * Math.sin(middleAngle));
            setIsSemi(true);
        } else {
            setIsSemi(false);
        }
        setIsMoving(true);
        targetPosition.current.set(props.position.x, props.position.y, props.position.z);
    }, [props.position]);

    useFrame(() => {
        if (isMoving) {
            if (isSemi) {
                camera.position.lerp(semiTargetPosition.current, 0.12);
                if (camera.position.distanceTo(semiTargetPosition.current) < 5) {
                    setIsSemi(false);
                }
            } else {
                camera.position.lerp(targetPosition.current, 0.03);
            }
            const distance = camera.position.distanceTo(targetPosition.current);
            if (distance < 1) {
                setIsMoving(false);
            }
            camera.lookAt(0,0,0);
        }
    })

    return null;
}