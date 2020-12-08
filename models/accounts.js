const connection = require('./connection');
var express = require("express");
var router = express.Router();


function Result (err, results){
    if (err) throw err;
    console.log(results);
}


exports.FindUserName = (username) => {
    var sql = "SELECT username FROM hcmus_book_store.user_info WHERE username = '"+username+"'";
    var results;
    var err;
    connection.query(sql,Result(err, results));

    if (results != null){
        return true;
    }
    return false;
}

exports.AddAccount = (username, password) => {
 var sql = "INSERT INTO hcmus_book_store.user_info (username, password, role) VALUES ";
 sql = sql + "('"+username+"', '"+password+"', 'user')";
 
 connection.query(sql, function (err, results) {
    if (err) throw err;
    console.log("1 record inserted");
 })
}

async function queryAsync(sql){
    return new Promise((resolve,reject)=>{
        connection.query(sql,(error,results)=>{
            if (error){
                reject(error);
                return
            }
            resolve(results)


        });

    })


}

exports.isAccount =async (username, password) => {
    
    var sql = "SELECT * FROM hcmus_book_store.user_info " 
    sql = sql + "WHERE username = '"+username+"' AND password = '"+password+"';";
    console.log(sql);
    var results= await queryAsync(sql);
     if (results.length != 0){
        console.log('Happy');
        return true;
    }
    
    console.log('Sad');
    return false;  
    
}