const express = require('express')
const app = express()
const port = process.env.PORT || 5000
require('dotenv').config()
var cors = require('cors')
app.use(cors())
app.use(express.json())
// 

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.qrbxe.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
    await client.connect();
    const carPartsCollection = client.db('car-parts').collection('parts')
    try {
        app.get('/parts', async (req, res) => {
            const query = {}
            const result = await carPartsCollection.find(query).toArray();
            res.send(result)
        })
        app.get('/parts/:id', async (req, res) => {
            const id = req.params.id
            const query = { _id: ObjectId(id) }

            const result = await carPartsCollection.findOne(query);
            res.send(result)
            console.log(result);
        })
    }
    finally {

    }
}

run().catch(console.dir);
app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})