// Deals.js

// Array to store deals
let deals = [];

// Add a new deal
function addDeal() {
    // Get input values
    const dealName = document.getElementById('dealName').value;
    const clientName = document.getElementById('clientName').value;
    const investorNames = document.getElementById('investorNames').value;
    const dealType = document.getElementById('dealType').value;
    const dealStatus = document.getElementById('dealStatus').value;
    const investedAmount = parseFloat(document.getElementById('investedAmount').value);

    // Validate input
    if (!dealName || !clientName || !investorNames || dealType === "select" || dealStatus === "select" || isNaN(investedAmount)) {
        alert('Please fill out all fields correctly.');
        return;
    }

    // Create new deal object
    const newDeal = {
        dealName,
        clientName,
        investorNames,
        dealType,
        dealStatus,
        investedAmount
    };

    // Add the deal to the array
    deals.push(newDeal);

    // Clear the form
    clearForm();

    // Update the table
    updateDealsTable();
}

// Clear form fields
function clearForm() {
    document.getElementById('dealName').value = '';
    document.getElementById('clientName').value = '';
    document.getElementById('investorNames').value = '';
    document.getElementById('dealType').value = 'select';
    document.getElementById('dealStatus').value = 'select';
    document.getElementById('investedAmount').value = '';
}

// Update the deals table
function updateDealsTable() {
    const tableBody = document.getElementById('dealsTableBody');
    tableBody.innerHTML = '';

    deals.forEach((deal, index) => {
        const row = `
            <tr>
                <td>${deal.dealName}</td>
                <td>${deal.clientName}</td>
                <td>${deal.investorNames}</td>
                <td>${deal.dealType}</td>
                <td>${deal.dealStatus}</td>
                <td>$${deal.investedAmount.toFixed(2)}</td>
                <td>
                    <button onclick="editDeal(${index})">Edit</button>
                    <button onclick="removeDeal(${index})">Remove</button>
                </td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

// Edit a deal
function editDeal(index) {
    const deal = deals[index];

    document.getElementById('dealName').value = deal.dealName;
    document.getElementById('clientName').value = deal.clientName;
    document.getElementById('investorNames').value = deal.investorNames;
    document.getElementById('dealType').value = deal.dealType;
    document.getElementById('dealStatus').value = deal.dealStatus;
    document.getElementById('investedAmount').value = deal.investedAmount;

    // Remove the deal for re-adding
    removeDeal(index);
}

// Remove a deal
function removeDeal(index) {
    deals.splice(index, 1);
    updateDealsTable();
}

// Attach event listener to the Add Deal button
document.getElementById('addDealButton').addEventListener('click', addDeal);
