// helper function by Mrs. Terra T.
// takes object and sorts it based on values instead of keys
function _sortObjectByValues(obj) {
  const keys = Object.keys(obj);
  return keys.sort((keyA, keyB) => {
    if(obj[keyA]>obj[keyB]){
      return -1;
    } else if(obj[keyB]>obj[keyA]) {
      return 1;
    }
    return 0;
  })
}


//helper function by Stephen
function getTopFive(preSortedList) {
  //Create a new array that will be the Top Five list returned
  const theTopFive = [];

  //Loop through the first five entries of the array
  //Loop should end when it reaches five cycles or reaches end of the array
  //(Whichever comes first)
  for(let i = 0; i < preSortedList.length && i < 5; i++) {
    //Push the current object from the list into the array to be returned
    theTopFive.push(preSortedList[i]);
  }

  //Return the array, now sized for just the top five.
  return theTopFive;
}

function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) { 
  return books.reduce((acc, book) => {
  const booksBorrowed = book.borrows[0].returned;
  if (booksBorrowed === false) {
    acc++;
  }
  return acc;
}, 0);
}

function getMostCommonGenres(books) {
    const countObj = books.reduce((acc, {genre}) => {
      if (acc[genre]) {
        acc[genre]+=1;
      } else{
        acc[genre]=1;
      }
      return acc;
    }, {})
    let sortedKeys = _sortObjectByValues(countObj);
    let sorted = sortedKeys.map((key) => ({name: key, count: countObj[key]}));
    return getTopFive(sorted);
  }


function getMostPopularBooks(books) {
  const popularBooks =
    books.map((book) => 
  {return { name: book.title, count: book.borrows.length };})
  .sort(function (bookOne, bookTwo) {
        return bookTwo.count - bookOne.count;
      });
      return popularBooks.slice(0,5);
}

function getMostPopularAuthors(books, authors) {
  
  const authorList = books.reduce((acc, book) => { 
    const { authorId, borrows } = book;
    const authorObj = authors.find(author => author.id === authorId);
    const name = `${authorObj.name.first} ${authorObj.name.last}`;
    const count = borrows.length;
    const author = acc.find(author => author.name === name);
    if(author) {
      author.count += count;
    } else {
      const newAuthor = {
        name,
        count
      };
      acc.push(newAuthor);
    }
    return acc;
  }, []);
  const sortedAuthors = authorList.sort((authOne, authTwo) => authTwo.count - authOne.count);
  const topFive = getTopFive(sortedAuthors);
  return topFive;
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
