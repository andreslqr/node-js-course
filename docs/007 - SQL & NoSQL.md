# SQL & NoSQL

Keep the data stored in files can't be scalable when is a lot of data necessary, that's the reason why the SQL and NoSQL exists

## SQL

Structured Query Language (SQL) is a way to store data in *tables* using a string schema for keep the data and creating relations between tables:

| id | category_id | name   | description                   | price | created_at          |
| -- | ----------- | ------ | ----------------------------- | ----- | ------------------- |
| 1  | 5           | book   | a long description for a book | 9.99  | 2024-02-01 22:37:33 |
| 2  | 3           | book 2 | a second description          | 2.50  | NULL                |

Sql offers a way to query the data:

```sql
SELECT products.id, products.name, categories.name as category, products.description, products.price
    FROM products
    LEFT JOIN categories
    ON products.category_id = categories.id
    WHERE products.name LIKE '%book%' 
    ORDER BY products.created_at
```


## NoSQL

NO Structures Query Language (NoSQL) is a way to store data in collections as documents, for keep the data, there is no string schemas or relations:

```js
{
    "_id": ObjectId("5ce45d7606444f199acfba1e"),
    "name": {given: "Alex", family: "Smith"},
    "email": "email@example.com",
    "age": 27
}
{
    _id: ObjectId("5effaa5662679b5af2c58829"),
    email: “email@example.com”,
    name: {given: “Jesse”, family: “Xiao”},
    age: 31
}
```

There is no a query language, but is more like use js function:

```js
db.user.find().sort({age: 1})

db.user.createIndex({email: 1}, {unique: true})
```