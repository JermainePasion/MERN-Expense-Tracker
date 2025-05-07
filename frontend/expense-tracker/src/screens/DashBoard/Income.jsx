import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import { useUserAuth } from '../../hooks/useUserAuth';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import InfoCard from '../../Cards/InfoCard';
import IncomeOverView from '../../../Income/IncomeOverView';
import Modal from '../../components/Modal';
import AddIncomeForm from '../../../Income/AddIncomeForm';
import toast from 'react-hot-toast';

function Income() {

  const [incomeData, setIncomeData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null
  })

  const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);

  //get all income details

  const fetchIncomeDetails = async () => {
    if (loading) return;

    setLoading(true);

    try{
      const response = await axiosInstance.get(
        `${API_PATHS.INCOME.GET_ALL_INCOME}`
      );

      if(response.data){
        setIncomeData(response.data);
      }
    } catch (error) {
      console.log("Error. Please try again.", error)
    } finally {
      setLoading(false);
    }
  };

  const handleAddIncome = async(income) => {
    const {source, amount, date, icon} = income;

    //validation check
    if(!source.trim()){
      toast.error("Source is required")
      return;
    }

    if(!amount || isNaN(amount) || Number(amount)<=0){
      toast.error("amount should be a valid number / greater than 0.")
      return;
    }

    if(!date){
      toast.error("Date is required,");
      return;
    }

    try{
      await axiosInstance.post(API_PATHS.INCOME.ADD_INCOME, {
        source, amount, date, icon
      });

    setOpenAddIncomeModal(false);
    toast.success("Income successfully added!");
    fetchIncomeDetails();

  } catch (error){
    console.error(
      "error adding income: ", error.response?.data?.message || error.message
    );
  }

  };

  const handleDeleteIncome = async (id) => {};

  const handleDownloadIncome = async () => {}; 

  useEffect(() => {
    fetchIncomeDetails();
  
    return () => {
    }
  }, [])
  

  return (
    <DashboardLayout activeMenu = "Income">
      <div className='my-5 mx-auto'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          <div className=''>
            <IncomeOverView
            transactions={incomeData}
            onAddIncome={()=> setOpenAddIncomeModal(true)}
            />
          </div>
        </div>

        <Modal 
          isOpen = {openAddIncomeModal}
          onClose = {() => setOpenAddIncomeModal(false)}
          title = "Add Income"
        >
          <AddIncomeForm onAddIncome = {handleAddIncome}/>
        </Modal>
      </div>
    </DashboardLayout>
  )
}

export default Income