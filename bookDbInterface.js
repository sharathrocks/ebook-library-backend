var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/bookList";

function getDbConnection () {
    return new Promise(function(resolve, reject){
        MongoClient.connect(url, function(err, db) {
            if(err) {
                reject();
            }
            resolve(db);
        });
    });
}

function getBooksMatchingSearch(searchQuery) {
    function fetchResults(resolve, reject) {
        getDbConnection().then(function(db){
            var searchQuerySplit = '.*' + searchQuery.split(' ').join('.*') + '.*';
            var searchQueryRegex = new RegExp(searchQuerySplit, "i");
            db.collection('myBooks').find({ $or : [ {"META.title": searchQueryRegex}, {"META.author": searchQueryRegex}, {"fileName": searchQueryRegex} ] }).toArray(function (err, res) {
                resolve(res);
                db.close();
            });
        });
    }
    return new Promise(fetchResults);
}

function getInvalidFiles() {
    function fetchResults(resolve, reject) {
        getDbConnection().then(function(db){
            db.collection('myBooks').find({ "SUPPORTED_EBOOK_FILE_FORMAT": false }).toArray(function (err, res) {
                resolve(res);
                db.close();
            });
        });
    }
    return new Promise(fetchResults);
}

module.exports = {
    getBooksMatchingSearch: getBooksMatchingSearch,
    getInvalidFiles: getInvalidFiles
}