const btnMenu = document.querySelector('.trigger'),
menuclass = document.querySelector('nav');
btnMenu.addEventListener('click', function(){
    menuclass.classList.toggle('showmenu')
})

// on off light
const btnLight = document.querySelector('.t-light'),
    addclass = document.querySelector('.site');
    btnLight.addEventListener('click', function(){
        addclass.classList.toggle('turnon')
    })

// carousel 
const swiper = new Swiper('.swiper', {
    slidesPerView:1,
  
    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
      clickable:true,
    },
    breakpoints:{
        641:{
            slidesPerView: 2,
        },
        992:{
            slidesPerView: 3,
        },
    },
  
    
  
    
  });

// ---add cart---
const cartIcon = document.querySelector("#cart-icon");
const cart = document.querySelector(".cart-shop");
const closeCart = document.querySelector("#cart-close");

cartIcon.addEventListener("click", () => {
    cart.classList.add("active");
});

closeCart.addEventListener("click", () => {
    cart.classList.remove("active");
});

/*--- start when the document is ready---*/
if (document.readyState == "loading"){
    document.addEventListener('DOMContentLoaded', start);
}else{
    start();
}

//---- start----
function start(){
   addEvents();
}
// -----UPDATE-----
function update(){
    addEvents();
    updateTotal();
}


// ----- add events----
function addEvents(){
    //remove produit dans le cart
    let cartRemove_btns = document.querySelectorAll(".cart-remove");
    console.log(cartRemove_btns);
    cartRemove_btns.forEach((btn)=>{
        btn.addEventListener("click", handle_removeCartItem);
    });
    // change quantity
    let cartQuantity_inputs = document.querySelectorAll('.cart-quantity');
    cartQuantity_inputs.forEach((input) =>{
        input.addEventListener("change",handle_changeItemQuantity);
    });
    // Add item to cart
    let addCart_btns = document.querySelectorAll(".add-prod");
    addCart_btns.forEach((btn )=>{
        btn.addEventListener("click", handle_addCartItem);
    });

    // alert boutton buy
    const buy_btn = document.querySelector(".btn-buy");
    buy_btn.addEventListener("click", handle_buyOrder);
}

//---- EVENTS FUNCTION handle_remove----
let itemsAdded = []
function handle_addCartItem(){
    let product = this.parentElement;
    let title = product.querySelector(".product-title").innerHTML;
    let price = product.querySelector(".product-price").innerHTML;
    let imgSrc = product.querySelector(".product-img").src;
    console.log(title, price, imgSrc);

    let newToAdd = {
        title,
        price,
        imgSrc,
    };
    // alert (handle item is already exist)
    if (itemsAdded.find((el) => el.title == newToAdd.title)) {
        alert("This Item Is Already Exist!");
        return;
     } else {
        itemsAdded.push(newToAdd);
    }
    //add produit to cart
    let cartBoxElement = CartBoxComponent(title, price, imgSrc);
    let newNode = document.createElement("div");
    newNode.innerHTML = cartBoxElement;
    const cartContent = cart.querySelector(".cart-content");
    cartContent.appendChild(newNode);

    update();
}
function handle_removeCartItem() {
    this.parentElement.remove();
    itemsAdded.filter(el=>el.title != this.parentElement.querySelector('.cart-product-title').innerHTML);
    update();
}
function handle_changeItemQuantity(){
    if(isNaN(this.value)|| this.value < 1){
        this.value = 1;
    }
    this.value = Math.floor(this.value);

    update();
}
// fanction alert boutton buy
function handle_buyOrder(){
    if (itemsAdded.length <= 0){
        alert("There is No Order to Place yet! \n Please Make an order First");
        return;
    }
    // confirmation de l'order
    const cartContent = cart.querySelector(".cart-content");
    cartContent.innerHTML = "";
    alert("Your Order is Placed Successfuly :)");
    itemsAdded = [];
    
    update();

}

//---- UPDATE & RENDER FUNCTION----
function updateTotal(){
    let cartBoxes = document.querySelectorAll(".cart-box");
    const totalElement = cart.querySelector(".total-price");
    let total = 0 ;
    cartBoxes.forEach((cartBox)=>{
        let priceElement = cartBox.querySelector(".cart-price");
        let price = parseFloat(priceElement.innerHTML.replace("$", ""));
        let quantity = cartBox.querySelector(".cart-quantity").value;
        total += price * quantity;
    });

    
    // keep 2 digits after the decimal point
    total = total.toFixed(2);
    // or you can use also
    //total = Math.round(total * 100) / 100;
    totalElement.innerHTML = "$" + total;
    
}

// -----HTML COMPONENTS-------
function CartBoxComponent(title, price, imgSrc) {
    return`
    <div class="cart-box">
        <img src=${imgSrc} alt="" class="cart-img">
        <div class="detail-box">
        <div class="cart-product-title">${title} </div>
        <div class="cart-price">${price} </div>
        <input type="number" value="1" class="cart-quantity">

        </div>
        <!--remove cart-->
        <i class="fa-solid fa-trash cart-remove"></i>

    </div>`;
}
                         