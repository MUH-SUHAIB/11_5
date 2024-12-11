var investors = new Array(); // Initialize an empty array

// Add or update an investor
document.getElementById('addInvestorButton').onclick = function() {
    var name = document.getElementById('investorName').value;
    var amount = parseFloat(document.getElementById('investmentAmount').value);
    var type = document.getElementById('dealType').value;

    // Validate inputs
    if (!name || isNaN(amount) || type === "select") {
        alert('Please fill out all fields correctly.');
        return;
    }

    // Check if the investor already exists
    var existingInvestor = null;
    for (var i = 0; i < investors.length; i++) {
        if (investors[i].name === name) {
            existingInvestor = investors[i];
            break;
        }
    }

    if (existingInvestor) {
        // Update existing investor
        var investmentDetails = new Array(); // Create an array for investment details
        investmentDetails[0] = amount; // First element is the amount
        investmentDetails[1] = type; // Second element is the type
        existingInvestor.investments[existingInvestor.investments.length] = investmentDetails; // Add to investments
    } else {
        // Add new investor
        var newInvestor = { name: name, investments: new Array() };
        var investmentDetails = new Array();
        investmentDetails[0] = amount;
        investmentDetails[1] = type;
        newInvestor.investments[0] = investmentDetails; // Add to investments
        investors[investors.length] = newInvestor; // Add to investors array
    }

    // Clear form and update UI
    clearForm();
    updateInvestorsList();
    updateInvestmentSummary();
};



// Clear form inputs
function clearForm() {
    document.getElementById('investorName').value = '';
    document.getElementById('investmentAmount').value = '';
    document.getElementById('dealType').value = 'select';
}

// Update the investors list in the UI
function updateInvestorsList() {
    var list = document.getElementById('investorsList');
    list.innerHTML = ''; // Clear existing list

    for (var i = 0; i < investors.length; i++) {
        var investor = investors[i];
        for (var j = 0; j < investor.investments.length; j++) {
            var investment = investor.investments[j];
            var row = '<tr>' +
                        '<td>' + investor.name + '</td>' +
                        '<td>' + investment[0].toFixed(2) + ' $</td>' + // Use index for amount
                        '<td>' + investment[1] + '</td>' + // Use index for type
                        '<td>' +
                            '<button onclick="editInvestor(\'' + investor.name + '\')">Edit</button>' +
                            '<button onclick="removeInvestor(\'' + investor.name + '\')">Remove</button>' +
                        '</td>' +
                      '</tr>';
            list.innerHTML += row; // Concatenate the new row to the innerHTML
        }
    }
}

// Edit an investor
function editInvestor(name) {
    for (var i = 0; i < investors.length; i++) {
        if (investors[i].name === name) {
            var investor = investors[i];
            document.getElementById('investorName').value = investor.name;
            var lastInvestment = investor.investments[investor.investments.length - 1];
            document.getElementById('investmentAmount').value = lastInvestment[0]; // Use index for amount
            document.getElementById('dealType').value = lastInvestment[1]; // Use index for type
            removeInvestor(name); // Remove investor for re-adding
            break;
        }
    }
}

// Remove an investor
function removeInvestor(name) {
    var newInvestors = new Array(); // Create a new array
    for (var i = 0; i < investors.length; i++) {
        if (investors[i].name !== name) {
            newInvestors[newInvestors.length] = investors[i]; // Add to new array
        }
    }
    investors = newInvestors; // Update investors array
    updateInvestorsList();
    updateInvestmentSummary();
}

// Update investment summary
function updateInvestmentSummary() {
    var totalInvestors = investors.length;
    var totalInvestment = 0;
    for (var i = 0; i < investors.length; i++) {
        for (var j = 0; j < investors[i].investments.length; j++) {
            totalInvestment += investors[i].investments[j][0]; // Use index for amount
        }
    }
    var averageInvestment = 0;
    if (totalInvestors > 0) {
        averageInvestment = totalInvestment / totalInvestors; // Calculate average
    }

    document.getElementById('totalInvestors').innerText = totalInvestors;
    document.getElementById('totalInvestment').innerText = totalInvestment.toFixed(2);
    document.getElementById('averageInvestment').innerText = averageInvestment.toFixed(2);
}
