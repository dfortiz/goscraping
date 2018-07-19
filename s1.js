var express = require('express');
var fs      = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

var arr = [];

  //url = 'http://www.imdb.com/title/tt1229340/';
  //url = 'http://shop.monkeymoto.com/catalog.asp';
  url = 'http://shop.monkeymoto.com/catalog_items.asp?prodtree=f2-024-0215-02857';

//http://shop.monkeymoto.com/catalog_items.asp?prodtree=f2-024-0215-02857

  request(url, function(error, response, html){
    if(!error){
      var $ = cheerio.load(html);

      //console.log(html);

      var title, release, rating;
      var json = { name : "", price : "", thumb : ""};

      $('#resultsProduct > div > a > img').filter(function(){
        var data = $(this);

//#resultsProduct > a

	      //console.log('/***** NEW PRODUCT FOUND ****/');
	      //console.log(data);
        var thumb = data.attr('src');

        var parent1 = data.parent().parent().parent();
        var product = parent1.children().eq(2).text().trim();
        var price = parent1.children().eq(2).children().first().text().trim();

        //console.log(product.text());
        //console.log(v);

        title = data.children().first().text().trim();
        release = data.children().last().children().last().text().trim();

        json.name = product;
        json.price = price;
        json.thumb = thumb;
        //console.log(json);
        arr.push( json );
      })

/*      $('.ratingValue').filter(function(){
        var data = $(this);
        rating = data.text().trim();

        json.rating = rating;
      })
*/

    }

    //fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){
    //fs.appendFile('output.json', JSON.stringify(arr), function(err){
    fs.writeFile('output.json', JSON.stringify(arr), function(err){
      console.log('File successfully written! - Check your project directory for the output.json file');
    })

  })

console.log('Magic happens on port 8081');
exports = module.exports = app;

