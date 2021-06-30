// Products data
var Products = [{Id:"1", Category:"Office", Name:"Work Comfort", Price: 99.99, Pic:"/assets."},{Id:"2", Category:"Office", Name:"Royal Work", Price: 149.99, Pic:"/assets."},{Id:"3", Category:"Office", Name:"Space Chair", Price: 200, Pic:"/assets.Space Chair"},
                {Id:"4", Category:"Gaming", Name:"Game Chair", Price: 99.99, Pic:"/assets."},{Id:"5", Category:"Gaming", Name:"Ultra Comfort", Price: 149.99, Pic:"/assets."},{Id:"6", Category:"Gaming", Name:"Viper Seat", Price: 200, Pic:"/assets."},
                {Id:"7", Category:"Stool", Name:"Home Rest", Price: 99.99, Pic:"/assets."},{Id:"8", Category:"Stool", Name:"Decor Stool", Price: 149.99, Pic:"/assets."},{Id:"9", Category:"Stool", Name:"Seat Palace", Price: 200, Pic:"/assets."}];               

//Cart data
if (localStorage.getItem("cart") == null) {
    var Cart = []
} else {
    var cartStr = localStorage.getItem("cart")
    var Cart = JSON.parse(cartStr)
}
// Customers data
if (localStorage.getItem("customers") == null) {
    var Customers = []
} else {
    var customersStr = localStorage.getItem('customers')
    var Customers = JSON.parse(customersStr)
}

// Is customer loged in
var isLogin = localStorage.getItem('isLogin')

// Products page code
if (window.location.href.includes("products.html?")) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const category = urlParams.get("category")
    cartFrame.src = "cart.html"
    switch (category) {
        case "office": 
            for (i in Products){
                if (Products[i].Category == "Office"){
                    productsDisplay.innerHTML += `<div class="single-product"> 
                                                <h1>${Products[i].Name}</h1>
                                                <p>Price: ${Products[i].Price}$</p>
                                                <img src= "/assets/${Products[i].Name}.jpg" height="65%"; width="65%">
                                                <button id="${Products[i].Id}" class="atc-btn btn btn-dark">Add to cart  🛒</button> </div>`
                }
            }
            break;

        case "gaming": 
            for (i in Products) {
                if (Products[i].Category == "Gaming"){
                    productsDisplay.innerHTML += `<div class="single-product"> 
                                                <h1>${Products[i].Name}</h1>
                                                <p>Price: ${Products[i].Price}$</p>
                                                <img src= "/assets/${Products[i].Name}.jpg" height="65%"; width="65%";>
                                                <button Id="${Products[i].Id}" class="atc-btn btn btn-dark">Add to cart  🛒</button> </div>`
                }
            }
            break;

        case "stools": 
            for (i in Products){
                if (Products[i].Category == "Stool"){
                    productsDisplay.innerHTML += `<div class="single-product"> 
                                                <h1>${Products[i].Name}</h1>
                                                <p>Price: ${Products[i].Price}$</p>
                                                <img src= "/assets/${Products[i].Name}.jpg" height="65%"; width="65%";>
                                                <button Id="${Products[i].Id}" class="atc-btn btn btn-dark">Add to cart  🛒</button></div>`
                }
            }
            break;
    }
}

    // Add to cart
    var atcButtons = document.getElementsByClassName('atc-btn')
    for (i = 0; i < atcButtons.length; i++) {
        let btn = atcButtons[i]
        btn.addEventListener('click', atc) 
        btn.addEventListener('click', function() {cartFrame.src = "cart.html"})
            
    }
    
    // Add to cart event
    function atc(event) {
        if (localStorage.getItem("cart") == null) {
            var Cart = []
        } else {
            var cartStr = localStorage.getItem("cart")
            var Cart = JSON.parse(cartStr)
        }
        for (i in Cart) {
            if (event.target.id == Cart[i].ProductId) {
                Cart[i].Quantity++
                Cart[i].Price = parseInt(Products[Cart[i].ProductId-1].Price) + parseInt(Cart[i].Price)
                localStorage.setItem("cart", JSON.stringify(Cart))
                return
            }
        }
        Cart.push({Id:`${Cart.length+1}`, ProductId:`${event.target.id}`, ProductName:`${Products[event.target.id-1].Name}`, Quantity:"1", Price:`${Products[event.target.id-1].Price}`, CustomerId:""})
        localStorage.setItem("cart", JSON.stringify(Cart))
    }

