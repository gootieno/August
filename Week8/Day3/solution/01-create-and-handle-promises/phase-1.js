function stretch() {
  // Your code here
  return new Promise((resolve) => {
    setTimeout(() => {
      // console.log("done stretching");
      resolve("done lifting weights");
    }, 1000);
  });
}

function runOnTreadmill() {
  // Your code here
  return new Promise((resolve, reject) => {
    reject("error: wont run");
    return;
    setTimeout(() => {
      console.log("done running on treadmill");
      resolve("done running on treadmill");
    }, 500);
  });
}

function liftWeights() {
  // Your code here
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // console.log("done lifting weights");
      resolve("done lifting weights");
    }, 2000);
  });
}

function workout() {
  // Your code here
  // console.log("stretch promise ", stretch());
  stretch()
    .then(runOnTreadmill)
    .then(() => liftWeights())
    .then(() => console.log("done working out"));
}

const workoutRoutine = () => {
  Promise.all([stretch(), runOnTreadmill(), liftWeights()])
    .then((result) => console.log(result))
    .catch((err) => console.log(err));
};

/* ============================ TEST YOUR CODE ============================

Run the file (`node phase-1.js`) and check your output against the expected
output.
*/

workoutRoutine();
// workout();
// should print out the following:
// done stretching
// done running on treadmill
// done lifting weights
// done working out
