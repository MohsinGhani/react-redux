const functions = require('firebase-functions');

var admin = require("firebase-admin");

var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://karachi-online-bus.firebaseio.com"
});
const db = admin.firestore();

exports.addUserProperty = functions.firestore
  .document('Buses/{busId}')
  .onCreate(snap => {
    // Get an object representing the document
    // e.g. {'name': 'Marie', 'age': 66}
    let busCreated = snap.data();

    console.log("BUS CREATED" ,busCreated)

    let busRef =  db.collection('Buses').where("cid" , "==", busCreated.cid);
     
    busRef.get().then((result)=>{
       if(result.empty){
           console.log("No Result Found");
       }
       else{
         let arr = []
         result.forEach((d)=>{
             arr.push(d)
         })
       return db.collection('companies').doc(busCreated.cid).update({
          "buses": arr.length,
        })
        .then((data)=>{
            console.log("UPDATED SUCCESSFULLY");
        })
        .catch((err)=>{
            console.log("ERROR", err);
        })
       }

    })
    .catch((err)=>{
        console.log("ERROR", err)
    })

});