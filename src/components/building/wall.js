import { useMemo } from "react";
import * as THREE from 'three';

function Extrusion({ start = [0, 0, 0], paths }) {
    const shape = useMemo(() => {
      const shape = new THREE.Shape()
      shape.moveTo(...start)
      paths.forEach((path) => shape.lineTo(...path))
      return shape
    }, [start, paths])
    return (
      <mesh>
        <extrudeGeometry args={[shape, ]} />
        <meshPhongMaterial />
      </mesh>
    )
  }

export default function Wall() {
    return (
      <Extrusion
        start={[0, -2, 0]}
        paths={[
          [3, -2, 0],
          [4, 0, 0],
          [3, 2, 0],
          [0, 2, 0],
          [0, -2, 0]
        ]}
    />)}