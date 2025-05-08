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
import IncomeList from '../../../Income/IncomeList';
import DeleteAlert from '../../components/DeleteAlert';


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

  const handleDeleteIncome = async (id) => {

    try{
      await axiosInstance.delete(API_PATHS.INCOME.DELETE_INCOME(id));
      setOpenDeleteAlert({show: false, data:null})
      toast.success("Income deleted successfully");
      fetchIncomeDetails();
    } catch (error){
      console.error(
        "Error deleting income:",
        error.response?.data?.message || error.message
      );
    }
  };

  const handleDownloadIncome = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.INCOME.DOWNLOAD_INCOME, {
        responseType: "blob",
      });
  
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "income_details.xlsx");
      document.body.appendChild(link);
      link.click(); 
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading expense details: ", error);
      toast.error("Failed to download Excel file. Please try again.");
    }
  };

  useEffect(() => {
    fetchIncomeDetails();
  
    return () => {
    }
  }, [])
  

  return (
    <DashboardLayout activeMenu = "Income">
      <div className='my-5 mx-auto'>
        <div className='grid grid-cols-1 md:grid-cols-1'>
          <div className='m-5'>
            <IncomeOverView
            transactions={incomeData}
            onAddIncome={()=> setOpenAddIncomeModal(true)}
            />
          </div>
            <IncomeList 
            transactions = {incomeData}
            onDelete={(id)=>{
              setOpenDeleteAlert({show: true, data: id})
            }}
            onDownload={handleDownloadIncome}
            />

        </div>

        <Modal 
          isOpen = {openAddIncomeModal}
          onClose = {() => setOpenAddIncomeModal(false)}
          title = "Add Income"
        >
          <AddIncomeForm onAddIncome = {handleAddIncome}/>
        </Modal>

        <Modal
        isOpen={openDeleteAlert.show}
        onClose={()=> setOpenDeleteAlert({show:false, data: null})}
        title="Delete Income">
          <DeleteAlert
          content="Delete Income?"
          onDelete = {()=> handleDeleteIncome(openDeleteAlert.data) }
          />
        </Modal>

      </div>
    </DashboardLayout>
  )
}

export default Income