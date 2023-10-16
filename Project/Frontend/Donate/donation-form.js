function changeMethod(method) {
    let formContent = "";
    switch (method) {
        case 'card':
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

        case 'bank':
            formContent = `
            <h4>Internet Banking</h4>
            <form>
                <div class="form-group">
                    <label>Select Your Bank</label>
                    <select class="form-control">
                        <option>Bank A</option>
                        <option>Bank B</option>
                        <option>Bank C</option>
                    </select>
                </div>
                <button type="button" class="btn btn-primary btn-block">Continue to Bank</button>
            </form>`;
            break;

        case 'apple_google':
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
    document.getElementById('paymentForm').innerHTML = formContent;
}
