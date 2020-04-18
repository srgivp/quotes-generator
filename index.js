let quote;
let author;
let twitterURL;
const cleanText = () => {
  $("#text, #author, #buttons").fadeOut();
};
const newQuote = () => {
  setTimeout(() => {
    fetch("https://qvoca-bestquotes-v1.p.rapidapi.com/quote", {
      method: "GET",
      headers: {
        "x-rapidapi-host": "qvoca-bestquotes-v1.p.rapidapi.com",
        "x-rapidapi-key": "1c37db0c69msh8d0f715737e2e48p11bd10jsn427ebeaaf136"
      }
    })
      .then(
        response => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Request failed!");
        },
        networkError => {
          console.log(networkError.message);
          (document.getElementById("text").innerHTML = networkError.message),
            $("#text").fadeIn(1500);
        }
      )
      .then(jsonResponse => {
        quote = jsonResponse["message"];
        author = jsonResponse["author"];
        twitterURL =
          "https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=" +
          encodeURIComponent('"' + quote + '" ' + author);
        $("#tweet-quote").attr("href", twitterURL);
        (document.getElementById("text").innerHTML = quote),
          $("#text").fadeIn(1500);
        document.getElementById("author").innerHTML = author;
        $("#author").fadeIn(2500);
        //making font size adjustable
        let maxHeight = document.getElementById("main").offsetHeight * 0.7;
        console.log("maxHeight ", maxHeight);
        let textHeight = document.getElementById("text").offsetHeight;
        let authorHeight = document.getElementById("author").offsetHeight;
        let quoteHeight = textHeight + authorHeight;
        let fontSizes = ["300%", "250%", "200%", "150%", "100%", "50%", "25%"];
        let i = 0;
        do {
          if (i < fontSizes.length - 1) {
            document.getElementById("text").style.fontSize = fontSizes[i];
            document.getElementById("author").style.fontSize = fontSizes[i + 1];
            textHeight = document.getElementById("text").offsetHeight;
            authorHeight = document.getElementById("author").offsetHeight;
            quoteHeight = textHeight + authorHeight;
            console.log("quoteHeight ", quoteHeight);
            i = i + 1;
          }
        } while (quoteHeight > maxHeight);
        setTimeout(() => {
          $("#buttons").fadeIn(3000);
        }, 50);
      })
      .catch(err => {
        console.log(err);
        (document.getElementById("text").innerHTML = err),
          $("#text").fadeIn(1500);
      });
  }, 100);
};
// an alternative way with XHR
/*const xhr = new XMLHttpRequest();
  const url = "https://qvoca-bestquotes-v1.p.rapidapi.com/quote";
  xhr.responseType = "json";
  xhr.addEventListener("readystatechange", () => {
    if (this.readyState === this.DONE) {
      quote = xhr.response["message"];
      author = xhr.response["author"];
      twitterURL =
        "https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=" +
        encodeURIComponent('"' + quote + '" ' + author);
      $("#tweet-quote").attr("href", twitterURL);
      (document.getElementById("text").innerHTML = quote),
        $("#text").fadeIn(1500);
      document.getElementById("author").innerHTML = author;
      $("#author").fadeIn(2500);
      setTimeout(() => {
        $("#buttons").fadeIn(3000);
      }, 50);
    }
  });
  xhr.open("GET", url);
  xhr.setRequestHeader("x-rapidapi-host", "qvoca-bestquotes-v1.p.rapidapi.com");
  xhr.setRequestHeader(
    "x-rapidapi-key",
    "1c37db0c69msh8d0f715737e2e48p11bd10jsn427ebeaaf136"
  );
  xhr.send();*/
