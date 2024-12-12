function calculateProfit() {
    const costPrice = parseFloat(document.getElementById('cost-price').value);
    const salePrice = parseFloat(document.getElementById('sale-price').value);
    const additionalCosts = parseFloat(document.getElementById('additional-costs').value);

    if (isNaN(costPrice) || isNaN(salePrice) || isNaN(additionalCosts)) {
        alert('Please enter valid numeric values for all fields.');
        return;
    }

    const profit = salePrice - costPrice - additionalCosts;
    const dealerProfit = profit * 0.10;
    const netProfit = profit - dealerProfit;

    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = `
        <p><strong>Total Profit:</strong> $${profit.toFixed(2)}</p>
        <p><strong>Dealer's Profit (10%):</strong> $${dealerProfit.toFixed(2)}</p>
        <p><strong>Net Profit:</strong> $${netProfit.toFixed(2)}</p>
    `;
}

function calculateInvestorProfit() {
    const investmentAmount = parseFloat(document.getElementById('investment-amount').value);
    const totalProfitElement = document.getElementById('results').querySelector('p strong');
    if (!totalProfitElement) {
        alert('Please calculate profit first.');
        return;
    }
    const totalProfit = parseFloat(totalProfitElement.nextElementSibling.textContent.replace('$', '').trim());

    const totalInvestment = parseFloat(document.getElementById('total-investment').value);

    if (isNaN(investmentAmount) || isNaN(totalProfit) || isNaN(totalInvestment)) {
        alert('Please enter valid numeric values.');
        return;
    }

    const investorProfit = (investmentAmount / totalInvestment) * totalProfit;

    const investorResultsDiv = document.getElementById('investor-profit-results');
    investorResultsDiv.innerHTML = `
        <p><strong>Investor's Profit:</strong> $${investorProfit.toFixed(2)}</p>
    `;
}
