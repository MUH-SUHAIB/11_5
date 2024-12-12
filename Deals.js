// Deals.js

document.addEventListener("DOMContentLoaded", () => {
    // Select elements
    const addDealBtn = document.querySelector(".add-deal-btn");
    const dealSearchInput = document.getElementById("deal-search");
    const dealStatusFilter = document.getElementById("deal-status");
    const dealTableBody = document.querySelector(".deal-list tbody");

    // Sample deal data
    let deals = [
        { name: "Deal A", client: "Client A", investors: "Investor A, B", type: "Equity", status: "Pending", amount: "$100,000" },
        { name: "Deal B", client: "Client B", investors: "Investor C", type: "Debt", status: "Closed", amount: "$50,000" },
        { name: "Deal C", client: "Client C", investors: "Investor D, E", type: "Equity", status: "In Progress", amount: "$200,000" }
    ];

    // Function to render deals in the table
    const renderDeals = (filter = "", search = "") => {
        dealTableBody.innerHTML = "";

        deals
            .filter(deal => 
                (filter === "" || deal.status === filter) &&
                (search === "" || deal.name.toLowerCase().includes(search.toLowerCase()))
            )
            .forEach(deal => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${deal.name}</td>
                    <td>${deal.client}</td>
                    <td>${deal.investors}</td>
                    <td>${deal.type}</td>
                    <td>${deal.status}</td>
                    <td>${deal.amount}</td>
                    <td><button class="delete-btn">Delete</button></td>
                `;
                
                // Add delete functionality
                row.querySelector(".delete-btn").addEventListener("click", () => {
                    deals = deals.filter(d => d.name !== deal.name);
                    renderDeals(filter, search);
                });

                dealTableBody.appendChild(row);
            });
    };

    // Add new deal
    addDealBtn.addEventListener("click", () => {
        const dealName = prompt("Enter deal name:");
        const clientName = prompt("Enter client name:");
        const investors = prompt("Enter investors:");
        const dealType = prompt("Enter deal type:");
        const status = prompt("Enter status (Pending, In Progress, Closed, On Hold):");
        const amount = prompt("Enter total invested amount:");

        if (dealName && clientName && investors && dealType && status && amount) {
            deals.push({ name: dealName, client: clientName, investors, type: dealType, status, amount });
            renderDeals(dealStatusFilter.value, dealSearchInput.value);
        } else {
            alert("All fields are required to add a new deal!");
        }
    });

    // Search functionality
    dealSearchInput.addEventListener("input", (e) => {
        renderDeals(dealStatusFilter.value, e.target.value);
    });

    // Filter functionality
    dealStatusFilter.addEventListener("change", (e) => {
        renderDeals(e.target.value, dealSearchInput.value);
    });

    // Initial render
    renderDeals();
});
