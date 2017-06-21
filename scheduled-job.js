function sayHello() {


var MongoClient = require('mongodb').MongoClient
, assert = require('assert');
    
    var Twitter = require('twitter');
    
    var client = new Twitter({
                             consumer_key: '',
                             consumer_secret: '',
                             access_token_key: '',
                             access_token_secret: ''
                             });

    var findDocuments = function(db, callback) {
        // Get the documents collection
        var collection = db.collection('documents');
        
        collection.count(function(err, count) {
                         console.log("Selecting from " + count + " words");
                         
        var randomWordLoc = Math.floor(Math.random() * count);
                         
                         console.log("Chosen word no. " + randomWordLoc);
                         
                         collection.findOne({count:randomWordLoc}, function(err, doc) {
                                            assert.equal(null, err);
                                            
                                            console.log(doc.word);
                                            
                                            var randomTweet = Math.floor((Math.random() * 3) + 1);
                                            
                                            if (randomTweet == 1) {
                                            
                                            client.post('statuses/update', {status: "PARTY TIP: " + doc.word + " is partying"}, function(error, tweet, response) {
                                                        if (!error) {
                                                        console.log("Tweeted sucessfully");
                                                        }
                                                        });
                                            } else if (randomTweet == 2) {
                                            client.post('statuses/update', {status: "PARTY TIP: " + doc.word + " counts as partying"}, function(error, tweet, response) {
                                                        if (!error) {
                                                        console.log("Tweeted sucessfully");
                                                        }
                                                        });
                                            } else {
                                            client.post('statuses/update', {status: "PARTY TIP: " + doc.word + " = PARTY!"}, function(error, tweet, response) {
                                                       if (!error) {
                                                       console.log("Tweeted sucessfully");
                                                       }
                                                       });
                                            }
                                            
                                            
                                            db.close();
                                            return;
                                            });
                         
                         return;
                         });
        return;
    };





// Connection URL
var url = '';
// Use connect method to connect to the Server
MongoClient.connect(url, function(err, db) {
                    assert.equal(null, err);
                    console.log("Connected correctly to server");
                    
                    findDocuments(db, function() {
                                  db.close();
                                  });
                    

                    });

}



sayHello();