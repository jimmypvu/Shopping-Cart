let label = document.getElementById("label")
let shoppingCart = document.getElementById("shopping-cart")

let basket = JSON.parse(localStorage.getItem("data")) ? JSON.parse(localStorage.getItem("data")) : [];

let calculation = () =>{
    let cartAmt = document.getElementById("cartAmount")
    //total # of items in cart
    cartAmt.innerHTML = basket.map((x)=> x.quantity).reduce((acc,val)=>acc + val, 0);
}

calculation();

/*console.log(JSON.stringify(basket));
console.log(basket.length)
console.log(shopItemsData)*/

let generateCartItems = () => {
    if(basket.length !== 0){
        //console.log(JSON.stringify(basket));
        return shoppingCart.innerHTML = basket.map((x) => {
            let {id, quantity} = x;
            let search = shopItemsData.find((x) => x.id == id) || [];
            return `
            <div class="cart-item">
                <img width="92" src="${search.img}">
                <div class="details">
                    <div class="title-price-x">
                        <h4 class="title-price">
                            <p>${search.name}</p>
                            <p class="cart-item-price">$${search.price}</p>
                        </h4>
                        <i onclick="removeItem(${id})" class="bi bi-x-square"></i>
                    </div>

                    <div class="buttons">
                            <i onclick="decrement(${id})" class="bi bi-dash-square minus"></i>
                            <div id=${id} class="quantity">${quantity}</div>
                            <i onclick="increment(${id})" class="bi bi-plus-square plus"></i>
                        </div>

                    <h3>$${quantity*search.price}</h3>
                </div>
            </div>`
        }).join("");
    }else{
        //console.log(JSON.stringify(basket));
        shoppingCart.innerHTML = ``
        label.innerHTML = `
        <h2>Cart is Empty</h2>
        <a href="index.html">
            <button class="home-button">Back to Home</button>
        `
    }
}

generateCartItems();

let increment = (id) => {
    let selectedItem = id;
    let search = basket.find((x)=>x.id == selectedItem)

    if(search === undefined){
        basket.push({id: selectedItem, quantity: 1})
    }else{
        search.quantity += 1;
    }

    totalAmount();

    generateCartItems();
    update(selectedItem);
    localStorage.setItem("data", JSON.stringify(basket));

    //console.log(basket);

}

let decrement = (id) => {
    let selectedItem = id;
    let search = basket.find((x)=>x.id == selectedItem)

    if(search == undefined){
        return;
    }else if(search.quantity == 0){
        return;
    }else{
        search.quantity -= 1;
    }

    update(selectedItem);
    basket = basket.filter((x) => x.quantity != 0);

    totalAmount();

    //re-render cart when item quantity hits 0
    generateCartItems();

    localStorage.setItem("data", JSON.stringify(basket));

    //console.log(basket);
}

let update = (id) => {
    let selectedItem = id;
    let search = basket.find((x)=>x.id == selectedItem);

    document.getElementById(id).innerHTML = search.quantity;

    calculation();
    totalAmount();
}

let removeItem = (id) => {
    let selectedItem = id;
    //console.log(selectedItem)
    basket = basket.filter((x) => x.id !== id)
    
    //save basket to localstorage
    localStorage.setItem("data", JSON.stringify(basket));

    calculation();
    totalAmount();

    //rerender cart
    generateCartItems();

}

let clearCart = () => {
    basket = [];
    calculation();
    generateCartItems();
    localStorage.setItem("data", JSON.stringify(basket));

}

let totalAmount = () => {
    if(basket.length !== 0){
        let amount = basket.map((x) => {
            let {id, quantity} = x;
            //search basket item id against database id to get price
            let search = shopItemsData.find((x) => x.id == id) || [];
            return search.price * quantity;
        }).reduce((acc,val) => acc + val)

        label.innerHTML = `
        <div class="item-count-total">
            <h3>Cart Total: $${amount}</h3>
            <h5 class="item-count">(${basket.map((x)=> x.quantity).reduce((acc,val)=>acc + val, 0)} items)</h5>
        </div>
        <button onclick = "clearCart()" class = "removeAll">Clear All</button>
        <a href="checkout.html">
            <button class = "checkout">Checkout</button>
        </a>
        `
    }else{
        return;
    }

}

totalAmount();