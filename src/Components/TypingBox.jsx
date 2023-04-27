
import React, { createRef, useEffect, useMemo, useRef, useState } from 'react'
import UpperMenu from './UpperMenu';
import { useTestMode } from '../Context/TestModeContext';
import Stats from './Stats';
var randomWords = require('random-words'); //Import random word Array from random-word

function TypingBox() {
    // Creating usesate wordArray for Array 
    const [wordArray, setwordArray] = useState(() => {
        return randomWords(50);
    })

    //Create Current word Index by useSate
    const [currWordIndex, setcurrWordIndex] = useState(0);

    //Create Current char Index by useSate
    const [currCharIndex, setcurrCharIndex] = useState(0);

    const { testTime } = useTestMode()
    const [countDown, setcountDown] = useState(testTime)

    const [testStart, settestStart] = useState(false)
    const [testEnd, settestEnd] = useState(false)
    const [correctChar, setcorrectChar] = useState(0)
    const [inCorrectChar, setinCorreCtChar] = useState(0)
    const [missedChar, setmissedChar] = useState(0);
    const [extraChar, setextraChar] = useState(0)
    const [correctWords, setcorrectWords] = useState(0)
    const [graphData, setgraphData] = useState([])
    const [interValId, setIntervalId] = useState(null)

    const startTimer = () => {

        const interValId = setInterval(timmer, 1000);
        setIntervalId(interValId)
        function timmer() {
            setcountDown((leatestCoundown) => {
                setcorrectChar((correctChar) => {
                    setgraphData((graphData) => {
                        return [...graphData, [
                            testTime - leatestCoundown + 1,
                            (correctChar / 5) / ((testTime - leatestCoundown + 1) / 60)
                        ]];
                    })
                    return correctChar
                })
                if (leatestCoundown === 1) {
                    settestEnd(true);
                    clearInterval(interValId);
                    return 0;
                }
                return leatestCoundown - 1;
            })
        }
    }

    const calculateAcc = () => {
        return Math.round((correctWords / currWordIndex) * 100);
    }
    const calculateWPM = () => {
        return Math.round((correctChar / 5) / (testTime / 60));

    }
    // Create inputRef for Input Ref by useref hook
    const inputRef = useRef(null);

    // function inputFocus to current focus
    const inputFocus = () => {
        inputRef.current.focus();
    }
    useEffect(() => {
        resetTest();
    }, [testTime])


    // When page reload foucs on the Typing Box input.
    useEffect(() => {
        //callingh inputFocus function
        inputFocus();
        //Add class name current-word for blinking cursor for first later.
        wordSpanRef[0].current.childNodes[0].className = 'current-word'
    }, []);

    // Create wordSpanRef useMemo for store ref of each word.
    const wordSpanRef = useMemo(() => {
        return Array(wordArray.length).fill(0).map(i => createRef(null)) //createRef is using in callBack function
    }, [wordArray])


    //handle reset Test

    const resetTest = () => {
        clearInterval(interValId)
        setcountDown(testTime);
        setcurrWordIndex(0)
        setcurrCharIndex(0);
        settestStart(false);
        settestEnd(false);
        inputFocus();
        resetWordSpanRefClassname()
        setwordArray(randomWords(50))
    }

    const resetWordSpanRefClassname = () => {
        wordSpanRef.map(i => Array.from(i.current.childNodes).map(j => j.className = ''));
        wordSpanRef[0].current.childNodes[0].className = 'current-word'
    }

    // handleInput function for onkeydown handle event
    const handleInput = (e) => {

        if (!testStart) {
            settestStart(true);
            startTimer()
        }
        const allCurrChar = wordSpanRef[currWordIndex].current.childNodes; // craeting current char 

        if (e.keyCode === 32) {
            //Logic for space

            let correctCharInword = wordSpanRef[currWordIndex].current.querySelectorAll('.correct');

            if (correctCharInword.length === allCurrChar.length) {
                setcorrectWords(correctWords + 1)
            }

            if (allCurrChar.length <= currCharIndex) {
                //remove cursor from last place in word;
                allCurrChar[currCharIndex - 1].classList.remove('current-word-right')
            } else {
                //remove from between the word
                setmissedChar(missedChar + (allCurrChar.length - currCharIndex))
                allCurrChar[currCharIndex].classList.remove('current-word')
            }

            wordSpanRef[currWordIndex + 1].current.childNodes[0].className = 'current-word';
            setcurrWordIndex(currWordIndex + 1)
            setcurrCharIndex(0)
            return;
        }



        if (e.keyCode === 8) {
            //Logic for BackSpace

            if (currCharIndex !== 0) {

                if (allCurrChar.length === currCharIndex) {
                    //Logic for backspace end of word..

                    if (allCurrChar[currCharIndex - 1].className.includes('extra')) {
                        allCurrChar[currCharIndex - 1].remove();
                        allCurrChar[currCharIndex - 2].className += " current-word-right"
                    } else {
                        allCurrChar[currCharIndex - 1].className = 'current-word';
                    }
                    setcurrCharIndex(currCharIndex - 1);
                    return
                }

                allCurrChar[currCharIndex].className = '';
                allCurrChar[currCharIndex - 1].className = 'current-word'
                setcurrCharIndex(currCharIndex - 1)
            }
            return;
        }

        if (currCharIndex === allCurrChar.length) {

            let newSpan = document.createElement('span');
            newSpan.innerText = e.key; // add new latter
            newSpan.className = 'incorrect extra current-word-right';
            allCurrChar[currCharIndex - 1].classList.remove('current-word-right')
            wordSpanRef[currWordIndex].current.append(newSpan)
            setcurrCharIndex(currCharIndex + 1)
            setextraChar(extraChar + 1)
            return;
        }

        //chceking input value and ref value 
        if (e.key === allCurrChar[currCharIndex].innerText) {
            setcorrectChar(correctChar + 1);
            allCurrChar[currCharIndex].className = 'correct';
        } else {
            setinCorreCtChar(inCorrectChar + 1)
            allCurrChar[currCharIndex].className = 'incorrect';
        }

        if (currCharIndex + 1 === allCurrChar.length) {
            allCurrChar[currCharIndex].className += ' current-word-right';
        } else {
            allCurrChar[currCharIndex + 1].className = 'current-word';
        }

        setcurrCharIndex(currCharIndex + 1)
    }


    return (
        <div>
            <UpperMenu countDown={countDown} />
            {testEnd ? (<Stats wpm={calculateWPM()}
                accuracy={calculateAcc()}
                correctChars={correctChar}
                incorrectChars={inCorrectChar}
                missedchars={missedChar}
                extraChars={extraChar}
                graphData={graphData}
                resetTest={resetTest}
            />) : (<div className='type-box' onClick={inputFocus}>
                <div className='words'>
                    {wordArray.map((word, index) => (
                        <span className='word' ref={wordSpanRef[index]}>{word.split('').map(char => (
                            <span>{char}</span>
                        ))}</span>
                    ))}
                </div>
            </div>)}
            <input type='text'
                className='hidden-input'
                onKeyDown={handleInput}
                ref={inputRef}
            />
        </div>
    )
}

export default TypingBox