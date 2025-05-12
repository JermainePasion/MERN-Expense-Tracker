const User = require("../models/User");
const Income = require ("../models/Income");
const xlsx = require('xlsx');

//income source add
exports.addIncome = async (req,res) => {
    const userId = req.user.id;

    try{
        const{icon, source, amount, date} = req.body;

        if(!source || !amount || !date){
            return res.status(400).json({message: "All fields are required!"});
        }

        const newIncome = new Income({
            userId, icon, source, amount, 
            date: new Date(date)
        });

        await newIncome.save();
        res.status(200).json(newIncome);
    } catch(error){
        res.status(500).json ({ message: "Server Error!"});
    }
}

//get income
exports.getAllIncome = async (req,res) => {
     const userId = req.user.id;

     try{
        const income = await Income.find ({userId}).sort({date: -1});
        res.json(income);
     } catch (error) {
        res.status(500).json({message: "Server Error!"});
     }

    
}


//delete income
exports.deleteIncome = async (req,res) => {
    const userId = req.user.id;

    try{
        await Income.findByIdAndDelete(req.params.id);
        res.json({message: "Income deteled"});
    }catch (error) {
        res.status(500).json({message: "Server Error!"});
     }
}

//excel file of income
exports.downloadIncomeExcel = async (req, res) => {
    const userId = req.user.id;

    try {
        const income = await Income.find({ userId }).sort({ date: -1 });

        const data = income.map((item) => ({
            Source: item.source,
            Amount: item.amount,
            Date: item.date.toISOString().split('T')[0],
        }));

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, "Income");

        const buffer = xlsx.write(wb, { type: "buffer", bookType: "xlsx" });

        res.setHeader("Content-Disposition", "attachment; filename=income_details.xlsx");
        res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        res.send(buffer);
    } catch (error) {
        res.status(500).json({ message: "Server Error!" });
    }
};