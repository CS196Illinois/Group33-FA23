function sendData(event) {
  event.preventDefault();
  const formData = new FormData(event.target);

  fetch("http://127.0.0.1:3000/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(Object.fromEntries(formData)),
  })
}

function checkIfRight(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    fetch("http://127.0.0.1:3000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(Object.fromEntries(formData)),
  })
    .then(response => {
        if (response.ok) {
            window.location.replace("http://127.0.0.1:5500/Project/Frontend/Home/home.html");
        } else {
            alert("Incorrect username or password.")
        }
    })

}