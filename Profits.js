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
    resultsDiv.innerHTML = 
        <p><strong>Total Profit:</strong> $${profit.toFixed(2)}</p>
        <p><strong>Dealer's Profit (10%):</strong> $${dealerProfit.toFixed(2)}</p>
        <p><strong>Net Profit:</strong> $${netProfit.toFixed(2)}</p>
    ;
}


