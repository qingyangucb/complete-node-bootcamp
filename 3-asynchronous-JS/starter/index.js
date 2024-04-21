const fs = require("fs");
const superagent = require("superagent");

const readFilePro = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, "utf8", (err, data) => {
      if (err) reject("I could not find that file");
      resolve(data);
    });
  });
};

const writeFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) reject("Could not write file");
      resolve("success");
    });
  });
};

/*
readFilePro(`${__dirname}/dog.txt`)
  .then((data) => {
    console.log(`Breed: ${data}`);
    return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
  })
  .then((res) => {
    console.log(res.body.message);
    return writeFilePro("dog-img1.txt", res.body.message);
  })
  .then(() => {
    console.log("Random dog image saved to file");
  })
  .catch((err) => {
    console.log(err);
  });
*/

const getDogPic = async () => {
  try {
    const data = await readFilePro(`${__dirname}/dog1.txt`);
    console.log(`Breed: ${data}`);

    const res1Pro = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const res2Pro = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const res3Pro = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );

    const all = await Promise.all([res1Pro, res2Pro, res3Pro]);
    console.log(res.body.message);

    await writeFilePro("dog-img.txt", res.body.message);
    console.log("Random dog image saved to file");
  } catch (err) {
    console.log("Erorr: ", err);
    throw err;
  }
  return "2: READY";
};

(async () => {
  try {
    console.log("1: Will get dog pics!");
    const x = await getDogPic();
    console.log(x);
  } catch (err) {
    console.log("Error: ", err);
  }
  console.log("Done getting dog pics!");
})();

/*
console.log("1: Will get dog pics!");
const x = getDogPic()
  .then((x) => {
    console.log(x);
  })
  .catch((err) => {
    console.log("Error from x: ", err);
  });
console.log(x);
console.log("3: Done getting dog pics!");
*/
