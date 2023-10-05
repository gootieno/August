import { resetScore } from "./score.js";
import { resetComments } from "./comments.js";

export const createMainContent = async () => {
  // Create h1
  const h1 = document.createElement("h1");
  h1.innerText = "Catstagram";

  // Create img
  const img = document.createElement("img");
  img.style.margin = "20px";
  img.style.maxWidth = "750px";

  const newKittenBtn = createNewKittenBtn();

  const container = document.querySelector(".container");

  let kittenImg = localStorage.getItem("kittenImage");
  if (kittenImg) img.src = kittenImg;
  else {
    kittenImg = await fetchImage();
    img.src = kittenImg;
  }
  container.appendChild(h1);
  container.append(newKittenBtn);
  container.appendChild(img);
};

const fetchImage = async () => {
  // Fetch image from API and set img url
  try {
    const kittenResponse = await fetch(
      "https://api.thecatapi.com/v1/images/search?size=small"
    );
    // Converts to JSON
    const kittenData = await kittenResponse.json();
    console.log("kitten data ", kittenData);
    const kittenImgUrl = kittenData[0].url;
    // const kittenImg = document.querySelector("img");
    // kittenImg.src = kittenImgUrl;
    localStorage.setItem("kittenImage", kittenImgUrl);
    return kittenImgUrl;
    // After the image is finished loading, reset the score and comments
    // kittenImg.addEventListener('load', () => {
    //     resetScore();
    //     resetComments();
    // });
  } catch (e) {
    console.log("Failed to fetch image", e);
  }
};

const createNewKittenBtn = () => {
  // Create "New Kitten" button
  const newKittenBtn = document.createElement("button");
  newKittenBtn.id = "new-kitten";
  newKittenBtn.innerText = "New Kitten";
  newKittenBtn.addEventListener("click", async () => {
    const kittenImg = document.querySelector("img");
    const kittenImgUrl = await fetchImage();
    kittenImg.src = kittenImgUrl;

    // resetting in here
  });
  return newKittenBtn;
};
