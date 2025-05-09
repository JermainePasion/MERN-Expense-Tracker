import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import { useUserAuth } from '../../hooks/useUserAuth';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import InfoCard from '../../Cards/InfoCard';
import { IoMdCard } from "react-icons/io";
import { addThousandsSeparator } from '../../utils/helper';
import RecentTransactions from '../../Cards/RecentTransactions';
import FinanceOverview from '../../Cards/FinanceOverview';
import ExpenseTransactions from '../../Cards/ExpenseTransactions';
import Last30DaysExpenses from '../../Cards/Last30DaysExpenses';
import Last60daysIncomeChart from '../../../Charts/Last60daysIncomeChart';
import RecentIncome from '../../Cards/RecentIncome';
import { FaMoneyBillWave } from "react-icons/fa";
import { IoWalletOutline } from "react-icons/io5";

const Home = () => {
  useUserAuth();

  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState(null)

  const [loading, setLoading] = useState(false);

  const fetchDashboardData = async () => {
    if(loading) return;

    setLoading(true);

    try{
      const response = await axiosInstance.get(
        `${API_PATHS.DASHBOARD.GET_DATA}`
      );

      if (response.data){
        setDashboardData(response.data);
      }
    } catch (error){
      console.log ("Something went wrong. Please try again.", error)
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData(); 
    return () => {

    }
  }, [])
  

  return (
    <DashboardLayout activeMenu = "Dashboard">
      <div className='my-5 mx-auto'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          <InfoCard
          icon = {<IoMdCard/>}
          label = "Current Balance"
          value = {addThousandsSeparator (dashboardData?.totalBalance || 0)}
          color = "bg-primary"/>

        <InfoCard
          icon = {<IoWalletOutline/>}
          label = "Total Income"
          value = {addThousandsSeparator (dashboardData?.totalIncome || 0)}
          color = "bg-blue-500"/>

        <InfoCard
          icon = {<FaMoneyBillWave/>}
          label = "Total Expense"
          value = {addThousandsSeparator (dashboardData?.totalExpense || 0)}
          color = "bg-red-500"/>
          
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-6'>


          <FinanceOverview
          totalBalance = {dashboardData?.totalBalance || 0}
          totalIncome = {dashboardData?.totalIncome || 0}
          totalExpense = {dashboardData?.totalExpense || 0}
          />

          <RecentTransactions
          transactions = {dashboardData?.recentTransactions}
          onSeeMore = {() => navigate("/expense")}
          />

        <Last30DaysExpenses
          data = {dashboardData?.last30DaysExpenses?.transactions || []}
        />

        
          <ExpenseTransactions
          transactions= {dashboardData?.last30DaysExpenses?.transactions || []}
          onSeeMore={() => navigate("/expense")} />

        <Last60daysIncomeChart
        data= {dashboardData?.last60DaysIncome?.transactions?.slice(0,4) || []}
        totalIncome = {dashboardData?.totalIncome || 0} />

      <RecentIncome
        transactions= {dashboardData?.last60DaysIncome?.transactions || []}
        onSeeMore={() => navigate("/income")} />
        
        
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Home