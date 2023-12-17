import { showExpensesChart, showRevenueChart } from './charts.js';

window.onload = function() {
    if (window.location.pathname === '/') {
        showExpensesChart();
        showRevenueChart();
    }
};