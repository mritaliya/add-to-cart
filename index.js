//********************** cart     ********************* //
var cartIcon=document.querySelector("#cart-icon");
var cart=document.querySelector(".cart");
var closeCart =document.querySelector("#close-cart");

cartIcon.addEventListener("click",()=>{
    cart.classList.add("active");
})

closeCart.addEventListener('click',()=>{
    cart.classList.remove("active");
})

// cart working with js

// if(document.readyState=='loading'){
//     document.addEventListener("DOMContentLoaded",ready)
// }else{
//     ready();
// }




// ******************** remove from cart ***************** //

const ready=()=>{
var  removeCartButton=document.getElementsByClassName("cart-remove");
for (var i = 0; i < removeCartButton.length; i++) {
    const button= removeCartButton[i];
    button.addEventListener('click',removeCartIteam)
}

// quantity change
var quantityInput=document.getElementsByClassName("cart-quantity");
for (var i = 0; i < quantityInput.length; i++) {
    var input=quantityInput[i];
    input.addEventListener("change",quantityChanged);
}
 // add to cart //
 var addToCart=document.getElementsByClassName("add-cart");
 for (var i = 0; i < addToCart.length; i++) {
    var button=addToCart[i];
    button.addEventListener("click",addCartClicked)
 }
 // BUY BUTTON WORK
document.getElementsByClassName("btn-buy")[0].addEventListener("click",buyButtonclicked);

};

function buyButtonclicked(){
    alert(`your order has been placed`);
    var cartcontent=document.getElementsByClassName('cart-content')[0];
    while(cartcontent.hasChildNodes()){
        cartcontent.removeChild(cartcontent.firstChild);
    }
    updatetotal();
}

ready();

function removeCartIteam(event){
    var buttonOnClick=event.target;
    buttonOnClick.parentElement.remove();
    updatetotal();
    
};

// ************* quantity change ************* //

function quantityChanged(event){
    var input=event.target
    if((isNaN(input.value) || input.value<=0)){
        input.value=1;
    }
    updatetotal();
}

// add to cart
function addCartClicked(event){
var button=event.target;
var shopProducts=button.parentElement;
    var title=shopProducts.getElementsByClassName("title-product")[0].innerText;
        var price=shopProducts.getElementsByClassName("price")[0].innerText;
        var productImage=shopProducts.getElementsByClassName("product-img")[0].src;
        addProductToCart(title,price,productImage);
        updatetotal();
}

function addProductToCart(title,price,productImg){
var cartShopBox=document.createElement('div');
cartShopBox.classList.add('cart-box');
var cartItems=document.getElementsByClassName('cart-content')[0]
var cartItemNames=cartItems.getElementsByClassName("cart-product-title");
for (var i = 0; i < cartItemNames.length; i++) {
    if(cartItemNames[i].innerHTML==title){
        alert("you have already add this iteam to cart");
        return;
    }
  
}



var cartBoxContent=`
            <img src="${productImg}" alt="" class="cart-img" />
              <div class="detail-box">
                <div class="cart-product-title">${title}</div>
                <div class="cart-price">${price}</div>
                <input
                  type="number"
                  name=""
                  id=""
                  value="1"
                  class="cart-quantity"
                  min="1"
                />
              </div>
              <i class="fa-solid fa-trash cart-remove"></i>
`;

cartShopBox.innerHTML=cartBoxContent;
cartItems.append(cartShopBox);
cartShopBox.getElementsByClassName('cart-remove')[0].addEventListener('click',removeCartIteam)
cartShopBox.getElementsByClassName('cart-quantity')[0].addEventListener('change',quantityChanged)
}




    
    





//  ********************* update total *********************** //
 function updatetotal(){
    var cartcontent=document.getElementsByClassName("cart-content")[0];
    var cartBoxes=cartcontent.getElementsByClassName("cart-box")
    var total=0;
    for(i=0;i<cartBoxes.length;i++){
        var cartBox=cartBoxes[i]
        var priceElement=cartBox.getElementsByClassName("cart-price")[0];
        var  quantityElement=cartBox.getElementsByClassName("cart-quantity")[0];
        var price=parseFloat(priceElement.innerText.replace("$",""));
        var quantity=quantityElement.value;
            total=total+(price*quantity);
        }
        document.getElementsByClassName("total-price")[0].innerText='$'+total;
    
 }