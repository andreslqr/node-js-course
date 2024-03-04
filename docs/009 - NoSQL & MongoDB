# NoSQL & MongoDB

NoSQL is an alternative to SQL Databases, allows to "define schemas" on the flow, but these are not strict,
the relations are only embedding documents(records) inside documents(records)

```json
{
    "name": "Jhon Doe",
    "email": "a@mail.com",
    "address": {
        "street": "P. Sherman",
        "outdoorNumber": "42",
        "suburb": "Wallaby Way",
        "state": "Sydney",
    },
    "numbers": [
        {
            "number": 23432421
        },
        {
            "number": 43235409
        }
    ]
}

```


## MongoDB

MongoDB is built on a scale-out architecture that has become popular with developers of all kinds for developing scalable applications with evolving data schemas. As a document database, MongoDB makes it easy for developers to store structured or unstructured data. It uses a JSON-like format to store documents.

```js
{
    _id: ObjectId('65e611c2e793adfd77fbd86e'),
    sku: "rfrgv4g",
    title: "Awesome product",
    imageUrl: "https://image.com/awesome-image",
    price: 99.99
}
```

### Find operations

```js
import { MongoClient } from "mongodb"
// Replace the uri string with your MongoDB deployment's connection string.
const uri = ""

async function run() {
  try {
    
    // Get the database and collection on which to run the operation
    const database = client.db("sample_mflix")
    const movies = database.collection("movies")
    // Query for a movie that has the title 'The Room'
    const query = { title: "The Room" }
    const options = {
      // Sort matched documents in descending order by rating
      sort: { "imdb.rating": -1 },
      // Include only the `title` and `imdb` fields in the returned document
      projection: { _id: 0, title: 1, imdb: 1 },
    }
    // Execute query
    const movie = await movies.findOne(query, options)

    const movies = await movies.find(query, options)
    // Print the document returned by findOne()
    console.log(movie)
  } finally {
    await client.close()
  }
}

run().catch(console.dir)


```

### Insert operations


```js
import { MongoClient } from "mongodb"

// Replace the uri string with your MongoDB deployment's connection string.
const uri = ""

// Create a new client and connect to MongoDB
const client = new MongoClient(uri)

async function run() {
  try {
    // Connect to the "insertDB" database and access its "haiku" collection
    const database = client.db("insertDB")
    const haiku = database.collection("haiku")
    
    // Create a document to insert
    const doc = {
      title: "Record of a Shriveled Datum",
      content: "No bytes, no problem. Just insert a document, in MongoDB",
    }
    // Insert the defined document into the "haiku" collection
    const result = await haiku.insertOne(doc)

    // Print the ID of the inserted document
    console.log(`A document was inserted with the _id: ${result.insertedId}`)
  } finally {
     // Close the MongoDB client connection
    await client.close()
  }
}
// Run the function and handle any errors
run().catch(console.dir)

```

### Update operations

```js
// Update a document

import { MongoClient } from "mongodb"

// Replace the uri string with your MongoDB deployment's connection string
const uri = ""

const client = new MongoClient(uri)

async function run() {
  try {
    const database = client.db("sample_mflix")
    const movies = database.collection("movies")

    // Create a filter for movies with the title "Random Harvest"
    const filter = { title: "Random Harvest" }

    /* Set the upsert option to insert a document if no documents match
    the filter */
    const options = { upsert: true }

    // Specify the update to set a value for the plot field
    const updateDoc = {
      $set: {
        plot: `A harvest of random numbers, such as: ${Math.random()}`
      },
    }

    // Update the first document that matches the filter
    const result = await movies.updateOne(filter, updateDoc, options)
    
    // Print the number of matching and modified documents
    console.log(
      `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`,
    )
  } finally {
    // Close the connection after the operation completes
    await client.close()
  }
}
// Run the program and print any thrown errors
run().catch(console.dir)

```

### Delete operations

```js
// Delete a document

import { MongoClient } from "mongodb"

// Replace the uri string with your MongoDB deployment's connection string
const uri = ""

const client = new MongoClient(uri)

async function run() {
  try {
    const database = client.db("sample_mflix")
    const movies = database.collection("movies")

    /* Delete the first document in the "movies" collection that matches
    the specified query document */
    const query = { title: "Annie Hall" }
    const result = await movies.deleteOne(query)

    /* Print a message that indicates whether the operation deleted a
    document */
    if (result.deletedCount === 1) {
      console.log("Successfully deleted one document.")
    } else {
      console.log("No documents matched the query. Deleted 0 documents.")
    }
  } finally {
    // Close the connection after the operation completes
    await client.close()
  }
}
// Run the program and print any thrown exceptions
run().catch(console.dir)

```