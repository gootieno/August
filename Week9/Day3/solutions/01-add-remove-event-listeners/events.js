// Your code here
window.addEventListener("DOMContentLoaded", () => {
  // alert('DOM has loaded!')

  const redInput = document.getElementById("red-input");
  const changeRed = () => {
    if (redInput.value.toLowerCase().includes("red")) {
      redInput.style.backgroundColor = "red";
    } else {
      redInput.style.backgroundColor = "transparent";
    }
  };

  redInput.addEventListener("input", changeRed);

  /*
    select add item
    select list add element
    select ul
    listen for add item click
    get list add value
    create li
    set li inner text to list add val
    append li to ul
  */
  const addItem = document.getElementById("add-item");
  const list = document.getElementById("list-add");
  const listContainer = document.querySelector("#section-2 > ul");

  const createList = () => {
    const value = list.value;
    const li = document.createElement("li");
    li.innerText = value;
    listContainer.appendChild(li);
    list.value = "";
  };

  addItem.addEventListener("click", createList);

  const colorSelectSection = document.getElementById("section-3");
  const colorSelect = document.getElementById("color-select");

  const changeBackground = (event) => {
    console.log("event ", event);
    console.log("event target ", event.target);
    colorSelectSection.style.backgroundColor = event.target.value;
  }

  colorSelect.addEventListener("change", changeBackground);

  const removeEventsButton = document.getElementById('remove-listeners')
  removeEventsButton.addEventListener('click', () => {
    redInput.removeEventListener("input", changeRed);
    addItem.removeEventListener("click", createList);
    colorSelect.removeEventListener("change", changeBackground);
  })
});
