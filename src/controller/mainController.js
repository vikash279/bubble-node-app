const axios = require('axios');
const fs = require('fs')
const path = require('path')
const bodyparser = require('body-parser')
const readXlsxFile = require('read-excel-file/node')
const mysql = require('mysql')
const multer = require('multer')
const sql = require("../models/db.js");
const reader = require('xlsx');

const upload = multer({ dest: 'src/uploads/' });

const index = async function (req, res){
    res.render('index', { text: 'This is EJS'})
}

const about = async function (req, res){
    res.render('about', { text: 'About Page'})
}

const uploadExcel = async function (req, res){
    res.render('uploadexcel', { text: 'Upload Excel'})
}

const excelData = async function (req, res){
    console.log(req.file);
    console.log(req.file.destination+req.file.filename);
    const file = reader.readFile(req.file.destination+req.file.filename);
    let data = []
  
    const sheets = file.SheetNames
    for(let i = 0; i < sheets.length; i++)
    {
    const temp = reader.utils.sheet_to_json(
            file.Sheets[file.SheetNames[i]])
    temp.forEach((res) => {
        data.push(res)
    })
    }
    
    // Printing data
    console.log(data)
}


module.exports = { index, about, uploadExcel, excelData , upload}