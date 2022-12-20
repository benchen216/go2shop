/*import formidable from "formidable";
import fs from "fs";

export const config = {
  api: {
    bodyParser: false
  }
};

const post = async (req, res) => {
  const form = new formidable.IncomingForm();
  form.parse(req, async function (err, fields, files) {
    console.dir(files)
    await saveFile(files.file);
    return res.status(201).send("");
  });
};

const saveFile = async (file) => {
  const data = fs.readFileSync(file?.path);
  fs.writeFileSync(`../../public/${file.name}`, data);
  await fs.unlinkSync(file.path);
  return;
};

export default (req, res) => {
  req.method === "POST"
    ? post(req, res)
    : req.method === "PUT"
      ? console.log("PUT")
      : req.method === "DELETE"
        ? console.log("DELETE")
        : req.method === "GET"
          ? console.log("GET")
          : res.status(404).send("");
};
*/
// Backend
import formidable from 'formidable';
import type { NextApiRequest, NextApiResponse } from "next";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req:NextApiRequest, res:NextApiResponse) => {
  const form = new formidable.IncomingForm(
    {
      uploadDir:`./public/uploads`,
      keepExtensions: true, // that must be `true`
      /*filename: function (name, file) {
        console.log(name, file);
        return name+file;
      }*/
    }
  );
  //form.uploadDir = `./public`;
  //form.keepExtensions = true;
  form
    .on('error', function(err) {
      throw err;
    })

    .on('field', function(field, value) {
      //receive form fields here
      console.log("xxx",field, value);
    })

    /* this is where the renaming happens */
    .on ('fileBegin', function(name, file){
      //rename the incoming file to the file's name
      //file.path = form.uploadDir + "/" + file.name;

      console.log("fileBegin", name, file.newFilename);
    })

    .on('file', function(field, file) {
      console.log("file", file.newFilename);
      //On file received
    })


  form.parse(req, (err, fields, files) => {
    //console.log(err, fields, files);
    return res.status(201).send(files);
  });
}
// const saveFile = async (file) => {
//   const data = fs.readFileSync(file?.path);
//   fs.writeFileSync(`../../../public/${file.name}`, data);
//   await fs.unlinkSync(file.path);
//   return;
// };
