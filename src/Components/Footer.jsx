import React from 'react'
import Select from 'react-select';
import { themeOptions } from '../Utils/ThemeOptions';
import { useTheme } from '../Context/ThemeContest';
function Footer() {

    const {settheme,theme}= useTheme();
    const handleChange = (e)=>{
    
     settheme(e.value);
     localStorage.setItem("theme",JSON.stringify(e.value));
    }
  return (
    <div className='footer'>
     <div className="left">
      <div className="links">
        lInks
      </div>
     </div>
     <div className="right">
      <div className="themebtn">
      <Select
        onChange={handleChange}
        options={themeOptions}
        defaultValue={{label:theme.label,value:theme}}
        styles={{
            control: (styles) => ({
              ...styles,
              backgroundColor:theme.background
            }),
            menu: (styles) => ({
                ...styles,
                backgroundColor:theme.background,
              }),
              option: (styles,{isFocused}) => {
                return {
                    ...styles,
                    backgroundColor:!isFocused? theme.background : theme.textColor,
                    cursor:"pointer"
                }
              
              }
          }}
      />
      </div>
     </div>
    </div>
  )
}

export default Footer