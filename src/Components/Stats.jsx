import React,{useEffect} from 'react'
import Graph from './Graph'
import { auth, db } from '../fireBaseConfig';
import {toast} from 'react-toastify'
import { Button } from '@mui/material';
function Stats(  {wpm,
    accuracy,
    correctChars,
    incorrectChars,
    missedchars,
    extraChars,
    graphData,
    resetTest
  }) {
    let timeSet = new Set();
    const newGraph = graphData.filter(i=>{
      if(!timeSet.has(i[0])){
       timeSet.add(i[0]);
          return i;
      }
    })
  
    const pushDataToDb = ()=>{
      if(isNaN(accuracy)){
        toast.error('Invaild Test', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });
          return;
      }
     const resultref = db.collection('Results')
     const {uid} = auth.currentUser;
     resultref.add({
      wpm:wpm,
      accuracy:accuracy,
      timeStamp: new Date(),
      Character: `${correctChars}/${incorrectChars}/${missedchars}/${extraChars}`,
      userId:uid
     }).then((res)=>{
      toast.success('Saved in db', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
     }).catch((err)=>{
      toast.error('Not able to save result', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
     })
    }
  
    useEffect(() => {
     if(auth.currentUser){
      pushDataToDb()
     }else{
      toast.warning('Login to save Result', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
     }
    }, [])
  return (
    <div className='stats-box'>
        <div className="left-stats">
          <div className="title">WPM</div>
          <div className="subtitle">{wpm}</div>
          <div className="title">Accuracy</div>
          <div className="subtitle">{accuracy} %</div>
          <div className="title">Chareters</div>
          <div className="subtitle">{correctChars}/{incorrectChars}/{missedchars}/{extraChars}</div> <br />
          <div><Button variant="contained" onClick={()=>{resetTest()}}>Back to Test</Button></div>
        </div>
        <div className="right-stats">
           <Graph graphData={newGraph}/>
        </div>
    </div>
  )
}

export default Stats