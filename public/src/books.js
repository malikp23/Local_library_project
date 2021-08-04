function findAuthorById(authors, id) {
  return authors.find((theAuthors) => theAuthors.id === id);
}

function findBookById(books, id) {
  return books.find((theBooks) => theBooks.id === id);
}

function partitionBooksByBorrowedStatus(books) {
  return books.reduce((book1,book2) => {book1[+(book2.borrows[0] && book2.borrows[0].returned)].push(book2); return book1},[[],[]])
}

function getBorrowersForBook(book, accounts) {
  let result = [];
  let {borrows} = book;
  borrows.forEach(borrow=> {
    let account = accounts.find(acc => acc.id === borrow.id);
    account['returned'] = borrow.returned;
    result.push(account);
  });
  return result.slice(0,10) 
}
function getTotalBooksCount(books) {
  return books.length
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
