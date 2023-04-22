import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
*{
  box-sizing:border-box;
}
body{
  background:${({theme})=>theme.background};
  color:${({theme})=>theme.textColor};
  margin:0;
  padding:0;
  transition:all 0.25s linear;
}
.canvas{
  display:grid;
  min-height:100vh;
  grid-auto-flow:row;
  grid-template-row:auto 1fr auto;
  gap:0.5rem;
  padding:2rem;
  width:100vw;
  align-items:center;
  text-align:center;
}
.type-box{
  max-width:1000px;
  height:140px;
  margin-left:auto;
  margin-right:auto;
  overflow:hidden;
}
.words{
  font-size:32px;
  display:flex;
  flex-wrap:wrap;
  color:${({theme})=>theme.typeBox}
}
.word{
  margin:5px;
  padding-right:2px;
 
}
.hidden-input{
  opacity:0;
}
.current-word{
  border-left:1px solid;
  animation-name: blinking;
  animation-duration: 4s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  @keyframes blinking{
    0%{border-left:1px solid ${({theme})=>theme.textColor};}
    25%{border-left:1px solid ${({theme})=>theme.textColor};}
    50%{border-left:1px solid ${({theme})=>theme.textColor};}
    75%{border-left:1px solid ${({theme})=>theme.textColor};}
    100%{border-left:1px solid ${({theme})=>theme.textColor};}
  }
}
.current-word-right{
  border-right:1px solid;
  animation-name: blinkingright;
  animation-duration: 4s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  @keyframes blinkingright{
    0%{border-right:1px solid ${({theme})=>theme.textColor};}
    25%{border-right:1px solid ${({theme})=>theme.textColor};}
    50%{border-right:1px solid ${({theme})=>theme.textColor};}
    75%{border-right:1px solid ${({theme})=>theme.background};}
    100%{border-right:1px solid ${({theme})=>theme.textColor};}
  }
}
.correct{
  color:${({theme})=>theme.textColor};
}
.incorrect{
  color:red;
}
.upper-menu{
  display:flex;
  width:1000px;
  margin-left:auto;
  margin-right:auto;
  font-size:1.4rem;
  justify-content:space-between;
}
  .modes{
    display:flex;
    gap:0.4rem;
  }

  .time-mode:hover{
    color:green;
    cursor:pointer;
  }
  .footer{
    display:flex;
    width:1000px;
    margin-right:auto;
    margin-left:auto;
    justify-content:space-between;
  }
  .stats-box{
    display:flex;
    width:1000px;
    height:auto;
    margin-left:auto;
    margin-right:auto;
  }
  .left-stats{
    width:30%;
    padding:30px;
  }
  .right-stats{
    width:70%;
    padding:30px;
  }
  .title{
    font-size:20px;
    color:${({theme})=>theme.typeBox};
  }
  .subtitle{
    font-size:30px;
  }
`