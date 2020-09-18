const express = require("express")
const app = express()
const hbs = require("hbs")
const session = require("express-session")
const mysqlStore = require("express-mysql-session")(session)
const addToCart = require("./addToCart")
app.set("view engine", "hbs")
hbs.registerPartials(__dirname + "/views/partials")
app.use(express.static("public"))
//create session store
const sessionStore = new mysqlStore({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'jeffBezos56',
  database: 'test',
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
  secret: "shagufasalimmawaji",
  store: sessionStore,
  resave: false,
  saveUninitialized: false,
  cookie : {
      maxAge : 120000
  }
}))

//database connection
const db = require("./connection")
let sess
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
        res.send("error code 404" )
    }else{
      res.render("bay", {products : req.session.cart})
    }
  
})


app.get("/addToCart/:pid", (req, res) => {
    
      console.log(req.session.views)
      console.log(req.sessionID)  
      // console.log(JSON.parse(req.session.cart))
      db.query(`select * from products where name = '${req.params.pid}'`, function(err, results, fields){
          if(err) throw err
          addToCart(results[0], req, res)
      })
     

       
       
  })

app.listen(3000, () => {
  console.log("running from Nvidia servers")
})






  