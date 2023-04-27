import React from 'react'
import 'chart.js/auto'
import { Line } from 'react-chartjs-2'
import { useTheme } from '../Context/ThemeContest';

function Graph({ graphData }) {

  const { theme } = useTheme();
  return (
    <>
      <Line
        data={
          {
            labels: graphData.map(i => i[0]),
            datasets: [
              {
                data: graphData.map(i => i[1]),
                label: 'WPM',
                borderColor: theme.textColor
              }
            ]
          }
        }
      />
    </>

  )
}

export default Graph