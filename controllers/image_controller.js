const path = require('path');
const crypto = require('crypto');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const router = require("express").Router();
const axios = require("axios");


const mongoURI = "mongodb://localhost/EHF";
const conn = mongoose.createConnection(mongoURI);

let gfs;

conn.once('open', () => {
  // Init stream
  gfs = Grid(conn.db, mongoose.mongo);
      // bucketName should match this collection name
  gfs.collection('uploads');
})

// Create storage engine
const storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads',
          metadata: {
            productName: file.originalname.slice(0,-4),
            ownBy: "Elegant Home Fashions"
          }
        };
        resolve(fileInfo);
      });
    });
  }
});
const upload = multer({ storage }).single('file');

//--------Test
router.post('/api/uploadFile', upload, (req, res) => {
   if (req.file) {
      return res.json({
         success: true,
         file: req.file
      });
   }
    res.send({ success: false });
});

// upload images
router.post('/api/uploads/', upload, (req, res) => {
  console.log("<<=======================>>");
    console.log(req.file)
  console.log("<<=======================>>");
    console.log(req.file.filename)
  // axios.put('/api/products' + id, {"images" : res.req.file.id});
  })

//read all getImages
router.get('/api/files', (req, res) =>{
  gfs.files.find().toArray((err, files)=>{
    // Check if files
    if(!files || files.length === 0) {
      return res.status(404).json({
        err: 'No files exist'
      });
    }
    //Files exist
    return res.json(files);
  });
});

//----find last image by ID

router.get('/api/fileid', (req, res) =>{
  gfs.files.find().limit(1).sort({_id:-1}).toArray((err, files)=>{
    return res.json(files);
  });
});
//-------------

router.delete('/api/files/:_id', (req, res) => {
  gfs.files.remove({ _id })
  .then(res=> console.log("deleted successfully"))
})

// @route GET /image/:filename
// @desc Display image
    router.get('/api/image/:filename', (req, res) =>{
      gfs.files.findOne({filename: req.params.filename}, (err, file) => {
        if(!file || file.length === 0) {
          return res.status(404).json({
            err: 'No files exist'
          });
        }
        // Check if image
        if(file.contentType === 'image/png' || file.contentType === 'image/jpeg'){
          // Read output to browser
          const readstream = gfs.createReadStream(file.filename);
          readstream.pipe(res);
          } else {
          res.status(404).json({
            err: 'Not an image'
          })
        }
      })
    });
//----edit end

    router.get('/api/images/:metadata', (req, res) =>{
        console.log(req.params.metadata);
      gfs.files.findOne({metadata: req.params.metadata}, (err, file) => {
        console.log(file);
    if(file.contentType === 'image/jpeg' || file.contentType === 'img/png'){
      // Read output to browser
      const readstream = gfs.createReadStream(file.filename);
      readstream.pipe(res);
    } else {
      res.status(404).json({
        err: 'Not an image'
      })
    }
  })
});

module.exports = router;
