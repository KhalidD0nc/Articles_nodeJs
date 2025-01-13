const { text } = require("express");
const mongoose = require("mongoose"); 
const Schema = mongoose.Schema; 

const articlSchema = new Schema({ 
title: String,
body: String, 
postDate: { 
    type: Date, 
    default: Date.now
}
})

const Article = mongoose.model("Article", articlSchema);

module.exports = Article;