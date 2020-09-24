const express = require("express")
const app = express()
const hbs = require("hbs")
const session = require("express-session")
const mysqlStore = require("express-mysql-session")(session)
const addToCart = require("./addToCart")
const removeItem = require("./removeItem")
require('dotenv').config()
app.set("view engine", "hbs")
hbs.registerPartials(__dirname + "/views/partials")
app.use(express.static("public"))
//create session store
const sessionStore = new mysqlStore({
  host: process.env.DB_HOST,
  port: process.env.PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB,
  schema : {
    tableName : "activeSession",
      columnNames : {
        session_id : "session_id",
        expires : "expires",
        data : "data",
      }
  }
})
////
app.use(session({
  key: 'SSID_oip',
  secret: process.env.SESSION_SECRET,
  store: sessionStore,
  resave: false,
  saveUninitialized: false,
  cookie : {
      maxAge : 120000
  }
}))

//database connection
const db = require("./connection")
const checkout = require("./checkout")

app.get("/", (req, res) => {
      
  if (req.session.cart) {
    req.session.views++
    let totalCount = req.session.cart.products.length
    db.query("SELECT * FROM PRODUCTS", (error, results, fields) => {
      res.render("index", { products : results, totalItmes : totalCount})
    })  

  } else {
    req.session.views = 1
    req.session.cart = { total : 0, products : [] } 
    db.query("SELECT * FROM PRODUCTS", (error, results, fields) => {
     res.render("index", { products : results, totalItmes : 0})
    })  
  }
         
               
})


app.get("/bag", (req, res) => {

    if(!req.session.cart){
        res.redirect("/")
    }else{
      let ct = req.session.cart
      let ct2 = req.session.cart.products.length
    
      res.render("bay", { totalItmes : ct2 , products : ct})
    }
  
})


app.get("/addToCart/:pid", (req, res) => {
      
      // console.log(JSON.parse(req.session.cart))
      db.query(`select * from products where name = '${req.params.pid}'`, function(err, results, fields){
          if(err) throw err
          addToCart(results[0], req, res)
      })
     

       
       
  })

  app.post("/removeItem/:id", (req, res) => {
      let item = req.params.id
    
      removeItem(req, res, item)
  })


  app.get("/checkout", (req, res) => {
    res.render("checkout", {cart : req.session.cart}
  })

  app.post("/checkout", () => {
    checkout();
  })

app.listen(3000, () => {
  console.log("running from Nvidia servers")
})






  