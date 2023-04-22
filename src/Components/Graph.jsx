import React from 'react'
import { Chart as ChartJS, CategoryScale, Tooltip, Legend, PointElement, LinearScale, Title } from 'chart.js'
import 'chart.js/auto'
import { Line } from 'react-chartjs-2'
import { useTheme } from '../Context/ThemeContest';

// ChartJS.register(CategoryScale, Tooltip, Legend, PointElement, LinearScale, Title);

function Graph({graphData}) {

  const {theme} = useTheme();
  return (
    <>
     <Line
      data = {
        {
          labels:graphData.map(i=>i[0]),
          datasets:[
            {
              data:graphData.map(i=>i[1]),
              label:'WPM',
              borderColor:theme.textColor
            }
          ]
        }
      }
      />
    </>
   
  )
}

export default Graph