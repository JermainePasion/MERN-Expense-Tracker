import React, {useEffect, useState} from 'react'
import CustomPieChart from './CustomPieChart';

const COLORS = ["#a7c957","#6a994e","#386641"]

const Last60daysIncomeChart = ({data, totalIncome}) => {

    const [chartData, setChartData] = useState([]);

    const prepareChartData = () => {
        const dataArr = data?.map((item) => ({
            name: item?.source,
            amount: item?.amount
        }));

        setChartData(dataArr)
    };

    useEffect(() => {
        prepareChartData();
    
      return () => {}
    }, [data])
    


  return (
    <div className='card'>
        <div className='flex items-center justify-between'>
            <h5 className='text-lg'> Last 60 Days Income</h5> 
        </div>

        <CustomPieChart
        data = {chartData}
        label = "Total Income"
        totalAmount = {`₱${totalIncome}`}
        showTextAnchor
        colors = {COLORS}
        />

    </div>
  )
}

export default Last60daysIncomeChart