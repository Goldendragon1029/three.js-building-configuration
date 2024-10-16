import { useState } from "react";
import SettingSelector from "./settingSelector";

const Toolbar = () => {
    const [handleShow, setHandleShow] = useState(false);
    
    const handleChange = () => {
        setHandleShow(!handleShow);
    }
  
    return (
        <>
            <div className={`bg-white z-50 min-h-full tablet:min-w-350 tablet:block large:min-w-450 min-w-300 ${handleShow ? 'block fixed' : 'hidden'}`}>
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
                    item={["Horizontal", "Vertical"]}
                    action="roofType"
                />
                <SettingSelector
                    title="Door Type"
                    item={["Iron", "Wood"]}
                    action="doorType"
                />
                <SettingSelector
                    title="Roof Angle"
                    item={[15, 20, 25, 30]}
                    action="roofAngle"
                />
            </div>
            <button className={`z-10 tablet:hidden relative -mr-30 ${handleShow ? 'left-300' : 'left-0'}`} onClick={handleChange}>
                <img src={`/image/${handleShow ? 'left' : 'right'}-arrow.png`} alt="toggle" className="min-w-30 min-h-30" width={30} height={30}></img>
            </button>
        </>
    );
};

export default Toolbar;