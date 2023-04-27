import React from 'react'
import Select from 'react-select';
import { themeOptions } from '../Utils/ThemeOptions';
import { useTheme } from '../Context/ThemeContest';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import { Link } from '@mui/material';

function Footer() {

  const { settheme, theme,defaultTheme } = useTheme();
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
          <Link href="https://www.facebook.com/profile.php?id=100027154895700&mibextid=ZbWKwL" underline="none" color="inherit">
            <FacebookIcon fontSize="large" />
          </Link>
          <Link href="https://www.instagram.com/abhishekpandey2060/" underline="none" color="inherit">
            <InstagramIcon fontSize="large" />
          </Link>
          <Link href="https://docs.google.com/document/d/1_zMYCW7Si7S4rO9PuS0CFhXfkoEOcH_rJu4F6l8CMQU/edit?usp=sharing" underline="none" color="inherit">
            <DocumentScannerIcon fontSize="large" />
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
            defaultValue={{ label: defaultTheme.label, value: defaultTheme }}
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
              },
              singleValue: styles => ({...styles, color: theme.title}),
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default Footer