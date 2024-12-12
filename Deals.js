// Deals.js

var deals = []; // Initialize an empty array for deals

// Add a new deal
function addDeal() {
    var name = document.getElementById('dealName').value;
    var client = document.getElementById('clientName').value;
    var investors = document.getElementById('investorNames').value;
    var type = document.getElementById('dealType').value;
    var status = document.getElementById('dealStatus').value;
    var amount = parseFloat(document.getElementById('investedAmount').value);

    // Validate inputs
    if (!name || !client || !investors || type === "select" || status === "select" || isNaN(amount)) {
        alert('Please fill out all fields correctly.');
        return;
    }

    // Add new deal to the array
    var newDeal = { name, client, investors, type, status, amount };
    deals.push(newDeal);

    // Clear form and update UI
    clearForm();
    updateDealsTable();
}

// Clear form inputs
function clearForm() {
    document.getElementById('dealName').value = '';
    document.getElementById('clientName').value = '';
    document.getElementById('investorNames').value = '';
    document.getElementById('dealType').value = 'select';
    document.getElementById('dealStatus').value = 'select';
    document.getElementById('investedAmount').value = '';
}

// Update the deals table in the UI
function updateDealsTable() {
    var tableBody = document.getElementById('dealsTableBody');
    tableBody.innerHTML = ''; // Clear existing rows

    deals.forEach((deal, index) => {
        var row = '<tr>' +
                  '<td>' + deal.name + '</td>' +
                  '<td>' + deal.client + '</td>' +
                  '<td>' + deal.investors + '</td>' +
                  '<td>' + deal.type + '</td>' +
                  '<td>' + deal.status + '</td>' +
                  '<td>' + deal.amount.toFixed(2) + '</td>' +
                  '<td>' +
                      '<button onclick="editDeal(' + index + ')">Edit</button>' +
                      '<button onclick="removeDeal(' + index + ')">Remove</button>' +
                  '</td>' +
                  '</tr>';
        tableBody.innerHTML += row;
    });
}

// Edit a deal
function editDeal(index) {
    var deal = deals[index];
    document.getElementById('dealName').value = deal.name;
    document.getElementById('clientName').value = deal.client;
    document.getElementById('investorNames').value = deal.investors;
    document.getElementById('dealType').value = deal.type;
    document.getElementById('dealStatus').value = deal.status;
    document.getElementById('investedAmount').value = deal.amount;

    removeDeal(index); // Remove the deal for re-adding
}

// Remove a deal
function removeDeal(index) {
    deals.splice(index, 1); // Remove the deal from the array
    updateDealsTable();
}

// Search for deals
function searchDeals() {
    var searchQuery = document.getElementById('dealSearch').value.toLowerCase();
    var tableBody = document.getElementById('dealsTableBody');
    tableBody.innerHTML = ''; // Clear existing rows

    deals.filter(deal => 
        deal.name.toLowerCase().includes(searchQuery) ||
        deal.client.toLowerCase().includes(searchQuery) ||
        deal.investors.toLowerCase()
