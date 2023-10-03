const select = () => {
  /* Write queries for each of the following */

  /* Section 1 */
  // 1. Get all seeded fruit elements
  // Your code here
  const seededFruits = document.getElementsByClassName("seed");
  console.log("seeded fruits ", seededFruits);
  // 2. Get all seedless fruit elements
  // Your code here
  const seedless = document.querySelectorAll(".seedless");
  console.log("seedless ", seedless);
  // 3. Get first seedless fruit element
  // Your code here
  console.log("first seedless fruit ", seedless[0]);
  /* Section 2 */
  // 4. Get inner span with text "you"
  // Your code here
  const innerSpan = document.querySelector("span").innerText;
  console.log("inner span ", innerSpan);
  // 5. Get all children of element "wrapper"
  // Your code here
  const wrapper = document.getElementById("wrapper");
  const wrapped = wrapper.children;
  console.log("wrapped ", wrapped);
  //   console.log("inner ", inner);
  // 6. Get all odd number list items in the list
  // Your code here
  console.log("odd list items ", document.getElementsByClassName("odd"));
  // 7. Get all even number list items in the list
  // Your code here
  console.log(
    "even list items ",
    document.querySelector("ol").querySelectorAll(":not([class])")
    // document.querySelectorAll("ol > li:not([class])")
  );
  /* Section 3 */
  // 8. Get all tech companies without a class name
  // Your code here
  const tech = document.querySelectorAll("#three > p > a:not([class])");
  console.log("tech companies ", tech);

  const arr = [];
  tech.forEach((company) => arr.push(company.innerText));
  console.log("tech clean up ", arr.toString());
  // 9. Get "Amazon" list element
  // Your code here
  const allTech = document.querySelectorAll("#three > p > a");
  const amazon = [];
  allTech.forEach((company) => {
    if (company.innerText === "Amazon") amazon.push(company);
  });
  console.log("Amazon tech ", amazon);
  // 10. Get all unicorn list elements (not the image element)
  // Your code here
  console.log(
    "unicorn list elements ",
    document.querySelectorAll("#three > ul > li")
  );

  const unicornLis = [];

  const unicornImages = document.querySelectorAll(".unicorn");
  console.log("unicorn images ", unicornImages);

  unicornImages.forEach((image) => unicornLis.push(image.parentElement));
  console.log("unicorn li 2 ", unicornLis);
};

window.onload = select;
