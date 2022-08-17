const express = require('express');
const app = express();
const cors = require('cors');
const {MongoClient, ObjectId} = require('mongodb');
const uri = "mongodb+srv://sanya30122000:sanya30122000@cluster0.vmkwj.mongodb.net/nearByPlaces?retryWrites=true&w=majority";

const totalLitres = 5000;
const costPerLitre = 100;
const client = new MongoClient(
    uri, 
    { 
        useNewUrlParser: true, 
        useUnifiedTopology: true 
    }
);
    
client.connect(async(err) => {
    const collection = client.db("nearByPlaces").collection("users");
    dbConn= client.db("nearByPlaces");
});

app.use(express.json());
app.use(cors());

app.post('/user',async(req,res)=>{
   
    dbConn.collection("users").insertOne(req.body,(err,res1)=>{
                if(err){
                    console.log(err);
                    if(err.code === 11000){
                        res.send({
                            result:"Email exists :("
                        })
                    }
                }
                else{
                    console.log(res1);
                    res.send({
                        result:"success",
                        id : res1.insertedId
                    })
                }
            });
})
app.post('/users',async(req,res)=>{
    const email = req.body.email;
    const password = req.body.password;
    dbConn.collection.findOne({email : email},(err,res)=>{
        console.log(res);
        res.send({
            result : data,
        })
    })
    
})
app.get('/users',async(req,res)=>{
    const data = await dbConn.collection("users").find({}).toArray();
    res.send({
        result:"success",
        data:data,
    });
})
app.get('/cafes',async(req,res)=>{
    const data=await dbConn.collection("cafes").find({}).toArray();
    res.send({
        result:"success",
        data:data,
    });
})

app.get('/hospitals',async(req,res)=>{
    const data=await dbConn.collection("hospitals").find({}).toArray();
    res.send({
        result:"success",
        data:data,
    });
})

app.get('/shopping',async(req,res)=>{
    const data=await dbConn.collection("shopping").find({}).toArray();
    res.send({
        result:"success",
        data:data,
    });
})


const port = process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log("Server started");
})