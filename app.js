//db connectivity
var mysql = require('mysql');
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "retail"
});
//express
const express = require('express')
const app = express()
app.use(express.json());
var cors = require('cors')
app.use(cors())
app.options('*', cors())

//  api get post
app.listen(2003, '', function () {

    console.log('listining at port  2003')
})
//api to fetch the data   
app.get('/getProduct', function (req, res) {

    var objs = [];


    con.query("SELECT * FROM product ", function (err, result, fields) {
        console.log("result", result)

        // console.log(result[0].product_name);
        //objs.push(result[0].product_name)
        for (var i = 0; i < result.length; i++) {
            objs.push({ "product_name": result[i].product_name, "product_price": result[i].product_price });

        }
        res.send(JSON.stringify(objs))
    });

})

//post data
app.post('/addproduct', function (req, res) {
    const productDetails = req.body;
    console.log("productDetails", productDetails)
    var product_name = req.body.product_name
    var product_price = req.body.product_price
    var product_desc = req.body.product_desc
    let query = `INSERT INTO product 
    (product_name, product_price,product_desc) VALUES (?, ?,?);`;

// Creating queries
con.query(query, [product_name, 
    product_price,product_desc], (err, rows) => {
    if (err) throw err;
    console.log("Row inserted with id = "

    + rows.insertId);
    res.send("done")
});
// res.send("done")

})
//post data
app.get('/auth', function (req, res) {
   
   res.send("f9bf78b9a18ce6d46a0cd2b0b86df9da")

})