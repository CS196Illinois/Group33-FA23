function sendData(event) {
  event.preventDefault();
  const formData = new FormData(event.target);

  if (!validateForm(formData)) {
    alert("Please fill in all the fields");
    return;
  }

  fetch("http://127.0.0.1:3000/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(Object.fromEntries(formData)),
  });
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
  }).then((response) => {
    if (response.status == 200) {
      response.json().then(data => {
        localStorage.setItem("userName", data.userName)
        localStorage.setItem("token", data.token)
      })
      window.location.replace("../Home/home.html");
    } else {
      alert("Incorrect username or password.");
    }
  });
}

function validateForm(formData) {
  for (let value of formData.values()) {
    if (!value.trim()) {
      return false;
    }
  }
  return true;
}

async function isLoggedIn() {
  const token = localStorage.getItem("token")
  const userName = localStorage.getItem("userName")
  if (token == null || userName == null) {
    return false
  }
  try {
    const response = await fetch('http://localhost:3000/auth', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: userName,
        token: token
      })
    })

    const result = await response
    if (result.status == 200) {
      return true
    } else {
      return false
    }

  } catch (error) {
    console.error(error)
    return false
  }
}

async function logout() {
  const userName = localStorage.getItem("userName")

  try {
    const response = await fetch('http://localhost:3000/logout', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: userName
      })
    })

    const result = await response
    if (result.status == 200) {
      window.location.replace("../Home/home.html");
    } else {
      console.log("Failed to logout")
    }

  } catch (error) {
    console.error(error)
  }
}

function init() {
  isLoggedIn().then(loggedIn => {
    if (loggedIn) {
      const loginLink = document.getElementById("loginLink")
      loginLink.innerHTML = "Logout"
      loginLink.setAttribute("href", "")
      loginLink.onclick = logout
    }
  })
}
window.onload = init