function findAccountById(accounts, id) {
  return findIt = accounts.find((theAccount) => theAccount.id === id)
}

function sortAccountsByLastName(accounts) {
 return accounts.sort((account1, account2) =>
  account1.name.last.toLowerCase() > account2.name.last.toLowerCase() ? 1:-1);
}

function getTotalNumberOfBorrows(account, books) { 
  const {id: accountId} = account;
  return books.reduce((acc, book) => {
    return (
      acc +
      book.borrows
        .filter(borrow => borrow.id === accountId)
        .reduce((accountBorrows) => accountBorrows+ 1, 0)
    )
  }, 0);
};

function getBooksPossessedByAccount(account, books, authors) {
  let checkedOut = books.filter(({borrows}) => {
    return borrows.some((borrow) => borrow.id === account.id && borrow.returned === false)
  });

  let checkedOutBooks = checkedOut.map(book => {let author = authors.find(author => book.authorId === author.id); return {author, ...book}})
 return checkedOutBooks
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
