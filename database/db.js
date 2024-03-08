const db = require('mysql')

try {
    var con = db.createConnection({
        host: "localhost",
        user: "root",
        password: "Mantosh@123",
        database:'carbike'
      });
} catch (error) {
    console.log("databaseerror--->",error)
    
}
  
  con.connect((error)=>{
    if(!error){
        console.log("Connected")
    }
    else{
        console.log("Not connected")
    }
  });


 module.exports=con