const axios = require('axios');
const fs = require('fs')
const path = require('path')
const bodyparser = require('body-parser')
const readXlsxFile = require('read-excel-file/node')
const mysql = require('mysql')
const multer = require('multer')
const connection = require("../models/db.js");
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



const excelData = async function (req, res) {
    
    const file = reader.readFile(req.file.destination + req.file.filename);
    let data = [];

    const sheets = file.SheetNames;
    for (let i = 0; i < sheets.length; i++) {
        const temp = reader.utils.sheet_to_json(file.Sheets[file.SheetNames[i]]);
        temp.forEach((res) => {
            data.push(res);
        });
    }

   // console.log(data);

    try {
        const checkDataQuery = `SELECT COUNT(*) AS count FROM excel_data`;
        const [rows] = await connection.query(checkDataQuery);
        const dataExists = rows[0].count > 0;

        if (dataExists) {
            const updateQuery = `UPDATE excel_data SET status = 0 WHERE status = 1`;
            await connection.query(updateQuery);
        }

        for (const item of data) {
            await connection.query(
                `INSERT INTO excel_data (task, subtask, uom_labour, labour_quantity, labour_total, uom_material, material_quantity, material_total, complete, value)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [
                    item.Task,
                    item.Subtask,
                    item['UoM Labour'],
                    item['Labour Quantity'],
                    item['Labour Total'],
                    item['UoM Material'],
                    item['Material Quantity'],
                    item['Material Total'],
                    item.Complete,
                    item.Value,
                ]
            );
        }

        console.log('Data inserted successfully!');
        res.status(200).json({ message: 'Data inserted successfully!' });
    } catch (err) {
        console.error('Error inserting data:', err);
        res.status(500).json({ error: 'Error inserting data into the database.' });
    } 
};


module.exports = { index, dashboard, myAccount, myCompany, project, team, task, subtask, uploadExcel, excelData , upload}