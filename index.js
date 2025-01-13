const express = require("express"); 
const mongoose = require('mongoose');
const app = express(); 
app.use(express.json());
const uri = "mongodb+srv://khalidDonc:Khalid123@cluster1.cc1ya.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1";
const Article = require("./model/Article"); 
mongoose
.connect(
    uri
)
.then(() => {  
console.log("Connected Success");
}).catch((error) => { 
console.log("DEBUG: Fail in DB" + error);
});






// app.get("/hello", (req, res) => { 
//     res.render('articlesView.ejs'); 
// });





app.post("/addPost", (req, res) => { 
    res.send("Add post")
});


app.get("/welcome/:name", (req, res)=> { 
const name = req.params.name; 
    res.send(`Welcome ${name}, you are here 😀`)
});

app.get("/calc/:numberOne/:numberTwo", (req, res) => {
    const sum = parseInt(req.params.numberOne) + parseInt(req.params.numberTwo)
    
    res.send(`Sum is ${sum}`)
 });

 app.get("/user", (req , res) => { 
    console.log(req.body.name)
res.json(
    {name: req.body.name, 
    age: req.query.age
 }
)
    
 });

 app.get('/getNumbers', (req, res) => { 
var numbers = ""; 
for(let i = 0; i < 20; i++) { 
    numbers += i + "-"
}

res.render('numbers.ejs', { 
    name: "Khalid",  
    numbers: numbers
})
 })

 // ------ Articles Endpoins ---
app.post('/articles', async (req, res) => { 
    const article = new Article; 
    // article.title = "How to make APIs"
    // article.body = "Connect with mongoodb and integrate with your code"
    // article.postDate = new Date()
    const data = req.query; 
      article.title = data.title
    article.body = data.body; 
    article.postDate = new Date()
   await article.save(); 

    res.send("Saved Success"); 
}); 

 // ------ Articles Endpoins ---
 app.post('/postArticles', async (req, res) => { 
    const article = new Article; 
    const data = req.body; 
    // Add `postDate` to each article
    const articlesWithDate = data.map(article => ({
        ...article,
        postDate: new Date()
      }));
;
   await Article.insertMany(data); 

    res.json("Saved has Successed"); 
}); 

app.get("/articles", async (req, res) => { 
    const articles = await Article.find();

     res.json(articles);
});

app.get("/articles/:articleID", async (req, res) => { 
    const id = req.params.articleID; 
    try {
    const articles = await Article.findById(id);
    res.json(articles);
    return; 
    } catch { 
        res.send("DEBUG: error while post artice " + error)
    }
     
});

app.get('/articlesView', async (req, res) => { 
    try { 
    var articles = await Article.find();
    articles = articles.filter(article => article.title && article.body)
    res.render('articlesView.ejs', { articles }); // Pass the articles array to the EJS template

    return; 
} catch { 
    res.status(500).send(error);
    return; 
}
})


app.listen(3000, () => { 
    console.log("I'm listining now in port 3000")
});
