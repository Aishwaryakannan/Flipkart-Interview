(function (global, doc) {
    global.library = (function() {
        var currentUser, users = {}, books = {}, totalUsers = 0, totalBooks = 0;
        var user = function() {
            totalUsers += 1;
            this.id = totalUsers;
            this.booksOwned = [];
        }

        var book = function(author, owner) {
            totalBooks +=1;
            this.author = author;
            this.status = "available";
            this.borrower = [];
            this.owner = owner;
            this.id = totalBooks;
        }

        var createDom = function (innerVal, ele) {
            if(!innerVal) return;
            ele = document.createElement(ele);
            ele.innerHTML = innerVal;
            return ele;
        }

        var showTable = function(name) {
            currentUser = name;
            library.globalDOM.table = library.globalDOM.table || doc.querySelector('table');
            library.globalDOM.table.style.display = "table";

            library.globalDOM.newEntry = library.globalDOM.newEntry || doc.querySelector('#newEntry');
            library.globalDOM.newEntry.querySelector("#owner").innerText = currentUser;
            library.globalDOM.newEntry.querySelector("#id").innerText = 1;

            // Object.keys(books).forEach((book) => {
            //     console.log(book)
            // })
                
        }

        var changeTableAction = function(owner) {
            var actionCol = doc.querySelectorAll('.action');
            for (let i=0, len = actionCol.length; i<len; i++) {
                actionCol[i].innerHTML = getStatus()
            }

        }

        var addUser = function(name) {
            if (!library.validation.isString(name) || name === currentUser) return;

            if (!users[name]) {
                users[name] = new user(name);
                showTable(name);
            } 
            else {
                changeTableAction(name);
            }
            
        }

        var addBook = function(name, author) {
            if (!library.validation.isString(name)) return;

            if (!books[name]) {
                books[name] = new book(author, currentUser);
            }
            addBookToTable(books[name], name);
            
        }

        var getStatus = function(book) {
            var ele, naEntry = `<td>NA</td>`;

            if (book.status === 'available' && book.owner != currentUser) {
            ele = `${naEntry}<td class="action" data-name=${book.name}><button>Borrow</button></td>`; 
            } else if (book.status === 'borrowed') {
                ele= `<td>${book.borrower[0]}</td>`
                if (book.borrower.length === 2) {
                    ele= `<td class="action">Requested by ${book.borrower[1]}</td>`
                } else if (book.owner != currentUser){
                    ele= `<td class="action"><button>Request Next</button></td>`
                }
            } else {
                ele= `${naEntry}${naEntry}`;
            }

            return ele;
        }

        var addBookToTable = function(book, name) {
            var entry = `<td>${book.id + 1}</td>
                <td>${name}</td>
                <td>${book.author}</td>
                <td>${book.owner}</td>
                `;
            entry += getStatus(book);
            var ele = createDom(entry, 'tr');
            doc.querySelector('table').appendChild(ele);
        }
        
        return {
           addUser, addBook
           //getCurrentUser
            
        }
    })();

})(window, document);