const express = require('express');
const route = express.Router();

const mainController = require("../controller/mainController");

route.get("/",mainController.index)
route.get("/about",mainController.about)
route.get("/upload-excel",mainController.uploadExcel)
// route.post("/excel-data",mainController.excelData)
route.post("/excel-data", mainController.upload.single('importexcel'), mainController.excelData);



route.all("/*", function (req, res) {
    res.status(400).send({status: false,message: "The api you request is not available"})
})
module.exports = route;