import { BUILDINGTYPE, BUILDINGSIZE, ROOFTYPE, DOORTYPE } from "./action";

const initialState = {
    buildingType: "Simple",
    width: 4,
    length: 4,
    roofType: "Horizontal",
    doorType: "Circle"
}

const counterReducer = (state = initialState, action) => {
    switch (action.type) {
        case BUILDINGTYPE:
            return { ...state, buildingType: action.value };
        case BUILDINGSIZE:
            return { ...state, width: Number(action.width), length: Number(action.length)};
        case ROOFTYPE:
            return { ...state, roofType: action.value};
        case DOORTYPE:
            return { ...state, doorType: action.value};
        default: return state;
    }
};

export default counterReducer;