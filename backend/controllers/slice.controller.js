var Jimp = require("jimp");
var driveCtrl = require("../controllers/drive.controller");

const sliceCtrl = {};

sliceCtrl.test = async (req, res) => {
  var w = 0; //  width of the image
  var h = 0; // height of the image
  var x = 1;
  var aux;
  var aux2;
  var arreglo = [];
  var img = Jimp.read(
    "https://m.media-amazon.com/images/I/B1Ynn1-zR1S._AC_CLa%7C2140%2C2000%7C71KDs0zuJ9L.png%7C0%2C0%2C2140%2C2000%2B0.0%2C0.0%2C2140.0%2C2000.0_UL1500_.png"
  )
    .then((lenna) => {
      lenna.resize(600, 600);

      var aux = lenna.clone();

      return aux;
    })
    .catch((err) => {
      console.error(err);
    });

  aux = await img.then((res) => {
    return res;
  });

  console.log(aux);

  while (w < 600 && h < 600) {
    aux2 = aux.clone();
    aux2.crop(w, h, 200, 200).write("lena-small-bw-" + x + ".jpg");
    // save

    var y = await driveCtrl.postTest("lena-small-bw-" + x + ".jpg")

    arreglo.push(y);

    w = w + 200;
    if (w === 600) {
      w = 0;
      h = h + 200;
    }
    x = x + 1;
  }

  res.json({"data":arreglo});
  // Jimp.read(
  //   "https://m.media-amazon.com/images/I/B1Ynn1-zR1S._AC_CLa%7C2140%2C2000%7C71KDs0zuJ9L.png%7C0%2C0%2C2140%2C2000%2B0.0%2C0.0%2C2140.0%2C2000.0_UL1500_.png"
  // )
  //   .then((lenna) => {
  //     lenna.resize(600, 600);
  //     var w = 0; //  width of the image
  //     var h = 0; // height of the image
  //     var x = 1;
  //     var aux = lenna.clone();

  //     // console.log(w);
  //     // console.log(h);

  //     while (w < 600 && h < 600) {
  //       aux = lenna.clone();
  //       aux.crop(w, h, 200, 200).write("lena-small-bw-" + x + ".jpg");
  //       // save

  //       driveCtrl.postTest("lena-small-bw-" + x + ".jpg");

  //       w = w + 200;
  //       if (w === 600) {
  //         w = 0;
  //         h = h + 200;
  //       }
  //       x = x + 1;
  //     }
  //   })
  //   .then(res.json("OK"))
  //   .catch((err) => {
  //     console.error(err);
  //   });
};

module.exports = sliceCtrl;
