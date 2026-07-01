const checkoutForm = document.getElementById("checkoutForm");

checkoutForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const token = localStorage.getItem("token");

    const address = document.getElementById("address").value;

    try {

        /* GET CART FIRST */
        const cartResponse = await fetch(
            "https://e-commerce-web-application-92ho.onrender.com/api/cart",
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        const cart = await cartResponse.json();

        /* CHECK EMPTY CART */
        if (!cart.items || cart.items.length === 0) {

            alert("Cart is empty");
            return;

        }

        /* CALCULATE TOTAL */
        let totalPrice = 0;

        cart.items.forEach(item => {

            totalPrice += item.price * item.quantity;

        });

        /* PLACE ORDER */
        const response = await fetch(
            "https://e-commerce-web-application-92ho.onrender.com/api/orders",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },

                body: JSON.stringify({

                    orderItems: cart.items,

                    shippingAddress: {
                        address
                    },

                    totalPrice,

                    paymentMethod: "COD"

                })
            }
        );

        const data = await response.json();

        alert(data.message);

        /* CLEAR CART UI */
        window.location.href = "orders.html";

    } catch (error) {

        console.log(error);

    }

});