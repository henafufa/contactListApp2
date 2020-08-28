//require nodejs module
var mongoose= require('mongoose');

//declare constatt
const DB_URL = 'mongodb://127.0.0.1:27017/contactlist';
const CONNECTION_OPTIONS=  {useNewUrlParser:true, useUnifiedTopology:true};

class DBCONNECTION{
    constructor() {
        this.isConnected()
  }
        isConnected(){
        mongoose.connect(DB_URL,CONNECTION_OPTIONS,(mongoErr,db)=>{
            if(mongoErr){
                console.error(mongoErr);
                return false;
            }
            else{
                db= mongoose.connection;
                db.once('open',()=>{
                    console.log('database connected');
                });
                db.on('error', ()=>{
                    console.log('database not connected');
                });
                return true;
            }
        });
    }

}
module.exports = new DBCONNECTION();