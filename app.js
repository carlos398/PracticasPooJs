const _private = new WeakMap(); //nos ayuda a asignar el metodo set y get a nuestras clases


class Book {

    constructor(title, author, price) {
        // encerramos en una constante las propiedades que queremos manejar
        const properties = {
            _title: title,
            _author: author,
            _price: price,
        }
        // pasamos como parametro el this y el objeto en donde estan nuestros atributos
        // de esa forma podremos acceder a todos ellos mas rapido y limpio
        _private.set(this, {properties});
    }

    // obtiene el titulo de un libro
    get title(){
        return _private.get(this).properties['_title'];
    }

    // modifica o settea el titulo de un libro
    set title(newTitle){
        return _private.get(this).properties['_title'] = newTitle;
    }

    get author(){
        return _private.get(this).properties['_author'];
    }

    set author(newAuthor){
        return _private.get(this).properties['_author'] = newAuthor;
    }

    get price(){
        return _private.get(this).properties['_price'];
    }

    getAllData(){
        console.log(`titulo: ${this.title}, author: ${this.author}, price:${this.price}`)
    }

}

// herencia se maneja con el extends y el super
class Comic extends Book {
    // aqui en constructor pasamos los nombres de los atributos que usaremos
    constructor(title, author, price, illustrators) {
        // en super volvemos a pasarlos porque aca es donde se esta conectando con la clase anterior
        super(title, author, price);
        this.illustrators = illustrators;
    }

    addIllustrator(newIllustrator = [] ) {
        this.illustrators.push(newIllustrator)
    }

    getAllData(){
        super.getAllData();
        console.log(` illustrators: ${this.illustrators}`);
    }
}

class ShoppingCart {
    constructor() {
        this.products = [];
    }

    addProduct(amount, price) {
        // monto = cantidad
        this.products.push( ...Array(amount).fill(price) );
    }

    showProducts(){
        console.log(this.products);
    }

    calcTotal() {
        return this.products.map( price => price).reduce( (ac, price ) => ac + price, 0)
    }

    priceTicket(){
        console.log(`Total a pagar ${ this.calcTotal() }`)
    }

}



// Instacia de book
const book1 = new Book('1984' , 'G.O', 350);
book1.getAllData()
// si pasamos el valor se ejecuta el set y si lo enviamos sin
// se ejecuta el metodo get
// book1.title = 'mil novecientos ochenta y cuatro'
// console.log( book1.title)

const comic1 = new Comic('the Killing Joke', 'A.M', 150, ['B.B'])
comic1.getAllData()
// comic1.addIllustrator('J.H.')
// console.log(comic1.illustrators)

const cart = new ShoppingCart();
cart.addProduct(2, comic1.price);
cart.addProduct(1, book1.price);
cart.showProducts();
cart.priceTicket()