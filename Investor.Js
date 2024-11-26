let investors = [];

// Add or update an investor
document.getElementById('addInvestorButton').addEventListener('click', () => {
    const investorName = document.getElementById('investorName').value;
    const investmentAmount = parseFloat(document.getElementById('investmentAmount').value);
    const dealType = document.getElementById('dealType').value;

    // Validate inputs
    if (!investorName || isNaN(investmentAmount) || dealType === "select") {
        alert('Please fill out all fields correctly.');
        return;
    }

    // Find existing investor
    const existingInvestor = investors.find(inv => inv.name === investorName);
    if (existingInvestor) {
        // Update investment
        existingInvestor.investments.push({ amount: investmentAmount, type: dealType });
    } else {
        // Add new investor
        investors.push({ name: investorName, investments: [{ amount: investmentAmount, type: dealType }] });
    }

    // Clear form and update UI
    clearForm();
    updateInvestorsList();
    updateInvestmentSummary();
});

// Clear all investors
document.getElementById('clearButton').addEventListener('click', () => {
    if (confirm("Are you sure you want to clear all investors?")) {
        investors = [];
        updateInvestorsList();
        updateInvestmentSummary();
    }
});

// Clear form inputs
function clearForm() {
    document.getElementById('investorName').value = '';
    document.getElementById('investmentAmount').value = '';
    document.getElementById('dealType').value = 'select';
}

// Update the investors list in the UI
function updateInvestorsList() {
    const investorsList = document.getElementById('investorsList');
    investorsList.innerHTML = ''; // Clear the existing list

    investors.forEach(investor => {
        investor.investments.forEach(investment => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${investor.name}</td>
                <td>${investment.amount.toFixed(2)} &nbsp;$</td>
                <td>${investment.type}</td>
                <td>
                    <button onclick="editInvestor('${investor.name}')">Edit</button>
                    <button onclick="removeInvestor('${investor.name}')">Remove</button>
                </td>
            `;
            investorsList.appendChild(row);
        });
    });
}

// Edit an investor
function editInvestor(name) {
    const investor = investors.find(inv => inv.name === name);
    if (investor) {
        document.getElementById('investorName').value = investor.name;
        const lastInvestment = investor.investments[investor.investments.length - 1];
        document.getElementById('investmentAmount').value = lastInvestment.amount;
        document.getElementById('dealType').value = lastInvestment.type;

        // Remove investor for re-adding
        removeInvestor(name);
    }
}

// Remove an investor
function removeInvestor(name) {
    investors = investors.filter(inv => inv.name !== name);
    updateInvestorsList();
    updateInvestmentSummary();
}

// Update investment summary
function updateInvestmentSummary() {
    const totalInvestors = investors.length;
    const totalInvestment = investors.reduce((sum, investor) => 
        sum + investor.investments.reduce((investmentSum, investment) => investmentSum + investment.amount, 0), 
    0);
    const averageInvestment = totalInvestors ? (totalInvestment / totalInvestors).toFixed(2) : 0;

    document.getElementById('totalInvestors').innerText = totalInvestors;
    document.getElementById('totalInvestment').innerText = totalInvestment.toFixed(2);
    document.getElementById('averageInvestment').innerText = averageInvestment;
}
