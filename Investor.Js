// Initialize investors from localStorage or start with an empty array
let investors = JSON.parse(localStorage.getItem('investors')) || [];

// Function to add an investor
function addInvestor() {
    const investorName = document.getElementById('investorName').value;
    const investmentAmount = parseFloat(document.getElementById('investmentAmount').value);
    const dealType = document.getElementById('dealType').value;

    // Simple validation
    if (!investorName || isNaN(investmentAmount) || dealType === "select") {
        alert('Please fill out all fields correctly.');
        return;
    }

    // Check if the investor already exists
    let existingInvestor = investors.find(investor => investor.name === investorName);
    if (existingInvestor) {
        // Update existing investor's investment
        existingInvestor.investments.push({ amount: investmentAmount, type: dealType });
    } else {
        // Add new investor with initial investment
        investors.push({ name: investorName, investments: [{ amount: investmentAmount, type: dealType }] });
    }

    // Save updated investors array to localStorage
    localStorage.setItem('investors', JSON.stringify(investors));
    
    // Clear form and update UI
    clearForm();
    updateInvestorsList();
}

// Function to clear the input form
function clearForm() {
    document.getElementById('investorName').value = '';
    document.getElementById('investmentAmount').value = '';
    document.getElementById('dealType').value = 'select'; // Reset to default option
}

// Function to update the investor list
function updateInvestorsList() {
    const investorsList = document.getElementById('investorsList');
    investorsList.innerHTML = ''; // Reset content

    if (investors.length === 0) {
        investorsList.innerHTML = '<tr><td colspan="4">No investors added yet.</td></tr>'; // Message if no investors
        return;
    }

    investors.forEach((investor) => {
        investor.investments.forEach((investment) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="name">${investor.name}</td>
                <td class="invested-amount"><strong>${investment.amount.toFixed(2)} &nbsp;$</strong></td> 
                <td class="deal-type"><strong>${investment.type}</strong></td> 
                <td class="actions"> 
                    <button onclick="editInvestor('${investor.name}')">Edit</button>
                    <button onclick="removeInvestor('${investor.name}')">Remove</button>
                </td>
            `;
            investorsList.appendChild(row);
        });
    });

    // Update summary after updating the list
    updateInvestmentSummary();
}

// Function to edit an investor
function editInvestor(name) {
    const investor = investors.find(inv => inv.name === name);
    if (investor) {
        // Populate the form with existing investor data
        document.getElementById('investorName').value = investor.name;
        const lastInvestment = investor.investments[investor.investments.length - 1];
        document.getElementById('investmentAmount').value = lastInvestment.amount;
        document.getElementById('dealType').value = lastInvestment.type;

        // Remove the investor from the array (to be re-added)
        removeInvestor(name);
    }
}

// Function to remove an investor
function removeInvestor(name) {
    investors = investors.filter(investor => investor.name !== name);
    localStorage.setItem('investors', JSON.stringify(investors));
    updateInvestorsList();
}

// Function to clear all investors
function clearInvestors() {
    if (confirm("Are you sure you want to clear all investors?")) {
        investors = [];
        localStorage.removeItem('investors'); // Clear localStorage
        updateInvestorsList();
    }
}

// Function to update investment summary
function updateInvestmentSummary() {
    const totalInvestors = investors.length;
    const totalInvestment = investors.reduce((sum, investor) => sum + investor.investments.reduce((investmentSum, investment) => investmentSum + investment.amount, 0), 0);
    const averageInvestment = totalInvestors ? (totalInvestment / totalInvestors).toFixed(2) : 0;

    document.getElementById('totalInvestors').innerText = totalInvestors;
    document.getElementById('totalInvestment').innerText = totalInvestment.toFixed(2);
    document.getElementById('averageInvestment').innerText = averageInvestment;
}

// Initialize the list on page load
document.addEventListener('DOMContentLoaded', () => {
    updateInvestorsList();
    // Set font to Times New Roman for the entire document
    document.body.style.fontFamily = "Times New Roman, serif";
});
