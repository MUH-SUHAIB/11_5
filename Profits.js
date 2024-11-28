function calculateProfit() {
    // Get input values
    const costPrice = parseFloat(document.getElementById('cost-price').value);
    const salePrice = parseFloat(document.getElementById('sale-price').value);
    const additionalCosts = parseFloat(document.getElementById('additional-costs').value);

    // Basic validation
    if (isNaN(costPrice) || isNaN(salePrice) || isNaN(additionalCosts)) {
        alert('Please enter valid numeric values for all fields.');
        return;
    }

    // Calculate profit
    const profit = salePrice - costPrice - additionalCosts;
    const dealerProfit = profit * 0.10;  // Dealer's 10% of profit
    const netProfit = profit - dealerProfit;

    // Display results
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = `
        <p><strong>Total Profit:</strong> $${profit.toFixed(2)}</p>
        <p><strong>Dealer's Profit (10%):</strong> $${dealerProfit.toFixed(2)}</p>
        <p><strong>Net Profit:</strong> $${netProfit.toFixed(2)}</p>
    `;
}

function calculateInvestorProfit() {
    // Get values
    const investmentAmount = parseFloat(document.getElementById('investment-amount').value);
    const totalProfit = parseFloat(document.getElementById('results').querySelector('p strong').nextSibling.textContent.replace('$', ''));

    // Basic validation
    if (isNaN(investmentAmount) || isNaN(totalProfit)) {
        alert('Please enter valid numeric values.');
        return;
    }

    // Calculate investor's share of profit
    const investorProfit = (investmentAmount / totalInvestment) * totalProfit;

    // Display investor's profit
    const investorResultsDiv = document.getElementById('investor-profit-results');
    investorResultsDiv.innerHTML = `
        <p><strong>Investor's Profit:</strong> $${investorProfit.toFixed(2)}</p>
    `;
}

