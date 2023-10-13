// Initialize an empty array to store form data
var formDataArray = [];

// Function to store form data when the form is submitted
function storeFormData(event) {
    event.preventDefault(); // Prevent the form from submitting normally
    var formData = {
        fullName: document.getElementById("full-name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        event: document.getElementById("event-select").value,
        message: document.getElementById("message").value
    };
    formDataArray.push(formData); // Add the form data to the array
    console.log(formDataArray); // Display the array in the console (you can save it to a server/database instead)
    // You can reset the form here if needed
}
var eventInput = document.getElementById("event-select");
var eventList = document.getElementById("event-list").getElementsByTagName("option");
var successMessage = document.getElementById("success-message");

eventInput.addEventListener("input", function() {
    var searchText = eventInput.value.toLowerCase();

    for (var i = 0; i < eventList.length; i++) {
        var optionValue = eventList[i].value.toLowerCase();
        if (optionValue.includes(searchText)) {
            eventList[i].style.display = "block";
        } else {
            eventList[i].style.display = "none";
        }
    }
});

// Function to store form data when the form is submitted
function storeFormData(event) {
    event.preventDefault(); // Prevent the form from submitting normally
    var formData = {
        fullName: document.getElementById("full-name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        event: document.getElementById("event-select").value,
        message: document.getElementById("message").value
    };
    console.log(formData); // Display the form data in the console (you can save it to a server/database instead)
    // You can reset the form here if needed

    // Display success message
    successMessage.style.display = "block";
}
