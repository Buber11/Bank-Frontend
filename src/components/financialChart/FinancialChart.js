import React, { useEffect, useState } from 'react';
import './FinancialChart.css';
import { Bar, Line, Pie, Radar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, ArcElement, PointElement, Title, Tooltip, Legend, RadialLinearScale } from 'chart.js';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    ArcElement,
    PointElement,
    Title,
    Tooltip,
    Legend,
    RadialLinearScale
);

const FinancialCharts = ({ transactionsIn, transactionsOut }) => {
    const [incomeData, setIncomeData] = useState(Array(12).fill(0));
    const [expenseData, setExpenseData] = useState(Array(12).fill(0));
    const [categoryData, setCategoryData] = useState({});
    const [startDate, setStartDate] = useState(new Date('2024-01-01')); // Default start date
    const [endDate, setEndDate] = useState(new Date('2024-12-31')); // Default end date
    const [year, setYear] = useState(new Date().getFullYear()); // Default to current year

    // Handle the year change
    const handleYearChange = (event) => {
        setYear(event.target.value);
    };

    // Filter transactions by selected date range
    const filterTransactionsByDateRange = (transactions) => {
        return transactions.filter((transaction) => {
            const transactionDate = new Date(transaction.transactionDate);
            return transactionDate >= startDate && transactionDate <= endDate;
        });
    };

    useEffect(() => {
        const updatedIncomeData = Array(12).fill(0);
        const updatedExpenseData = Array(12).fill(0);
        const categories = {};

        const filteredIncome = filterTransactionsByDateRange(transactionsIn);
        const filteredExpenses = filterTransactionsByDateRange(transactionsOut);

        filteredIncome.forEach((transaction) => {
            const month = new Date(transaction.transactionDate).getMonth();
            updatedIncomeData[month] += transaction.amount;
        });

        filteredExpenses.forEach((transaction) => {
            const month = new Date(transaction.transactionDate).getMonth();
            updatedExpenseData[month] += transaction.amount;

            const category = transaction.category || "Others";
            categories[category] = (categories[category] || 0) + transaction.amount;
        });

        setIncomeData(updatedIncomeData);
        setExpenseData(updatedExpenseData);
        setCategoryData(categories);
    }, [transactionsIn, transactionsOut, startDate, endDate]);

    const barData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                label: 'Income',
                data: incomeData,
                backgroundColor: 'rgba(46, 204, 113, 0.6)',
            },
            {
                label: 'Expenses',
                data: expenseData,
                backgroundColor: 'rgba(231, 76, 60, 0.6)',
            },
        ],
    };

    const totalIncome = incomeData.reduce((acc, val) => acc + val, 0);
    const totalExpense = expenseData.reduce((acc, val) => acc + val, 0);
    const pieData = {
        labels: ['Income', 'Expenses'],
        datasets: [
            {
                data: [totalIncome, totalExpense],
                backgroundColor: ['rgba(46, 204, 113, 0.6)', 'rgba(231, 76, 60, 0.6)'],
            },
        ],
    };

    const netBalance = incomeData.map((income, index) => income - expenseData[index]);
    const lineData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                label: 'Net Balance',
                data: netBalance,
                borderColor: 'rgba(41, 128, 185, 0.8)',
                backgroundColor: 'rgba(41, 128, 185, 0.4)',
                fill: true,
            },
        ],
    };

    const categoryLabels = Object.keys(categoryData);
    const categoryValues = Object.values(categoryData);
    const barCategoryData = {
        labels: categoryLabels,
        datasets: [{
            label: 'Expenses by Category',
            data: categoryValues,
            backgroundColor: 'rgba(231, 76, 60, 0.6)',
        }],
    };

    const radarData = {
        labels: categoryLabels,
        datasets: [
            {
                label: 'Expenses',
                data: categoryValues,
                backgroundColor: 'rgba(231, 76, 60, 0.6)',
                borderColor: 'rgba(231, 76, 60, 1)',
                pointBackgroundColor: 'rgba(231, 76, 60, 1)',
                pointBorderColor: '#fff',
            },
        ],
    };

    return (
        <div className="financial-charts">
            {/* All controls below */}
            <div className="controls">
                <div className="date-picker-container">
                    <div className="date-picker">
                        <label>Start Date</label>
                        <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
                    </div>
                    <div className="date-picker">
                        <label>End Date</label>
                        <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
                    </div>
                </div>
            </div>

            {/* Charts */}
            <div className="chart-container">
                <h2>Monthly Income and Expenses</h2>
                <Bar data={barData} options={{ responsive: true, plugins: { legend: { position: 'top' }}}} />
            </div>

            <div className="chart-container">
                <h2>Income vs Expenses</h2>
                <Pie data={pieData} options={{ responsive: true }} />
            </div>

            <div className="chart-container">
                <h2>Net Balance Over Months</h2>
                <Line data={lineData} options={{ responsive: true, plugins: { legend: { position: 'top' }}}} />
            </div>

            <div className="chart-container">
                <h2>Expenses by Category</h2>
                <Bar data={barCategoryData} options={{ responsive: true, plugins: { legend: { position: 'top' }}}} />
            </div>

            <div className="chart-container">
                <h2>Category Expenses Overview</h2>
                <Radar data={radarData} options={{ responsive: true, scales: { r: { beginAtZero: true }}}} />
            </div>
        </div>
    );
};

export default FinancialCharts;