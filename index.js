const express = require('express');
const cors = require("cors");
require('dotenv').config()
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

// college-spotlight
// vYRFTpBYh8VwvgbH

app.get('/', (req, res) => {
    res.send('Hello College Spotlight')
})






const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://college-spotlight:vYRFTpBYh8VwvgbH@cluster0.z12trsh.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();

        const collegeCollection = client.db("CollegeSpotlight").collection("collegeInfo");

        app.get('/colleges', async (req, res) => {
            const result = await collegeCollection.find().toArray();
            res.send(result)
        })

        app.get('/colleges/:id', async (req, res) => {
            const id = req.params.id;
            const query = {_id: new ObjectId(id)}
            const result = await collegeCollection.findOne(query);
            res.send(result)
        })

        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);






app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})