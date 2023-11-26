// Define an array to store the submitted data
const formDataArray = [];

function storeFormData(event) {
    // Prevent the form from submitting and the page from reloading
    event.preventDefault();

    // Get the entered information
    const fullName = document.getElementById("full-name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const message = document.getElementById("message").value;

    // Get the selected event
    const eventLinks = document.querySelectorAll('#myDropdown a');
    let selectedEvent = null;

    for (let link of eventLinks) {
        if (link.classList.contains('selected')) {
            selectedEvent = link.textContent;
            break;
        }
    }

    // Log the information to the console
    console.log("Full Name:", fullName);
    console.log("Email:", email);
    console.log("Phone:", phone);
    if (selectedEvent) {
        console.log("Selected Event:", selectedEvent);
    } else {
        console.log("No event selected.");
    }
    console.log("Message:", message);

    // Add the submitted data to the table
    const tableBody = document.querySelector("#applications-table tbody");
    const newRow = tableBody.insertRow(tableBody.rows.length);
    const nameCell = newRow.insertCell(0);
    const eventCell = newRow.insertCell(1);
    const phoneCell = newRow.insertCell(2);

    nameCell.textContent = fullName;
    eventCell.textContent = selectedEvent || "Not specified";
    phoneCell.textContent = phone || "Not specified";

    // Show the table
    const table = document.getElementById("applications-table");
    table.style.display = "table";

    // Clear the form fields
    document.getElementById("full-name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("message").value = "";
    myInput.placeholder = "Select an Event";
    eventLinks.forEach(l => l.classList.remove('selected'));

    // Add the submitted data to the formDataArray
    formDataArray.push({
        fullName,
        email,
        phone,
        selectedEvent,
        message
    });

    // Log the formDataArray to the console
    console.log("Form Data Array:", formDataArray);
}




document.addEventListener("DOMContentLoaded", function() {
    const eventLinks = document.querySelectorAll('#myDropdown a');
    const myInput = document.getElementById("myInput");
    const myDropdown = document.getElementById("myDropdown");
    const listContent = document.getElementById("listContent");

    for (let link of eventLinks) {
        link.addEventListener('click', function(event) {
            event.preventDefault();

            // Remove 'selected' class from previously selected event
            eventLinks.forEach(l => l.classList.remove('selected'));

            // Mark the clicked event as selected
            link.classList.add('selected');

            // Change placeholder text of the input to the selected event's name
            const selectedEventName = link.textContent;
            myInput.placeholder = selectedEventName;

            // Hide the dropdown
            listContent.style.display = "none";
        });
    }

    // Show the dropdown when the input is focused
    myInput.addEventListener('focus', function() {
        myDropdown.style.display = "";
        myInput.placeholder = "Search.."; // Reset the placeholder to default when the input is focused
    });
});


// Filtering function, to allow for event search
function filterFunction() {
    listContent.style.display = "block";
    const input = document.getElementById("myInput");
    const filter = input.value.toUpperCase();
    const div = document.getElementById("myDropdown");
    const a = div.getElementsByTagName("a");
    for (let i = 0; i < a.length; i++) {
        const txtValue = a[i].textContent || a[i].innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            a[i].style.display = "";
        } else {
            a[i].style.display = "none";
        }
    }
}
