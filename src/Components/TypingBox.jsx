
import React, { createRef, useEffect, useMemo, useRef, useState } from 'react'
import UpperMenu from './UpperMenu';
import { useTestMode } from '../Context/TestModeContext';
import Stats from './Stats';
var randomWords = require("random-words");

const TypingBox = () => {
  const inputRef = useRef(null);
  const { testTime } = useTestMode();
  const [currWordIndex, setCurrWordIndex] = useState(0);
  const [currCharIndex, setCurrCharIndex] = useState(0);
  const [countDown, setCountDown] = useState(testTime); //value in secs
  const [testStart, setTestStart] = useState(false);
  const [testEnd, setTestEnd] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  const [correctChars, setCorrectChars] = useState(0);
  const [correctWords, setCorrectWords] = useState(0);
  const [incorrectChars, setIncorrectChars] = useState(0);
  const [extraChars, setExtraChars] = useState(0);
  const [missedChars, setMissedChars] = useState(0);
  const [graphData, setGraphData] = useState([]);
  const wordSpanRef = Array(500)
    .fill(0)
    .map((i) => createRef());
  const [words, setWords] = useState(() => {
    return randomWords(500);
  });

  const startTimer = () => {
    const intervalId = setInterval(timer, 1000); // will run the timer function after every 1000ms
    setIntervalId(intervalId);
    function timer() {
      setCountDown((currCountDown) => {
        setCorrectChars((correctChars) => {
          setGraphData((currGraphData) => {
            return [
              ...currGraphData,
              [
                testTime - currCountDown + 1,
                correctChars / 5 / ((testTime - currCountDown + 1) / 60),
              ],
            ];
          });

          return correctChars;
        });

        if (currCountDown === 1) {
          clearInterval(intervalId);
          setTestEnd(true);
          return 0;
        }
        return currCountDown - 1;
      });
    }
  };

  const resetTest = () => {
    clearInterval(intervalId);
    setCountDown(testTime);
    setCurrWordIndex(0);
    setCurrCharIndex(0);
    setTestStart(false);
    setTestEnd(false);
    setWords(randomWords(500));
    setCorrectChars(0);
    setIncorrectChars(0);
    setMissedChars(0);
    setExtraChars(0);
    setGraphData([]);
    setCorrectWords(0);
    resetWordSpanRef();
  };

  const resetWordSpanRef = () => {
    wordSpanRef.map((i) => {
      Array.from(i.current.childNodes).map((j) => {
        j.className = "";
      });
    });
    wordSpanRef[0].current.childNodes[0].className = "current";
  };

  const handleUserInput = (e) => {
    if (!testStart) {
      startTimer();
      setTestStart(true);
    }

    let allChildSpan = wordSpanRef[currWordIndex].current.childNodes;

    //logic for space
    if (e.keyCode === 32) {
      const correctSpans =
        wordSpanRef[currWordIndex].current.querySelectorAll(".correct"); //get out all spans with correct classname

      if (correctSpans.length === allChildSpan.length) {
        setCorrectWords(correctWords + 1);
      }

      if (allChildSpan.length <= currCharIndex) {
        // cursor present at the end
        allChildSpan[currCharIndex - 1].classList.remove("current-right");
      } else {
        //cursor present in between
        setMissedChars(missedChars + (allChildSpan.length - currCharIndex));
        for (let i = currCharIndex; i < allChildSpan.length; i++) {
          allChildSpan[i].className += " skipped";
        }
        allChildSpan[currCharIndex].classList.remove("current");
      }

      //scrolling line condition
      if (
        wordSpanRef[currWordIndex + 1].current.offsetLeft <
        wordSpanRef[currWordIndex].current.offsetLeft
      ) {
        //i am present at the last word of a line
        wordSpanRef[currWordIndex].current.scrollIntoView();
      }

      wordSpanRef[currWordIndex + 1].current.childNodes[0].className =
        "current";
      setCurrWordIndex(currWordIndex + 1);
      setCurrCharIndex(0);
      return;
    }

    if (e.keyCode === 8) {
      if (currCharIndex !== 0) {
        if (currCharIndex === allChildSpan.length) {
          if (allChildSpan[currCharIndex - 1].className.includes("extra")) {
            allChildSpan[currCharIndex - 1].remove();
            allChildSpan[currCharIndex - 2].className += " current-right";
          } else {
            allChildSpan[currCharIndex - 1].className = "current";
          }

          setCurrCharIndex(currCharIndex - 1);
          return;
        }
        allChildSpan[currCharIndex].className = "";
        allChildSpan[currCharIndex - 1].className = "current";
        setCurrCharIndex(currCharIndex - 1);
      }

      return;
    }

    if (currCharIndex === allChildSpan.length) {
      //add new characters
      setExtraChars(extraChars + 1);
      let newSpan = document.createElement("span"); // -> <span></span>
      newSpan.innerText = e.key;
      newSpan.className = "incorrect current-right extra";
      wordSpanRef[currWordIndex].current.append(newSpan);
      allChildSpan[currCharIndex - 1].classList.remove("current-right");
      setCurrCharIndex(currCharIndex + 1);
      return;
    }

    if (
      e.key ===
      wordSpanRef[currWordIndex].current.childNodes[currCharIndex].innerText
    ) {
      allChildSpan[currCharIndex].className = "correct";
      setCorrectChars(correctChars + 1);
    } else {
      allChildSpan[currCharIndex].className = "incorrect";
      setIncorrectChars(incorrectChars + 1);
    }

    if (currCharIndex + 1 === allChildSpan.length) {
      allChildSpan[currCharIndex].className += " current-right";
    } else {
      allChildSpan[currCharIndex + 1].className = "current";
    }

    setCurrCharIndex(currCharIndex + 1);
  };

  const focusInput = () => {
    inputRef.current.focus();
  };

  const calculateWPM = () => {
    return Math.round(correctChars / 5 / (testTime / 60));
  };

  const calculateAccuracy = () => {
    return Math.round((correctWords / currWordIndex) * 100);
  };

  useEffect(() => {
    resetTest();
  }, [testTime]);

  useEffect(() => {
    focusInput();
    wordSpanRef[0].current.childNodes[0].className = "current";
  }, []);



    return (
        <div>
            <UpperMenu countDown={countDown} />
            {testEnd ? (<Stats wpm={calculateWPM()}
                accuracy={calculateAccuracy()}
                correctChars={correctChars}
                incorrectChars={incorrectChars}
                missedchars={missedChars}
                extraChars={extraChars}
                graphData={graphData}
                resetTest={resetTest}
            />) : (<div className='type-box' onClick={focusInput}>
                <div className='words'>
                    {words.map((word, index) => (
                        <span className='word' ref={wordSpanRef[index]}>{word.split('').map(char => (
                            <span>{char}</span>
                        ))}</span>
                    ))}
                </div>
            </div>)}
            <input type='text'
                className='hidden-input'
                onKeyDown={handleUserInput}
                ref={inputRef}
            />
        </div>
    )
}

export default TypingBox