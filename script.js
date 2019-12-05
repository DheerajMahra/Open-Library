class Book{
    static id = 0
    constructor(title, author){
        Book.id += 1
        this._id = Book.id
        this._title = title
        this._author = author
    }
    get bookId(){
        return this._id
    }
    get title(){
        return this._title
    }
    set title(title){
        this._title = title
    }
    get author(){
        return this._author
    }
    set author(author){
        this._author = author
    }
}

class Library{
    constructor(){
        this.books = []
    }
    addBook(title, author){
        this.books.push(new Book(title, author))
    }
    findBook(bookId){
        for(let bookObj of this.books){
            if(bookObj.bookId === bookId){
                return bookObj
            }
        } return false
    }
    removeBook(bookId){
        let book = this.findBook(bookId)
        if(book){
            let i
            for(i=0; i<this.books.length; i++){
                if(book.bookId === this.books[i].bookId)
                break
            } 
            this.books.splice(i, 1)
        }else{
            return
        }
    }
    refreshLibrary(){
        let bookContainer = document.getElementById('book-container')
        if(this.books.length === 0){
            bookContainer.innerHTML = '<i class="lead">No Books Available</i>'
        }else{
            bookContainer.innerHTML = ''
            for(let i=0; i<this.books.length; i++){
                const li = document.createElement('li')
                li.className = 'list-group-item text-center'
                li.innerHTML = `<span class="badge badge-pill badge-info float-left mt-1">#<span id="book-id">${this.books[i].bookId}</span></span>
                                <b>${this.books[i].title}</b> by <i>${this.books[i].author}</i>
                                <span class="float-right book-remove">&times;</span>`
                bookContainer.appendChild(li)
            }
        }
    }

}

const library = new Library()
library.refreshLibrary()

document.getElementById('book-add').addEventListener('click', function(){
    let bookTitle = document.getElementById('book-title').value
    let bookAuthor = document.getElementById('book-author').value   
    if(bookTitle && bookAuthor){
        error.style.display = 'none';
        //Add new book to the library
        library.addBook(bookTitle, bookAuthor)
        document.getElementById('book-title').value = '';
        document.getElementById('book-author').value = '';
        document.getElementById('book-title').focus()
        library.refreshLibrary()
    }else{
        error.style.display = 'block';
    }
})

document.getElementById('book-container').addEventListener('click', function(e){
    if(e.target.classList.contains('book-remove')){
        library.removeBook(parseInt(this.querySelector('#book-id').innerHTML))
        library.refreshLibrary()
    }else{
        return
    }
})





