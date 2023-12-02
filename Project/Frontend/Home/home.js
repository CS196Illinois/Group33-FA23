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

async function logout(event) {
    event.preventDefault()
    const userName = localStorage.getItem("userName")

    try {
        const response = await fetch('http://localhost:3000/logout', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
              },
            body: JSON.stringify({
                user:userName
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
            loginLink.setAttribute("href","")
            loginLink.onclick = logout
            const addEventLink = document.getElementById("addEventLink")
            addEventLink.style.display = "inline-block"
        } else {
            const addEventLink = document.getElementById("addEventLink")
            addEventLink.style.display = "none"
        }
    })
}
window.onload = init