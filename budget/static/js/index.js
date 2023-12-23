import { showExpensesChart, showRevenueChart } from './charts.js';
import { changeAccount } from './accounts.js';

window.onload = function() {
    if (window.location.pathname === '/') {
        showExpensesChart();
        showRevenueChart();
        changeAccount();

        const accountSelect = document.getElementById('account');
        accountSelect.addEventListener('change', changeAccount);
    }
};