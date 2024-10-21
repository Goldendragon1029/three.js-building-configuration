import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useDispatch } from 'react-redux';
import { buildingType, buildingSize, roofType, doorType, roofAngle } from '../redux/action';

export default function SettingSelector(props) {
  const [settingType, setSettingType] = React.useState(props.item[0]);
  const dispatch = useDispatch();
  // console.log("props=", props.item)
  const handleChange = (event) => {
    setSettingType(event.target.value);
    switch (props.action) {
      case 'buildingType':
        dispatch(buildingType(event.target.value));
        break;
      case 'buildingSize':
        const [width, length] = event.target.value.split('-');
        dispatch(buildingSize(width, length));
        break;
      case 'roofType':
        dispatch(roofType(event.target.value));
        break;
      case 'doorType':
        dispatch(doorType(event.target.value));
        break;
      case 'roofAngle':
        dispatch(roofAngle(event.target.value));
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <FormControl className='w-full px-10 mx-0' sx={{ m: 1, minWidth: 200 }}>
        <InputLabel className='px-12' id="Setting-type">{props.title}</InputLabel>
        <Select
          className='w-full'
          labelId="Setting-type"
          value={settingType}
          label="Setting Type"
          onChange={handleChange}
        >
          {props.item.map((item, index) => (
            <MenuItem value={item} key={index}>{item}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}