const theExpress = require('express');
const theApp = theExpress();
const thePort = theApp.listen(9000);
// for parsing form data
// will need to install this: https://www.npmjs.com/package/body-parser
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({
  extended: true
});
theApp.use(urlencodedParser);
// templating
theApp.set('view engine', 'ejs');
// static files in viewer
theApp.use(theExpress.static('viewer'));

// create globl empty arrays
var allTheBookData = [];
var allTheUserData = [];
var theData;

// adds books to wishlist 
theApp.post('/addToWishlist', function(req, res) {
	// checking if the book selected is a duplicate 
	var title = req.body.bookTitle;
	var isInvalid = false;

	// if the user didn't add to wishlist but wants to check it
	if(title === undefined)
	{
		isInvalid = true;
	}
	// if the book is a duplicate
	for(var i = 0; i < allTheBookData.length; i++)
	{
		if(allTheBookData[i].title === title)
		{
			isInvalid = true; 
		}
	}
	// if the input is invalid (or doesn't exist)
	if(!isInvalid)
	{
		// creating new object if the object is valid 
		var bookData = {
			img: req.body.bookImg,
			title: req.body.bookTitle,
			authors: req.body.bookAuthor,
			pubDate: req.body.bookPubDate,
			isbn: req.body.bookISBN,
			avgRating: req.body.bookAvgRating,
			pageCount: req.body.bookPageCount
		}

		allTheBookData.push(bookData);
 		theData = new Object();
		// put data into a the global array.
		theData.allTheBookData = allTheBookData;
 		console.log(theData);
	}
	else {
		console.log("isInvalid: " + isInvalid);
		theData.allTheBookData = allTheBookData;
 		console.log(theData);
	}
 	
 	// package array into an object to pass into template
 	res.render('wishlist.ejs', theData);
});

// removing book from the wishlist
theApp.post('/removeBook', function(req, res) {
	var title = req.body.removeTitle;
	var index;
	for(var i = 0; i < allTheBookData.length; i++)
	{
		if(allTheBookData[i].title === title)
		{
			index = i;
			console.log("index to be removed: " + index);
		}
	}
	// splice the to be removed book data from the array
 	allTheBookData.splice(index, 1);
 	// package array into an object to pass into template
 	res.render('wishlist.ejs', theData);
});

// stores the user data and renders to the search.ejs page
theApp.post('/searchForBooks', function(req, res) {
	var userData = {
		speed: req.body.readingSpeed,
		time: req.body.readingTime,
		date: req.body.startDate
	};
 	allTheUserData.push(userData);
 	theData = new Object();
	// put data into a the global array.
 	theData.allTheUserData = allTheUserData;
 	console.log(theData);
 	// package array into an object to pass into template
 	res.render('search.ejs', theData);
});

// goes back to search w/o actually storing a new object
theApp.post('/backToSearch', function(req, res) {
 	theData = new Object();
	// put data into a the global array.
 	theData.allTheUserData = allTheUserData;
 	console.log(theData);
 	// package array into an object to pass into template
 	res.render('search.ejs', theData);
});

// passes data into timetable.ejs
theApp.post('/timetable', function(req, res) {
	// allTheUserData.push(userData);
	theData = new Object();
	theData.allTheBookData = allTheBookData;
	theData.allTheUserData = allTheUserData;
	// console.log(theData);
	res.render('timetable.ejs', theData);
});

// access the local port + serve the site at that url
theApp.listen(thePort, function() {
  console.log('App listening on port 9000!')
});
