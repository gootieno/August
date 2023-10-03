export default () => {
  const bodyChildElements = document.body.children; // HTMLCollection [div]
  console.log("body child elements ", bodyChildElements);

  const div = bodyChildElements[0];

  const divChildElements = Array.from(div.children); // HTMLCollection [span]
  // const divChildElements = div.children; // HTMLCollection [span]
  console.log("div child elements ", Array.from(divChildElements));

  for (let i = 0; i < divChildElements.length; i++) {
    const span = document.createElement("span");
    span.innerText = i + 1;
    div.appendChild(span);

    // if (i === 100) break;
  }

  const helloWorld = div.innerText; // Hello World! Yes!    <-- NOT Hello World!
  console.log("div inner text ", helloWorld);
  const span = divChildElements[0]; // <span>Yes!</span>
  // debugger
};
