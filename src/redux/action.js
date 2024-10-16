export const BUILDINGTYPE = 'BUILDINGTYPE';
export const BUILDINGSIZE = 'BUILDINGSIZE';
export const ROOFTYPE = 'ROOFTYPE';
export const DOORTYPE = 'DOORTYPE';
export const ROOFANGLE = 'ROOFANGLE';

export const buildingType = (value) => ({
    type: BUILDINGTYPE,
    value
});

export const buildingSize = (width, length) => ({
    type: BUILDINGSIZE,
    width: width,
    length: length
});

export const roofType = (value) => ({
    type: ROOFTYPE,
    value
});

export const doorType = (value) => ({
    type: DOORTYPE,
    value
});

export const roofAngle = (value) => ({
    type: ROOFANGLE,
    value
});