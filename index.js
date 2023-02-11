const express=require("express");
const bodyParser=require("body-parser");
const mongoose=require("mongoose");
const app= express();

const homeContent="hdhcbvcxnvjkdclsaksancmbnxcjkxzcjkdxksnkmsklmdklmdlskadmksandskandasmnajsnjdn";


app.use(express.static("public"));
app.use(bodyParser.urlencoded({extented:true}));
app.set('view engine', 'ejs');
mongoose.set('strictQuery', false);
mongoose.connect("mongodb://localhost:27017/blogDB", {useNewUrlParser:true});

const blogSchema= new mongoose.Schema({
    title:String,
    content:String
});

const Blog= mongoose.model("blog", blogSchema);


app.get("/", (req, res)=>{

   Blog.find({}, function(err,posts){
        if(err){
          console.log(err);
        }else{
            res.render("blog", {homeContent:homeContent,posts:posts});
        }
      })
    
});

app.get("/compose", (req, res)=>{
    res.render("compose");
});

app.post("/compose", (req, res)=>{
    const blog=new Blog({
        title:req.body.title,
        content:req.body.message
    });

    blog.save(function(err){
        if(err){
            console.log(err);
        }else{
            console.log("sucess");
        }
    });

   
   
     res.redirect("/");
});

app.listen(5000, ()=>{
    console.log("runing at port 3000");
 })