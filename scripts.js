//js

// Check if page is loaded
document.addEventListener("DOMContentLoaded", function() {
    // Check if the form is submitted
    document.querySelector('form').onsubmit = function() {
        // Send a GET request to the server
        const from_Currency = document.getElementById("from_Currency").value.toUpperCase();
        const to_Currency = document.getElementById("to_Currency").value.toUpperCase();
        const amount = document.getElementById("amount").value;
        fetch(`https://open.er-api.com/v6/latest/${from_Currency}`)
            .then(response => response.json())
            .then(data => {
                // Handle the response data
                const exchangeRate = data.rates[to_Currency];
                if (exchangeRate === undefined) {
                    document.querySelector("#conversionResult").innerText = "Invalid currency code.";
                    return;
                }
                const convertedAmount = (amount * exchangeRate).toFixed(3);
                document.querySelector("#conversionResult").innerText = `${amount} ${from_Currency} = ${convertedAmount} ${to_Currency}`;
            
                // Display Update Date and Time
                let lastUpdated = data.time_last_update_utc;
                console.log("Last Updated:", lastUpdated);
                document.querySelector("#lastUpdated").innerText = `Last Update: ${lastUpdated}`;

                // Display provider
                let provider = data.provider;
                console.log("Provider:", provider);
                document.querySelector("#provider").innerText = `Provider: ${provider}`;
            })
            .catch(error => {
                document.querySelector("#conversionResult").innerText = "Error fetching exchange rates.";
                // Log the error to the console
                console.error("Error fetching exchange rates:", error);
            });

        return false; // Prevent form submission
    }
});