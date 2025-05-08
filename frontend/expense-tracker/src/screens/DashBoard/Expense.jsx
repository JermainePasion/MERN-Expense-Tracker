import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import { useUserAuth } from '../../hooks/useUserAuth';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import ExpenseOverview from '../../../Expense/ExpenseOverview';
import AddExpenseForm from '../../../Expense/AddExpenseForm';
import Modal from '../../components/Modal';
import { API_PATHS } from '../../utils/apiPaths';
import DeleteAlert from '../../components/DeleteAlert';
import ExpenseList from '../../../Expense/ExpenseList';
import toast from 'react-hot-toast';

const Expense = () =>{
  useUserAuth();

  const [expenseData, setExpenseData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [openDeleteAlert, setOpenDeleteAlert] = useState({
      show: false,
      data: null
    })
  
    const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);

    const fetchExpenseDetails = async () => {
      if (loading) return;
  
      setLoading(true);
  
      try{
        const response = await axiosInstance.get(
          `${API_PATHS.EXPENSE.GET_ALL_EXPENSE}`
        );
  
        if(response.data){
          setExpenseData(response.data);
        }
      } catch (error) {
        console.log("Error. Please try again.", error)
      } finally {
        setLoading(false);
      }
    };
  
    const handleAddExpense = async(expense) => {
      const {category, amount, date, icon} = expense;
  
      //validation check
      if(!category.trim()){
        toast.error("Category is required")
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
        await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, {
          category, amount, date, icon
        });
  
      setOpenAddExpenseModal(false);
      toast.success("Expense successfully added!");
      fetchExpenseDetails();
  
    } catch (error){
      console.error(
        "error adding expense: ", error.response?.data?.message || error.message
      );
    }
  
    };

    const handleDeleteExpense = async (id) => {

      try{
        await axiosInstance.delete(API_PATHS.EXPENSE.DELETE_EXPENSE(id));
        setOpenDeleteAlert({show: false, data:null})
        toast.success("Expense deleted successfully");
        fetchExpenseDetails();
      } catch (error){
        console.error(
          "Error deleting expense:",
          error.response?.data?.message || error.message
        );
      }
    };

    const handleDownloadExpense = async () => {
      try {
        const response = await axiosInstance.get(API_PATHS.EXPENSE.DOWNLOAD_EXPENSE, {
          responseType: "blob",
        });
    
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "expense_details.xlsx");
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
      fetchExpenseDetails();  
      return () => {
      }
    }, [])
    

  return (
    <DashboardLayout activeMenu="Expenses">
    <div className='my-5 mx-auto'>
      <div className='grid grid-cols-1 gap-6'>
        <div className=''> 
          <ExpenseOverview
          transactions = {expenseData}
          onExpenseIncome = {()=> setOpenAddExpenseModal(true)}
          />
        </div>

        <ExpenseList 
            transactions = {expenseData}
            onDelete={(id)=>{
              setOpenDeleteAlert({show: true, data: id})
            }}
            onDownload={handleDownloadExpense}
            />

      </div>

      <Modal 
          isOpen = {openAddExpenseModal}
          onClose = {() => setOpenAddExpenseModal(false)}
          title = "Add Expense"
        >
          <AddExpenseForm onAddExpense = {handleAddExpense}/>
        </Modal>

        <Modal
        isOpen={openDeleteAlert.show}
        onClose={()=> setOpenDeleteAlert({show:false, data: null})}
        title="Delete Expense">
          <DeleteAlert
          content="Delete Expense?"
          onDelete = {()=> handleDeleteExpense(openDeleteAlert.data) }
          />
        </Modal>
    </div>
    </DashboardLayout>
  )
}

export default Expense