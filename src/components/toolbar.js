import { useState } from "react";
import SettingSelector from "./settingSelector";
import { useSelector } from "react-redux";

const Toolbar = () => {
    const [handleShow, setHandleShow] = useState(false);
    const building = useSelector((state) => state.buildingType);
    const width = useSelector((state) => state.width);
    const length = useSelector((state) => state.length);
    
    const handleChange = () => {
        setHandleShow(!handleShow);
    }
  
    return (
        <>
            <div className={`bg-white z-50 min-h-full tablet:min-w-350 tablet:block large:min-w-450 min-w-300 ${handleShow ? 'block fixed' : 'hidden'}`}>
                <h1>{building}</h1>
                <h1>width: {width}</h1>
                <h1>length: {length}</h1>
                <SettingSelector
                    title="Building Type"
                    item={["Simple", "Complex"]}
                    action="buildingType"
                />
                <SettingSelector
                    title="Building Size"
                    item={["4-4", "4-8", "4-12", "8-12"]}
                    action="buildingSize"
                />
                <SettingSelector
                    title="Roof Type"
                    item={["Stone", "Iron"]}
                    action="roofType"
                />
                <SettingSelector
                    title="Door Type"
                    item={["Circle", "Square"]}
                    action="doorType"
                />
            </div>
            <button className={`z-10 tablet:hidden relative -mr-30 ${handleShow ? 'left-300' : 'left-0'}`} onClick={handleChange}>
                <img src={`/image/${handleShow ? 'left' : 'right'}-arrow.png`} alt="toggle" className="min-w-30 min-h-30" width={30} height={30}></img>
            </button>
        </>
    );
};

export default Toolbar;