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
                    '#6396d4',
                    '#d46396',
                    '#96d463',
                    '#d4d463',
                    '#d49663',
                    '#63d4d4',
                    '#d46363',
                    '#63d496',
                    '#d4d4d4',
                ],
                borderColor: '#373738',
                data: [expenses['food'], expenses['clothes'], expenses['wifi'], expenses['scouts'], expenses['entertainment'], expenses['asbo'], expenses['transport'], expenses['travel'], expenses['other']]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            title: {
                display: true,
                text: 'Dépenses par catégorie',
                fontColor: '#000000',
                fontSize: 30,
            },
            legend: {
                labels: {
                    fontColor: '#373738',
                    fontSize: 15,
                },
            },
        }
    });
}


/** 
 * @function showRevenuesChart
 * @description Create and show the revenues chart.
 */
export function showRevenueChart() {
    var revenues = (document.getElementById("revenues").textContent);
    revenues = JSON.parse(revenues.replace(/'/g, '"'));
    
    // Create the canvas for the charts
    var revenuesChart = document.createElement("canvas");
    revenuesChart.id = "revenueschart";

    // Add the canvas to the page
    var revenuesChartContainer = document.getElementById("revenueschartcontainer");
    revenuesChartContainer.appendChild(revenuesChart);

    // Create the chart
    var revenuesChart = document.getElementById('revenueschart').getContext('2d');
    new Chart(revenuesChart, {
        type: 'pie',
        data: {
            labels: ['Remboursements', 'Forfait parents', 'Salaire', 'Autres'],
            datasets: [{
                label: 'Revenus',
                backgroundColor: [
                    '#3fab4a',
                    '#f5a742',
                    '#c863d4',
                    '#42f5a7',
                ],
                borderColor: '#373738',
                data: [revenues['payback'], revenues['parents'], revenues['salary'], revenues['other']]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            title: {
                display: true,
                text: 'Revenus par catégorie',
                fontColor: '#000000',
                fontSize: 30,
            },
            legend: {
                labels: {
                    fontColor: '#373738',
                    fontSize: 15,
                },
            },
        }
    });
}