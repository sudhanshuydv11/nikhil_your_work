const {createPool}=require("mysql");
const express=require("express");
const app=express();
app.use(express.urlencoded({extended: true}));