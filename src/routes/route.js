const express = require('express');
const route = express.Router();

const mainController = require("../controller/mainController");

route.get("/",mainController.index)
route.get("/dashboard",mainController.dashboard)
route.get("/account",mainController.myAccount)
route.get("/company",mainController.myCompany)
route.get("/project",mainController.project)
route.get("/team",mainController.team)
route.get("/task",mainController.task)
route.get("/subtask",mainController.subtask)
// route.get("/about",mainController.about)
route.get("/upload-excel",mainController.uploadExcel)
// route.post("/excel-data",mainController.excelData)
route.post("/excel-data", mainController.upload.single('importexcel'), mainController.excelData);



route.all("/*", function (req, res) {
    res.status(400).send({status: false,message: "The page you request is not available"})
})
module.exports = route;