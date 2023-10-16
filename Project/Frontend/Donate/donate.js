const donations = [
    { name: "Warren Jodjana", amount: "$100" },
    { name: "Harold Indra", amount: "$200" },
];

function displayDonations() {
    const donationsTable = document.getElementById("donationsTable");
    donations.forEach(donation => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${donation.name}</td><td>${donation.amount}</td>`;
        donationsTable.appendChild(row);
    });
}
window.onload = displayDonations;

console.log("activated")