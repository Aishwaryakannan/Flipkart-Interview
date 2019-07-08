(function (doc, library) {

    // To save the DOMs during first traversal
    library.globalDOM = library.globalDOM || {};

    doc.querySelector('#user button').addEventListener('click', function (e) {
        library.globalDOM.userInput = library.globalDOM.userInput || this.parentElement.querySelector('input');
        library.addUser(library.globalDOM.userInput.value);
        
    });

    doc.querySelector('#addBook').addEventListener('click', function (e) {
        var newEntry = library.globalDOM.newEntry;
        library.addBook(newEntry.querySelector('#title').value, newEntry.querySelector('#author').value);
        
    });

})(document, window.library || {})