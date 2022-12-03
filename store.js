if(document.readyState =='loading'){
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}
// A code that ensure our ducment is loaded before having to access the different part of it.

function ready(){ 
    var removeCartItemButtons = document.getElementsByClassName('btn-danger')
console.log(removeCartItemButtons)
        for(var i=0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)    
        }
        var quantityInputs = document.getElementsByClassName('cart-quantity-input')
        for(var i=0; i < quantityInputs.length; i++) {
            var input = quantityInputs[i]
            input.addEventListener('change', quantityChanged)
        }
        var addToCartButtons = document.getElementsByClassName("btn-cart")
        for(var i=0; i < addToCartButtons.length; i++) {
            var button =addToCartButtons[i]
            button.addEventListener('click', addToCartClick)
        }
        document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
            //All of the event listeners for all of the items that are already loaded into the document at beginning of the load
        }


function removeCartItem(event){
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
    //This code removes the element withing the cart when clicked and updates the cart price.
}

function quantityChanged(event){
    var input=event.target
    if(isNaN(input.value)|| input.value<=0){
        input.value=1
    }
    updateCartTotal()
    //This code allows the input number to change while clicking and  does not let the input be less 1. Then updates the cart total price.
}

function addToCartClick(event){
    var button=event.target
    var product = button.parentElement.parentElement.parentElement
    var title = product.getElementsByClassName("product-name")[0].innerText
    var price = product.getElementsByClassName('product-price')[0].innerText
    var imageSrc= product.getElementsByClassName('imgg')[0].src
    console.log(title, price, imageSrc)
   addItemToCart(title, price,imageSrc)
    updateCartTotal()
//This is the code that logs the product items to the console once you click on the "Add to cart button" it logs info like (Title,Price,Image), while updating the cart total price.

}
function addItemToCart(title, price, imageSrc){
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartItems =document.getElementsByClassName('cart-items')[0]
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    for(var i=0;i<cartItemNames.length; i++){
        if(cartItemNames[i].innerText==title){
            alert('This item is already added to your wishilist')
            return
        }
    }
    var cartRowContents =`
            <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
            <span class="cart-item-title"> ${title} </span>
        </div>

        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quatity cart-column">  
        <input class= "cart-quantity-input" type="number" value="1">
        <button class="btn-cart btn-danger cart-quantity-button" role="button">REMOVE</button>
        </div>`
        cartRow.innerHTML=cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click',removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)

    //This is the code that creates the product within the cart, a model is given in 'cartrowContents", everytime an item is added to the the cart it follows this model, specifying size, height, width of the object, while updating the cart total price. 
}


function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0
    for(var i=0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement= cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price = parseFloat(priceElement.innerText.replace('$', ''))
        var quantity = quantityElement.value
        total = total + (price * quantity)
    }
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total
    
     //This is the code that does the calculations needed to update the cart, which involves calculating the number of rows, multiplying in each row the quantity of items by the price of that item and returning the toal of all rows to the Total Element with a "$" in front. 
    //This is an add on feature that was not required but i prefered to do. 
}

function purchaseClicked(){
    alert('Thank You For Your Purchase. We Will be Sending You A Confirmation Email Shortly. We Appreciate Your Business')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    while(cartItems.hasChildNodes()){
        cartItems.removeChild(cartItems.firstChild)
}
updateCartTotal()
//This is the code that allows an event to occur when yoy wish to purchase the items in your wishlist. Once clicked on it prompts a message as an alert to the user. Then it removes every child item within the "cart-tems" and retruns the cart total to zero
}

<!-- -->
