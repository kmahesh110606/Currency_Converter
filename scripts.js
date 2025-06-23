//js

// Check if page is loaded
document.addEventListener("DOMContentLoaded", function() {
    // Check if the form is submitted
    document.querySelector('form').onsubmit = function() {
        // Send a GET request to the server
        const from_currency = document.getElementById("from_currency").value.toUpperCase();
        const to_currency = document.getElementById("to_currency").value.toUpperCase();
        const amount = document.getElementById("amount").value;
        fetch(`https://open.er-api.com/v6/latest/${from_currency}`)
            .then(response => response.json())
            .then(data => {
                // Handle the response data
                const exchangeRate = data.rates[to_currency];
                if (exchangeRate === undefined) {
                    document.querySelector("#conversionResult").innerText = "Invalid currency code.";
                    return;
                }
                const convertedAmount = (amount * exchangeRate).toFixed(3);
                document.querySelector("#conversionResult").innerText = `${amount} ${from_currency} = ${convertedAmount} ${to_currency}`;
            })
            .catch(error => {
                document.querySelector("#conversionResult").innerText = "Error fetching exchange rates.";
                // Log the error to the console
                console.error("Error fetching exchange rates:", error);
            });
    };
});