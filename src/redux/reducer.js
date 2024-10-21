import { BUILDINGTYPE, BUILDINGSIZE, ROOFTYPE, DOORTYPE, ROOFANGLE } from "./action";

const initialState = {
    buildingType: "Simple",
    width: 6,
    length: 6,
    roofType: "Horizontal",
    doorType: "Roll-Door",
    roofAngle: 15
}

const counterReducer = (state = initialState, action) => {
    switch (action.type) {
        case BUILDINGTYPE:
            return { ...state, buildingType: action.value === "Normal" ? "Simple" : "Complex" };
        case BUILDINGSIZE:
            return { ...state, width: Number(action.width), length: Number(action.length)};
        case ROOFTYPE:
            return { ...state, roofType: action.value};
        case DOORTYPE:
            return { ...state, doorType: action.value};
        case ROOFANGLE:
            return { ...state, roofAngle: action.value};
        default: return state;
    }
};

export default counterReducer;