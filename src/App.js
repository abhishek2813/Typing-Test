import { ThemeProvider } from "styled-components";
import Footer from "./Components/Footer";
import TypingBox from "./Components/TypingBox";
import { GlobalStyle } from "./Styles/global";
import { useTheme } from "./Context/ThemeContest";

function App() {
  const {theme}= useTheme();
  return (
    <ThemeProvider theme={theme}>
  <div className="canvas">
      <GlobalStyle />
    <div>Header</div>
    <TypingBox />
    <Footer />
    </div>
    </ThemeProvider>
  
  );
}

export default App;
