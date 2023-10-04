/*
  get comments add to ul on load
  create comment function adds to ul
*/
const getComments = async () => {
  const response = await fetch("/comments");
  const { comments } = await response.json();
  console.log("comments", comments);
  const ul = document.querySelector("ul");

  for (const comment of comments) {
    const li = document.createElement("li");
    li.innerText = comment;
    ul.appendChild(li);
  }
};

const createComment = async () => {
  const form = document.querySelector("form");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const input = document.getElementById("comment");

    const response = await fetch("/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ comment: input.value }),
    });

    const { comment } = await response.json();

    const ul = document.querySelector("ul");

    const li = document.createElement("li");
    li.innerText = comment;
    ul.appendChild(li);
  });
};

const initializePage = async () => {
  await getComments(); // async
  await createComment();
};

window.onload = initializePage;
