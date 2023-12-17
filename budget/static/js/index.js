import { showExpensesChart } from './charts.js';

window.onload = function() {
    if (window.location.pathname === '/') {
        console.log("index.js: window.location.pathname === '/'");
        showExpensesChart();
    }
};