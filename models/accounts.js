const connection = require('./connection');
const md5 = require('md5');


function Result (err, results){
    if (err) throw err;
    console.log(results);
}

exports.displayAllUser=()=>{
    var sql = "SELECT * FROM hcmus_book_store.user_info";
    var results;
    var err;
    connection.query(sql,Result(err, results));

    if (results != null){
        return true;
    }
    return false;

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

exports.getUserByName = async (username, callback) => {
    var sql = "SELECT username, password FROM hcmus_book_store.user_info " 
    sql += " WHERE username = '" + username + "';";
    var proc = await new Promise((resolve, reject) => {
        connection.query(sql,(err, results) => {
            if (err) { return reject(err); }
            return resolve(results);
        });
    }).then((results) => {
        if (results.length > 0) {
            var user = results[0];
            return callback(null,user);
        }
        return callback(null,false,"Wrong_User");
    });
}

exports.SignIn = async (username, password, callback) => {
    var sql = "SELECT username, password FROM hcmus_book_store.user_info " 
    sql = sql + "WHERE username = '"+username+"' AND role = 'admin' AND status = 'Active'";
    var proc = await new Promise((resolve, reject) =>{
        connection.query(sql,(err, results) => {
            if (err) { return reject(err); }
            return resolve(results);
        });
    }).then((results) =>{
        if (results.length > 0) {
            var hashPass = md5(password);
            var user = results[0];
            if (user.password === hashPass) {
                return callback(null,user);
            }
            return callback(null,false,"Wrong_Pass");
        }
        return callback(null,false,"Wrong_User");
    });
}