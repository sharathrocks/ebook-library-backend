const express = require('express')
const app = express()
var bookDbInterface = require('./bookDbInterface');

app.get('/books/search/:searchQuery', function(req, res) {
    var searchQuery = req.params.searchQuery;
    searchQuery = searchQuery || '';
    bookDbInterface.getBooksMatchingSearch(searchQuery).then(function(results){
        res.send(results);
    });
})

app.get('/getInvalidFiles', function(req, res) {
    bookDbInterface.getInvalidFiles().then(function(results){
        res.send(results);
    });
})

app.listen(3000, () => console.log('Ebook backend started on 3000!'))