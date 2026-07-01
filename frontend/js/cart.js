const cartItemsDiv = document.getElementById("cartItems");

async function loadCart(){

    const token = localStorage.getItem("token");

    try{

        const response = await fetch("https://e-commerce-web-application-92ho.onrender.com/api/cart",{
            headers:{
                Authorization:`Bearer ${token}`
            }
        });

        const cart = await response.json();

        let total = 0;

        cartItemsDiv.innerHTML = "";

        cart.items.forEach(item=>{

            total += item.price * item.quantity;

            cartItemsDiv.innerHTML += `
            <div class="product-card">

                <img src="${item.image}">

                <h3>${item.name}</h3>

                <p>₹${item.price}</p>

                <p>Qty : ${item.quantity}</p>

                <button class="btn"
                        onclick="removeFromCart('${item.product._id}')">
                    Remove
                </button>

            </div>
            `;

        });

        document.getElementById("totalPrice")
        .innerText = `Total : ₹${total}`;

    }catch(error){
        console.log(error);
    }

}

async function addToCart(productId){

    const token = localStorage.getItem("token");

    try{

        const response = await fetch("https://e-commerce-web-application-92ho.onrender.com/api/cart",{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${token}`
            },
            body:JSON.stringify({
                productId,
                quantity:1
            })
        });

        const data = await response.json();

        alert(data.message);

    }catch(error){
        console.log(error);
    }

}

async function removeFromCart(productId){

    const token = localStorage.getItem("token");

    await fetch(`https://e-commerce-web-application-92ho.onrender.com/api/cart/${productId}`,{
        method:"DELETE",
        headers:{
            Authorization:`Bearer ${token}`
        }
    });

    loadCart();

}

function checkout(){
    window.location.href = "checkout.html";
}

if(cartItemsDiv){
    loadCart();
}
