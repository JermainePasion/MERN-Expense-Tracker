import React, { useEffect, useState } from 'react'
import { LuPlus } from 'react-icons/lu';
import CustomBarChart from '../Charts/CustomBarChart';
import { prepareExpenseLineChartData } from '../src/utils/helper';
import CustomLineChart from '../Charts/CustomLineChart';




const ExpenseOverview = ({transactions, onExpenseIncome}) => {

    const [chartData, setChartData] = useState([]);
    
         useEffect(() => {
                const result = prepareExpenseLineChartData(transactions);
                setChartData(result);
        
                return () => {};
            }, [transactions]);

  return (
    <div className='card w-full'>
        <div className='flex items-center justify-between col-auto'>
            <div className=''>
                <h5 className='text-lg font-semibold'>Expense Overview</h5>
                <p className='text-xs text-gray-400 mt-1'>Track your expenses over time</p>
            </div>
            <button className='add-btn' onClick={onExpenseIncome}>
                <LuPlus className='text-lg'/>
                Add Expense
            </button>
        </div>
        <div className='mt-10'>
            <CustomLineChart data={chartData}/>
        </div>
    </div>
  )
}

export default ExpenseOverview