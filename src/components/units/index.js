export const extrudeSettings = (depth, bevelThickness, bevelSize, bevelOffset, bevelSegments) => {
    const setting = {
        steps: 1,
        depth: depth,
        bevelEnabled: true,
        bevelThickness: bevelThickness ?? 0,
        bevelSize: bevelSize ?? 0,
        bevelOffset: bevelOffset ?? 0,
        bevelSegments: bevelSegments ?? 1
    }
    
    return setting;
}