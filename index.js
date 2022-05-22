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
    const ordersCollection = client.db('car-parts').collection('orders')
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

        })
        app.post('/order', async (req, res) => {
            const order = req.body;

            const result = await ordersCollection.insertOne(order)
            res.send(result)

        });
        app.put('/parts/:id', async (req, res) => {
            const doc = req.body
            const id = req.params.id;
            const filter = { _id: ObjectId(id) }
            const updateDoc = {
                $set: doc


            };

            const result = await carPartsCollection.updateOne(filter, updateDoc)
            res.send(result)
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