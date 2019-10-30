// getting todays date for the input in the start page
// https://stackoverflow.com/questions/1531093/how-do-i-get-the-current-date-in-javascript
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = yyyy + "-" + mm + "-" + dd;
document.getElementById("startDate").setAttribute("min", today);
document.getElementById("startDate").setAttribute("value", today);



// scrolling to the about div
function toAbout()
{
	document.getElementById("read-more").scrollIntoView({behavior: 'smooth'});
}


// Code: https://codepen.io/jrms999/pen/gvOXxe
function bookSearch() 
{
	// storing user input into search
	var searchInput = document.getElementById("searchbar").value;
	searchInput = searchInput.split(" ").join("+");
	// clearing any previous search data
	document.getElementById("results").innerHTML = ""; 

	$.ajax ({
		url: "https://www.googleapis.com/books/v1/volumes?q=" + searchInput,
		dataType: "json",
		type: 'GET',
		success: function(data) {
			for(var i = 0; i < data.items.length; i++)
			{
				// storing the current book's volumne info from Google Books API
				var jdata = data.items[i];
				// creating new elements 
				var divVolumeInfo = document.createElement('div'); // entire div
				var divP = document.createElement('div'); // book info div
				var imgThumbnail = document.createElement('img'); // thumbnail
				var h4Title = document.createElement('h4'); // title
				var pAuthor = document.createElement('p'); // author
				var pPublishedDate = document.createElement('p'); // published date
				var pISBN = document.createElement('p'); // isbn
				var pAverageRating = document.createElement('p'); // average rating
				var pRatingsCount = document.createElement('p'); // number of raings 
					// storing the data
		        imgThumbnail.src = jdata.volumeInfo.imageLinks.thumbnail;  
				h4Title.innerText = jdata.volumeInfo.title; 
				pAuthor.innerText = "Author(s): " + jdata.volumeInfo.authors;
				pPublishedDate.innerText = "Date Published: " + jdata.volumeInfo.publishedDate;
				pISBN.innerText = "ISBN: " + jdata.volumeInfo.industryIdentifiers[0].identifier;
				pAverageRating.innerText = "Average Rating: " + jdata.volumeInfo.averageRating;
				pRatingsCount.innerText = "Number of Ratings: " + jdata.volumeInfo.ratingsCount;

				// creating the Add to Wishlist Form
					// sends book info to wishlist
				var addToWishlistForm = document.createElement('form'); // adds to the wishlist
				addToWishlistForm.setAttribute('method',"POST");
				addToWishlistForm.setAttribute('action',"/addToWishlist");
				// hidden input holding img link
				var bookImg = document.createElement("input"); //input element, hidden button
				bookImg.setAttribute('type',"hidden");
				bookImg.setAttribute('name',"bookImg");
				bookImg.value = jdata.volumeInfo.imageLinks.thumbnail;
				addToWishlistForm.appendChild(bookImg);
				// hidden input holding title 
				var bookTitle = document.createElement("input"); //input element, hidden button
				bookTitle.setAttribute('type',"hidden");
				bookTitle.setAttribute('name',"bookTitle");
				bookTitle.value = jdata.volumeInfo.title;
				addToWishlistForm.appendChild(bookTitle);
				// hidden input holding author
				var bookAuthor = document.createElement("input"); //input element, hidden button
				bookAuthor.setAttribute('type',"hidden");
				bookAuthor.setAttribute('name',"bookAuthor");
				bookAuthor.value = jdata.volumeInfo.authors;
				addToWishlistForm.appendChild(bookAuthor);
				// hidden input holding published date
				var bookPubDate = document.createElement("input"); //input element, hidden button
				bookPubDate.setAttribute('type',"hidden");
				bookPubDate.setAttribute('name',"bookPubDate");
				bookPubDate.value = jdata.volumeInfo.publishedDate;
				addToWishlistForm.appendChild(bookPubDate);
				// hidden input holding isbn
				var bookISBN = document.createElement("input"); //input element, hidden button
				bookISBN.setAttribute('type',"hidden");
				bookISBN.setAttribute('name',"bookISBN");
				bookISBN.value = jdata.volumeInfo.industryIdentifiers[0].identifier;;
				addToWishlistForm.appendChild(bookISBN);
				// hidden input holding average rating
				var bookAvgRating = document.createElement("input"); //input element, hidden button
				bookAvgRating.setAttribute('type',"hidden");
				bookAvgRating.setAttribute('name',"bookAvgRating");
				bookAvgRating.value = jdata.volumeInfo.averageRating;
				addToWishlistForm.appendChild(bookAvgRating);
				// hidden input holding page count
				var pageCount = document.createElement("input"); //input element, hidden button
				pageCount.setAttribute('type',"hidden");
				pageCount.setAttribute('name',"bookPageCount");
				pageCount.value = jdata.volumeInfo.pageCount;
				addToWishlistForm.appendChild(pageCount);
				// visible submit button
				var addButton = document.createElement("input"); //input element, submit button
				addButton.setAttribute('type',"submit");
				addButton.setAttribute('value',"Add to Wishlist");
				addToWishlistForm.appendChild(addButton);

				// setting class to the divs
				imgThumbnail.className = "one-edge-shadow";
				divVolumeInfo.className = "volInfo";
				divVolumeInfo.className = "pVolInfo";
				// apending to divP
				divP.appendChild(h4Title);
				divP.appendChild(pAuthor);
				divP.appendChild(pPublishedDate);
				divP.appendChild(pISBN);
				divP.appendChild(pAverageRating);
				// divP.appendChild(pRatingsCount);
				divP.appendChild(addToWishlistForm);
				// appending to divVolumeInfo
				divVolumeInfo.appendChild(imgThumbnail);
				divVolumeInfo.appendChild(divP);
				
				// appending to result to display it
				var results = document.getElementById("results");
				results.appendChild(divVolumeInfo);	
			}; //end of for loop
		}, // end of success function(data)
	}); 



	document.getElementById("results").style.display = 'block';
	document.getElementById("results").scrollIntoView({behavior: 'smooth'});
	
	return false;
};

// how to dynamically create a form
// https://stackoverflow.com/questions/6964927/how-to-create-a-form-dynamically-via-javascript
// setting the value of an input 
// https://stackoverflow.com/questions/5700471/set-value-of-input-using-javascript-function
// making an inpute hidden
// https://stackoverflow.com/questions/18674912/difference-between-inputtype-hidden-and-visibility-hidden