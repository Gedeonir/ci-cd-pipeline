const mysql2=require('mysql2');

const db=mysql2.createPool({
    host:'localhost',
    user:'root',
    password:'',
    database:'testdb'
});



module.exports=db;