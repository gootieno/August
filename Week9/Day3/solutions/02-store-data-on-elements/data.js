// Your code here
window.addEventListener("DOMContentLoaded", () => {
  const add = document.querySelector("#add");
  const ul = document.getElementById("shopping-list");
  const name = document.getElementById("name");
  const type = document.getElementById("type");
  add.addEventListener("click", (event) => {
    event.preventDefault();
    /*
        get info from the input
        add that info to an li
        display that li
        */
    const li = document.createElement("li");
    li.setAttribute("data-type", type.value);
    li.innerText = name.value;
    ul.append(li);
    name.value = "";
  });
});
