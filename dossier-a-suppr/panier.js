function saveBasket(basket){    
    localStorage.setItem("basket", JSON.stringify(basket)); //creation d'un item
    //JSON.stringify : fait passer une donnée complexe en une chaine de caractère
}

function getBasket(){   //recuperer un item du localStorage
    let basket = localStorage.getItem("basket");    //stokage dans la variable basket de la clé
    if(basket == null){
        return [];  //si la variable basket n'a pas de clé, alors afficher un tableau vide
    } else {
        return JSON.parse(basket);  //utiliser 'parse' pour traduire 
    }
}

function addBasket(product){
    let basket = getBasket();
    let foundProduct = basket.find(p => p.id == product.id);
    if(foundProduct != undefined){
        foundProduct.quantity++;
    } else {    //si l'item existe pas alors il faut l'ajouter
        product.quantity = 1;
        basket.push(product); //ajout du produit dans le tableau
    }
    saveBasket(basket);
}

function removeFromBasket(product){
    let basket = getBasket();
    basket = basket.filter(p => p.id != product.id);
    saveBasket(basket);
}

function changeQuantity(product, quantity){
    let basket = getBasket();
    let foundProduct = basket.find(p => p.id == product.id);
    if(foundProduct != undefined){
        foundProduct.quantity += quantity;
        if(foundProduct.quantity <= 0){
            removeFromBasket(foundProduct);
        } else {
            saveBasket(basket);
        }
    }
}

function getNumberProduct(){
    let basket = getBasket();
    let number = 0;
    for(let product of basket){
        number += product.quantity;
    }
    return number;
}

function getTotalPrice(){
    let basket = getBasket();
    let total = 0;
    for(let product of basket){
        total += product.quantity * product.price;
    }
    return total;
}