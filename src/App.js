import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "./Styles/global";
import { useTheme } from "./Context/ThemeContest";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Home from "./Pages/Home";
import { Route, Routes } from "react-router-dom";
import UserPage from "./Pages/UserPage";

function App() {
  const { theme } = useTheme();
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <ToastContainer />
      <Routes>
        <Route path="/" element={ <Home />} />
        <Route path="/user" element={ <UserPage />} />
      </Routes>
    </ThemeProvider>

  );
}

export default App;
