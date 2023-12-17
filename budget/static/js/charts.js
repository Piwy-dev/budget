/** 
 * @function showExpensesChart
 * @description Create and show the expenses chart.
 */
export function showExpensesChart() {
    var expenses = (document.getElementById("expenses").textContent);
    expenses = JSON.parse(expenses.replace(/'/g, '"'));
    
    // Create the canvas for the charts
    var expensesChart = document.createElement("canvas");
    expensesChart.id = "expenseschart";

    // Add the canvas to the page
    var expensesChartContainer = document.getElementById("expenseschartcontainer");
    expensesChartContainer.appendChild(expensesChart);

    // Create the chart
    var expensesChart = document.getElementById('expenseschart').getContext('2d');
    new Chart(expensesChart, {
        type: 'pie',
        data: {
            labels: ['Nourriture, ménage et hygiènes', 'Vêtements', 'Wifi et téléphone', 'Scouts', 'Soirées et divertissement', 'ASBO', 'Transport', 'Voyages', 'Autres'],
            datasets: [{
                label: 'Dépenses',
                backgroundColor: [
                    'rgb(255, 0, 0)',
                    'rgb(0, 0, 255)',
                    'rgb(0, 255, 0)',
                    'rgb(100, 100, 100)',
                    'rgb(255, 255, 0)',
                    'rgb(255, 0, 255)',
                    'rgb(0, 255, 255)',
                    'rgb(255, 100, 0)',
                    'rgb(0, 100, 255)'
                ],
                borderColor: 'rgb(0, 0, 0)',
                data: [expenses['food'], expenses['clothes'], expenses['wifi'], expenses['scouts'], expenses['entertainment'], expenses['asbo'], expenses['transport'], expenses['travel'], expenses['other']]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            title: {
                display: true,
                text: 'Percentage of each transportation mode in the previously selected city',
                fontColor: '#000000',
                fontSize: 30,
            },
            legend: {
                labels: {
                    fontColor: '#000000'
                },
            },
        }
    });
}