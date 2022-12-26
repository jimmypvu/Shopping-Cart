let shop = document.getElementById("shop");

let shopItemsData = [
    {
    id:"4631876311",
    name: "Men's Eureka Tee",
    price: 35,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing.",
    img: "images/img-one.jpg"
    },
    {id:"1561373557",
    name: "A8 Trucker Snapback",
    price: 45,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing.",
    img: "images/img-two.jpg"},
    {id:"7616515867",
    name: "Golden State x Cona Sto Pullover",
    price: 85,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing.",
    img: "images/img-three.jpg"},
    {id:"4603167861",
    name: "Nirvana Throwback Tee",
    price: 30,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing.",
    img: "images/img-four.jpg"}
];

let basket = [];

let generateShop =()=>{
    return shop.innerHTML = shopItemsData.map((x) => {
        let {id, name, price, desc, img} = x;
        return `
        <div id="product-id-${id}" class="item">
                <img width="224" src="${img}" alt="">
                <div class="details">
                    <h3>${name}</h3>
                    <p>${desc}</p>
                    <div class="price-quantity">
                        <h2>$ ${price}</h2>
                        <div class="buttons">
                            <i onclick="decrement(${id})" class="bi bi-dash-square"></i>
                            <div id=${id} class="quantity">0</div>
                            <i onclick="increment(${id})" class="bi bi-plus-square"></i>
                        </div>
                    </div>
                </div>
            </div>`
    }).join("");
}

generateShop();

let increment = (id) => {
    let selectedItem = id;
    let search = basket.find((x)=>x.id===selectedItem)

    if(search === undefined){
        basket.push({id: selectedItem, quantity: 1})
    }else{
        search.quantity += 1;
    }

    update(id);
    //console.log(basket);

}

let decrement = (id) => {
    let selectedItem = id;
    let search = basket.find((x)=>x.id===selectedItem)

    if(search.quantity === 0){
        return;
    }else{
        search.quantity -= 1;
    }
    update(id);
    //console.log(basket);
}

let update = (id) => {
    let selectedItem = id;
    let search = basket.find((x)=>x.id === selectedItem);
    //console.log(search.quantity);
    document.getElementById(id).innerHTML = search.quantity;
}