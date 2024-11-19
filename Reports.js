  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script>
      // Example: Chart.js Configuration
      const profitCtx = document.getElementById("profit-chart").getContext("2d");
      const profitChart = new Chart(profitCtx, {
        type: "line",
        data: {
          labels: ["January", "February", "March", "April", "May"],
          datasets: [
            {
              label: "Profit Over Time",
              data: [30000, 40000, 35000, 50000, 45000],
              borderColor: "rgba(75, 192, 192, 1)",
              fill: false,
            },
          ],
        },
      });

      const dealsCtx = document.getElementById("deals-chart").getContext("2d");
      const dealsChart = new Chart(dealsCtx, {
        type: "bar",
        data: {
          labels: ["Pending", "Completed", "Cancelled"],
          datasets: [
            {
              label: "Number of Deals",
              data: [10, 30, 5],
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
              ],
              borderWidth: 1,
            },
          ],
        },
      });
    </script>
