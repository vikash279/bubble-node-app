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
    res.render('index', { text: 'Index'})
}

const dashboard = async function (req, res){
    res.render('dashboard', { text: 'Dashboard'})
}

const myAccount = async function (req, res){
    res.render('myaccount', { text: 'My Account'})
}

const myCompany = async function (req, res){
    res.render('mycompany', { text: 'My Company'})
}

const project = async function (req, res){
    res.render('project', { text: 'Project'})
}

const team = async function (req, res){
    res.render('team', { text: 'Team'})
}

const task = async function (req, res){
    res.render('task', { text: 'Task'})
}

const subtask = async function (req, res){
    res.render('subtask', { text: 'Subtask'})
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


module.exports = { index, dashboard, myAccount, myCompany, project, team, task, subtask, uploadExcel, excelData , upload}