import React from 'react'
import Select from 'react-select';
import { themeOptions } from '../Utils/ThemeOptions';
import { useTheme } from '../Context/ThemeContest';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { Link } from '@mui/material';

function Footer() {

  const { settheme, theme } = useTheme();
  const handleChange = (e) => {

    settheme(e.value);
    localStorage.setItem("theme", JSON.stringify(e.value));
  }
  return (
    <div className='footer'>
      <div className="left">
        <div className="links">
          <Link href="https://github.com/abhishek2813/Typing-Test" underline="none" color="inherit">
            <GitHubIcon fontSize="large" />
          </Link>
          <Link href="https://www.linkedin.com/in/abhishek-pandey-807790227/" underline="none" color="inherit">
            <LinkedInIcon fontSize="large" />
          </Link>


        </div>
      </div>
      <div className="center">
        <p>Developed by <b>Abhishek Pandey</b> </p>
      </div>
      <div className="right">
        <div className="themebtn">
          <Select
            onChange={handleChange}
            options={themeOptions}
            defaultValue={{ label: theme.label, value: theme }}
            styles={{
              control: (styles) => ({
                ...styles,
                backgroundColor: theme.background,
                color: theme.textColor,
              }),
              menu: (styles) => ({
                ...styles,
                backgroundColor: theme.background,
              }),
              option: (styles, { isFocused }) => {
                return {
                  ...styles,
                  backgroundColor: !isFocused ? theme.background : theme.textColor,
                  cursor: "pointer"
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