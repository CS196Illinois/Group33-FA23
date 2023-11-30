function changeMethod(method) {
  let formContent = "";
  switch (method) {
    case "card":
      formContent = `
            <h4>Card information</h4>
            <form>
                <div class="form-group">
                    <label>Card number</label>
                    <input type="text" class="form-control" placeholder="Card number">
                </div>
                <div class="form-group">
                    <label>Expiry date</label>
                    <input type="text" class="form-control" placeholder="MM/YY">
                </div>
                <div class="form-group">
                    <label>CVV</label>
                    <input type="text" class="form-control" placeholder="CVV">
                </div>
                <div class="form-group">
                    <label>Email</label>
                    <input type="email" class="form-control" placeholder="example@email.com">
                </div>
            </form>`;
      break;

    case "bank":
      formContent = `
            <h4>Internet Banking</h4>
            <form>
                <div class="form-group">
                    <label>Select Your Bank</label>
                    <select class="form-control">
                        <option>Bank of America</option>
                        <option>Chase Bank</option>
                        <option>PNC</option>
                    </select>
                </div>
                <button type="button" class="btn btn-primary btn-block">Continue to Bank</button>
            </form>`;
      break;

    case "apple_google":
      formContent = `
            <h4>Apple/Google Pay</h4>
            <div class="text-center">
                <button type="button" class="btn btn-outline-dark btn-lg mb-2" onclick="window.location.href='https://www.apple.com/apple-pay/'">
                    <i class="fab fa-apple"></i> Pay with Apple Pay
                </button>
                <br>
                <button type="button" class="btn btn-outline-dark btn-lg" onclick="window.location.href='https://pay.google.com/about/'">
                    <i class="fab fa-google-pay"></i> Pay with Google Pay
                </button>
            </div>`;
      break;
  }
  document.getElementById("paymentForm").innerHTML = formContent;
}

async function isLoggedIn() {
  const token = localStorage.getItem("token");
  const userName = localStorage.getItem("userName");
  if (token == null || userName == null) {
    return false;
  }
  try {
    const response = await fetch("http://localhost:3000/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: userName,
        token: token,
      }),
    });

    const result = await response;
    if (result.status == 200) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
}

async function logout(event) {
  event.preventDefault();
  const userName = localStorage.getItem("userName");

  try {
    const response = await fetch("http://localhost:3000/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: userName,
      }),
    });

    const result = await response;
    if (result.status == 200) {
      window.location.replace("../Home/home.html");
    } else {
      console.log("Failed to logout");
    }
  } catch (error) {
    console.error(error);
  }
}

function init() {
  isLoggedIn().then((loggedIn) => {
    if (loggedIn) {
      const loginLink = document.getElementById("loginLink");
      loginLink.innerHTML = "Logout";
      loginLink.setAttribute("href", "");
      loginLink.onclick = logout;
    }
  });
}
window.onload = init;
