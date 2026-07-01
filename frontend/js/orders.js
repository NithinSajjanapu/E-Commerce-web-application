const ordersContainer = document.getElementById("ordersContainer");

async function loadOrders() {

    const token = localStorage.getItem("token");

    try {

        const response = await fetch(
            "https://e-commerce-web-application-92ho.onrender.com/api/orders/my-orders",
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        const orders = await response.json();

        console.log(orders);

        ordersContainer.innerHTML = "";

        if (orders.length === 0) {

            ordersContainer.innerHTML = `
                <h3>No Orders Found</h3>
            `;

            return;
        }

        orders.forEach(order => {

            ordersContainer.innerHTML += `

            <div class="product-card">

                <h3>Order Status</h3>

                <p>
                    <strong>Status:</strong>
                    ${order.orderStatus}
                </p>

                <p>
                    <strong>Payment:</strong>
                    ${order.paymentMethod}
                </p>

                <p>
                    <strong>Total:</strong>
                    ₹${order.totalPrice}
                </p>

                <p>
                    <strong>Items:</strong>
                    ${order.orderItems.length}
                </p>

                <p>
                    Address :
                    ${order.shippingAddress?.address || "No Address"}
                </p>

            </div>

            `;

        });

    } catch (error) {

        console.log(error);

    }

}

loadOrders();