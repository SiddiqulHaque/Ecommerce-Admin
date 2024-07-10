// import { v2 as cloudinary } from 'cloudinary'
const cloudinary = require('cloudinary');

cloudinary.v2.config({
  cloud_name: 'daxshafbw',
  api_key: '686151181617249',
  api_secret: 'q2YdGaBKx8OHwqvE1VJa_Fg_-2E',
  secure: true,
});
const opts = {
  overwrite: true,
  invalidate: true,
  resource_type: "auto",
};
const uploadimage = (image) => {
  return new Promise(async (resolve, reject) => {
    await cloudinary.uploader.upload(image, opts, (err, result) => {
      if (result && result.secure_url) {
        console.log(result.secure_url);
        return resolve(result.secure_url);
      }
      console.log(err.message); 
      return reject({ message: err.message });
    });
  });
};
export const multipleImages = async (images) => {
  return new  Promise(async (resolve, reject) => {
    const uploads = images.map((base) => uploadimage(base));
    // console.log(uploads);
    await Promise.all(uploads)
      .then((values) => resolve(values))
      .catch((err) => reject(err));
  });
  // for (const image of images) {
  //   const result = await cloudinary.uploader.upload(image);
  //    console.log(result)
  //    return result;
  //   }
};