// Cart page code
if (location.href.includes("cart.html")) {
    var sumPrice = 0
    if (Cart.length != 0) {
        cartShow.innerHTML =    `<tr class="cart-titles">
                                <th>Remove</th>
                                <th></th>
                                <th>Name</th>
                                <th></th>
                                <th>Quantity</th>
                                <th></th>
                                <th>Price</th>
                                </tr>`
        for (i in Cart) {
            cartShow.innerHTML +=   `<tr class="item-in-cart" id="${Cart[i].Id}">
                                    <td><input type="image" class="delete-btn" src="assets/x.jpg" id="${Cart[i].Id}"></td>
                                    <td><img class="image" src="assets/${Cart[i].ProductName}.jpg" width="50px" height="50px"></td>
                                    <td><span class="description">${Cart[i].ProductName}</span></td>
                                    <td><img class="minus-btn" src="assets/minus.png" id="${Cart[i].Id}"></td>
                                    <td><input class="quantity" value="${Cart[i].Quantity}" readonly></td>
                                    <td><img class="plus-btn" src="assets/plus.jpg" id="${Cart[i].Id}"></td>
                                    <td><span class="description">${Cart[i].Price}$</span></td>
                                    </tr>`

            sumPrice += parseInt(Cart[i].Price)
        }
        totalPrice.innerHTML += `${sumPrice}$`

        //Remove from Cart
        var removeButtons = document.getElementsByClassName('delete-btn')
        for (x = 0; x < removeButtons.length; x++) {
            let removeBtn = removeButtons[x]
            removeBtn.addEventListener('click', removeFromCart)
        }

        // Minus button in cart
        var minusButtons = document.getElementsByClassName('minus-btn')
        for (x = 0; x < minusButtons.length; x++) {
            let minus = minusButtons[x]
            minus.addEventListener('click', minusCart)
        } 

        // Plus button
        var plusButtons = document.getElementsByClassName('plus-btn')
        for (x = 0; x < plusButtons.length; x++) {
            let plusBtn = plusButtons[x]
            plusBtn.addEventListener('click', plusCart)  
        }

        // Clear cart
        var clearButtons = document.getElementsByClassName('clear-btn')
        for (x = 0; x < clearButtons.length; x++) {
            let clearBtn = clearButtons[x]
            clearBtn.addEventListener('click', clearCart)
        }
        
        // Check out button 
        var checkButtons = document.getElementsByClassName('check-btn')
        for (x = 0; x < checkButtons.length; x++) {
            let checkBtn = checkButtons[x]
            checkBtn.addEventListener('click', saveOrder)
            checkBtn.addEventListener('click', function() { window.open("http://127.0.0.1:5500/checkout.html")})
            
        }
    }
}      
           
// Remove from cart event
function removeFromCart(event) {
    let idToRemove = event.target.id
    for (i in Cart) {
        if (Cart[i].Id == idToRemove) {
            Cart.splice(i, 1)
            for (i in Cart) {
                Cart[i].Id = parseInt(i)+1
            }
            localStorage.setItem("cart", JSON.stringify(Cart))
            location.reload()
        }
    }
}

// Minus in cart
function minusCart(event) {
    let idToRemove = $(event.target).closest('tr').get(0).id ;
    for (i in Cart) {
        if (idToRemove == Cart[i].Id) {
            if (Cart[i].Quantity == 1) {
                removeFromCart(event)
                return
            }
            Cart[i].Quantity--
            Cart[i].Price = parseInt(Cart[i].Price) - parseInt(Products[Cart[i].ProductId-1].Price)
            localStorage.setItem("cart", JSON.stringify(Cart))
            location.reload()
        }
    }
}

// Plus in cart
function plusCart(event) {
    let idToRemove = event.target.id
    for (i in Cart) {
        if (idToRemove == Cart[i].Id) {
            Cart[i].Quantity++
            Cart[i].Price = parseInt(Cart[i].Price) + parseInt(Products[Cart[i].ProductId-1].Price)
            localStorage.setItem("cart", JSON.stringify(Cart))
            location.reload()
        }
    }
}

// Clear cart event
function clearCart() {
    let emptyCart = []
    localStorage.setItem("cart", JSON.stringify(emptyCart))
    location.reload()
}

// Check out
function saveOrder() {
     if(localStorage.getItem('isLogin') == true) {
         let customerId = localStorage.getItem("customerId")
         for (i in Customers) {
             if (Customers[i].Id == customerId) {
                 Customers[i].Orders = Cart
             }
         }
     }
}

// Modals
var logModal = document.getElementById('id01');
var signModal = document.getElementById('id02');
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == logModal) {
        logModal.style.display = "none";
    }
    if (event.target == signModal) {
        signModal.style.display = "none";
    }
}

// Login event
if (!location.href.includes("cart") && !location.href.includes('products')) {
    var submitLoginBtn = document.getElementsByName('submitLogin')
    submitLoginBtn[0].addEventListener('click', function() {
        for (i in Customers) {
            if (Customers[i].Name == unameLogin.value && Customers[i].Password == pswLogin.value)  {
                alert(`Nice to see you again ${Customers[i].Name}`)
                return
            } 
        }
        alert("Incorrect login details try again")
    })

    // Sign up event
    var submitSignBtn = document.getElementsByName('submitSign')
    submitSignBtn[0].addEventListener('click', function() {
        if (passSign.value == rePassSign.value){
            Customers.push({Id:`${Customers.length+1}`, Name:`${unameSign.value}`, Password:`${passSign.value}`, City:`${citySign.value}`, Phone:`${phoneSign.value}`, Orders:""})
            localStorage.setItem("customers", JSON.stringify(Customers))
            return
        }
        alert("Passwords not match")
    })
}



