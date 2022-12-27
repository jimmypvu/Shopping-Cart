let shop = document.getElementById("shop");

let basket = JSON.parse(localStorage.getItem("data")) ? JSON.parse(localStorage.getItem("data")) : [];

let generateShop =()=>{
    return (shop.innerHTML = shopItemsData.map((x) => {
        let {id, name, price, desc, img} = x;
        let search = basket.find((x)=>x.id == id) ? basket.find((x)=>x.id == id) : [];
        return `
        <div id="product-id-${id}" class="item">
                <div class="pic">
                    <img width="225" src="${img}" alt="">
                </div>
                <div class="details">
                    <h3>${name}</h3>
                    <p>${desc}</p>
                    <div class="price-quantity">
                        <h2>$ ${price}</h2>
                        <div class="buttons">
                            <i onclick="decrement(${id})" class="bi bi-dash-square minus"></i>
                            <div id=${id} class="quantity">${search.quantity === undefined ? 0 : search.quantity}</div>
                            <i onclick="increment(${id})" class="bi bi-plus-square plus"></i>
                        </div>
                    </div>
                </div>
            </div>`
    }).join(""));
}

generateShop();

let increment = (id) => {
    let selectedItem = id;
    let search = basket.find((x)=>x.id == selectedItem)

    if(search === undefined){
        basket.push({id: selectedItem, quantity: 1})
    }else{
        search.quantity += 1;
    }

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

    localStorage.setItem("data", JSON.stringify(basket));

    //console.log(basket);
}

let update = (id) => {
    let selectedItem = id;
    let search = basket.find((x)=>x.id == selectedItem);

    document.getElementById(id).innerHTML = search.quantity;

    calculation();
}

let calculation = () =>{
    let cartAmt = document.getElementById("cartAmount")
    //console.log(basket);
    cartAmt.innerHTML = basket.map((x)=> x.quantity).reduce((acc,val)=>acc + val, 0);
}

calculation();
