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
                text: 'Dépenses par catégorie',
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
                    'rgb(255, 0, 0)',
                    'rgb(0, 0, 255)',
                    'rgb(0, 255, 0)',
                    'rgb(100, 100, 100)',
                ],
                borderColor: 'rgb(0, 0, 0)',
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
                    fontColor: '#000000'
                },
            },
        }
    });
}