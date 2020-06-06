class Book { 
    constructor(title, author, pages, read, hidden) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
        this.hidden = hidden;
    }
}

var book1 = new Book("Fahrenheit 451", "Ray Bradbury", 227, "Unread", false);
var book2 = new Book("To Kill A Mockingbird", "Harper Lee", 309, "Read", false);
var book3 = new Book("Moby Dick", "Herman Melville", 720, "Unread", false);
let myLibrary = [book1, book2, book3];

addBookToggle.addEventListener("click", ()=> {
    var x = document.querySelector('#newBook');
    if (x.style.display == 'block') {
        x.style.display = 'none';
    } else {
        x.style.display = 'block';
    }
})

formSubmit.addEventListener("click", ()=> {    
    const formTitle = document.querySelector('#title').value;
    const formAuthor = document.querySelector('#author').value;
    const formPages = document.querySelector('#pages').value;
    const formRead = document.querySelector('input[name=read]:checked').value;

    if (formTitle != "" && formAuthor != "" && formPages != "" && formRead != "") {
    var nextbook = new Book(formTitle, formAuthor, formPages, formRead, false);
    myLibrary.push(nextbook);
    render();
    
    document.querySelector('#title').value = "";
    document.querySelector('#author').value = "";
    document.querySelector('#pages').value = "";
    document.querySelector('input[name=read]:checked').checked = false;
    }
})

function changeReadStatus(details) {
    const bookNum = parseInt(details.target.parentNode.getAttribute("id"));

    if (myLibrary[bookNum].read == "Read") {
        myLibrary[bookNum].read = "Unread";
    }
    else {
        myLibrary[bookNum].read = "Read";
    }
    render();
}

function deleteBook(details) {
    const bookNum = parseInt(details.target.parentNode.getAttribute("id"));

    if (myLibrary[bookNum].hidden == false) {
        myLibrary[bookNum].hidden = true;
    }
    else {
        myLibrary[bookNum].read = false;
    }
    render();
}

function render() {
    const bookArray = document.querySelector('#bookArray');
    bookArray.innerHTML = '';
    for (let i = 0; i < myLibrary.length; i++) {
        
        const newBookDiv = document.createElement("div");
        newBookDiv.setAttribute("class", "bookDiv");
        newBookDiv.setAttribute("data-numbook", i);
        newBookDiv.setAttribute("id", i);
        bookArray.appendChild(newBookDiv);

        for (key in myLibrary[i]) {
            if (myLibrary[i]['hidden'] == false ) {
                if (key == 'title' || key == 'author' || key == 'pages') {
                    const addElement = document.createElement("il");
                    const textNode = document.createTextNode(myLibrary[i][key]);
                    addElement.appendChild(textNode);
                    document.getElementById(i).appendChild(addElement);
                }
                else if (key == 'read') {
                    const addElement = document.createElement("button");
                    const textNode = document.createTextNode(myLibrary[i][key]);
                    addElement.appendChild(textNode);
                    addElement.addEventListener('click', changeReadStatus);
                    document.getElementById(i).appendChild(addElement);
                }
                else {
                    const addElement = document.createElement("button");
                    const textNode = document.createTextNode("Delete");
                    addElement.appendChild(textNode);
                    addElement.addEventListener('click', deleteBook);
                    document.getElementById(i).appendChild(addElement);
                }
            }
        }
    }
}

render();