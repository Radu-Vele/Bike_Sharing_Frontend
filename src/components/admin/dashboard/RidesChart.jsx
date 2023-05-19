import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Typography, Box} from "@mui/material"
import { useState, useEffect } from 'react'
import FetchRidesData from '../../../api/admin/dashboard/FetchRidesData';

const RidesChart = () => {
  const [data, setData] = useState([
    {
      day : "0000-00-00",
      number_of_rides : 0
    }
  ]);
  const [timeInterval, setTimeInterval] = useState({ //TODO: add dynamic range of time
    startYear: 2023,
    startMonth: 3,
    startDay: 1,
    endYear: 2023,
    endMonth: 6,
    endDay: 30,
  });

  function processInputData(rawData) {
    if(rawData.length === 0) {
      return;
    }
    else if(rawData.length === 1) {
      setData([{day: rawData[rawData.length - 1].endTime.substring(0, 10), number_of_rides : 1}])
      return;
    }
    
    let dataArr = []
    let currCount = 1;
    let formattedData = []

    let currDate;
    let prvDate;

    for(let i = 1; i < rawData.length; i++) {
      dataArr.push()
      currDate = rawData[i].endTime.substring(0, 10);
      let prvDate = rawData[i - 1].endTime.substring(0, 10);

      if(currDate === prvDate) {
        currCount++;
      }
      else {
        formattedData.push({day: prvDate, number_of_rides : currCount});
        currCount = 1;
      }
    }
    
    formattedData.push({day: currDate, number_of_rides : currCount});

    setData(formattedData);
  }

  useEffect(() => {
    FetchRidesData(timeInterval)
        .then((response) => {
            if (response.status === 200) {
              processInputData(response.data)
            }
          })
          .catch((err) => {
          });
  },[]);

  return (
    <Box
      borderRadius={7} 
      boxShadow={3} 
      bgcolor="background.paper" 
      p={3}
      width={'50%'}
      height={'100%'}
      textAlign="center"
    >
      <Typography variant="h6">
        Rides Performed Each Day
      </Typography>
      <ResponsiveContainer width={'100%'} height={300}>
        <BarChart 
          data={data}
          margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="number_of_rides" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default RidesChart;