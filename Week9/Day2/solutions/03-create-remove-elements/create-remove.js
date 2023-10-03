/****************************** ADD DOG BUTTON ******************************/
const add = document.getElementById("add");
add.addEventListener("click", async () => {
  try {
    const res = await fetch("https://dog.ceo/api/breeds/image/random");
    const data = await res.json();

    const url = data.message; // URL of new dog image
    console.log("url ", url);

    const urlParts = url.split("/");
    console.log("url parts ", urlParts);

    const breed = urlParts[4];
    console.log("breed ", breed);
    /*--------------- Get breed (Hint: Parse from URL) ---------------- */
    // Your code here

    /*------------ Create new dog card with the url above ------------- */
    /* (use the HTML structure for the current dog image in the index.html
            file to create a new image with the url) */
    // Your code here

    /* Add the new dog card as a child to the ul in the .gallery element 
    
    <li>
        <figure>
            <img src="https://images.dog.ceo/breeds/hound-afghan/n02088094_1007.jpg" />
            <figcaption>hound-afghan</figcaption>
        </figure>
    </li>
    */
    // Your code here

    /*
        1. create elements
        2. give elements attributes/text value 
        3. append the element to the dom
    */

    const dogsListContainer = document.querySelector(".gallery > ul");
    const listItem = document.createElement("li");
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    const figCaption = document.createElement("figcaption");

    img.setAttribute("src", url);
    figCaption.innerText = breed;
    // listItem.style.border = '2px solid red'
    listItem.classList.add("hover");

    figure.append(img, figCaption);
    listItem.appendChild(figure);

    console.log(listItem);
    dogsListContainer.appendChild(listItem);
  } catch (e) {
    console.log("Couldn't fetch dog :(");
  }
});

const darkModeButton = document.querySelector("#dark-mode");
darkModeButton.addEventListener("click", () => {
    console.log(document.body.classList)
  if (document.body.className.includes("dark-mode")) {
    document.body.classList.remove("dark-mode");
  } else {
    document.body.classList.add("dark-mode");
  }
});

/************************** REMOVE FIRST DOG BUTTON **************************/
const removeFirst = document.getElementById("remove-first");
removeFirst.addEventListener("click", () => {
  /*-------------------- Select the first dog card --------------------- */
  // Your code here
  /*-------------------- Remove the first dog card --------------------- */
  // Your code here

  document.querySelector("ul").firstElementChild?.remove();
});

/************************** REMOVE LAST DOG BUTTON ***************************/
const removeLast = document.getElementById("remove-last");
removeLast.addEventListener("click", () => {
  /*-------------------- Select the last dog card ----------------------- */
  // Your code here
  /*-------------------- Remove the last dog card ----------------------- */
  // Your code here
  document
    .querySelectorAll("li")
    [document.querySelectorAll("li").length - 1]?.remove();
});
