import React, { useState, useEffect } from 'react';
import { auth, db } from '../fireBaseConfig';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import TableData from '../Components/TableData';
import Graph from '../Components/Graph';
import UserInfo from '../Components/UserInfo';
import Header from '../Components/Header';

function UserPage() {
  const [data, setData] = useState([]);
  const [graphData, setGraphData] = useState([]);
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  const [dataLoad, setdataLoad] = useState(true)
  const fetchUserData =  () => {
    let tempData = [];
    let tempgraphData = [];
    const resultsRef = db.collection('Results');
    const { uid } = auth.currentUser;
    resultsRef.where('userId', '==', uid).orderBy('timeStamp','desc').get().then((res)=>{
      res.docs.forEach((doc) => {
        tempData.push({...doc.data()})
        tempgraphData.push([doc.data().timeStamp.toDate().toLocaleString().split(',')[0],doc.data().wpm])
    })
      setData(tempData);
      setGraphData(tempgraphData.reverse());
      setdataLoad(false)
    });
    
  };
  useEffect(() => {
    if(!loading){
      fetchUserData();
    }
    if (!loading && !user) {
      navigate('/');
    } 
  
  }, [loading]);

  if (loading || dataLoad) {
    return (
      <div className="center-of-screen">
 <CircularProgress size={300}/>;
      </div>
    )
   
  }
  return (<div className='canvas'>
    <Header />
    <UserInfo totalTest={data.length}/>
    <div className="graph-user-page">
    <Graph graphData={graphData} />
    </div>
    <TableData data={data}/>
  </div>);
}

export default UserPage;
