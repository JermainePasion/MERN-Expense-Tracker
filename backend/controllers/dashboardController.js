const Income = require("../models/Income")
const Expense = require("../models/Expense");
const { isValidObjectId, Types } = require("mongoose");


// dashboard data
exports.getDashboardData = async(req, res) => {
    try {
        const userId = req.user.id;
        const userObjectId = new Types.ObjectId(String(userId));
    

    //get total income n expenses
    const totalIncome = await Income.aggregate([
        {$match:{userId: userObjectId}},
        {$group: { _id: null, total: {$sum: "$amount"}} },
    ])
    
    console.log("totalIncome", {totalIncome, userId: isValidObjectId(userId)});

    const totalExpense = await Expense.aggregate([
        {$match:{userId: userObjectId}},
        {$group: { _id: null, total: {$sum: "$amount"}} },
    ])

    //last 60 days income transactions
    const last60DaysIncomeTransactions = await Income.find({
        userId,
        date: {$gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000)},
    }).sort({date: -1});

    //last 60 days income
    const incomeLast60Days = (await last60DaysIncomeTransactions).reduce(
        (sum, transaction) => sum+ transaction.amount, 0
    );

    //Get expense transactions in the last 30 days
    const last30DaysExpenseTransactions = await Expense.find({
        userId, date:{$gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)}
    }).sort({date: -1});

    //Get total expense in the last 30 days
    const expensesLast30Days = (await last30DaysExpenseTransactions).reduce(
        (sum, transaction) => sum+ transaction.amount, 0
    );

    // last 5 transactions income n expenses
    const lastTransactions = [
        ...(await Income.find ({userId}).sort ({date: -1}).limit(5)).map(
            (txn) => ({
                ...txn.toObject(),
                type: "income",
            })
        ),
        ...(await Expense.find ({userId}).sort ({date: -1}).limit(5)).map(
            (txn) => ({
                ...txn.toObject(),
                type: "expense",
            })
        ),
    ].sort ((a,b) => b.date - a.date);

    //final response
    res.json({
        totalBalance:
        (totalIncome[0]?.total || 0) - (totalExpense[0]?.total || 0),
        totalIncome: totalIncome[0]?.total || 0,
        totalExpense: totalExpense[0]?.total || 0,

        last30DaysExpenses: {
            total: expensesLast30Days,
            transactions: last30DaysExpenseTransactions,
        },

        last60DaysIncome: {
            total: incomeLast60Days,
            transactions: last60DaysIncomeTransactions,
        },

        recentTransactions: lastTransactions

    });
    }catch (error) {
        console.error("Dashboard Error:", error);
        res.status(500).json({message: "Server Error!"});
     }

}