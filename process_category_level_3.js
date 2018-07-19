var express = require('express');
var fs      = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var sleep = require('sleep');

var app     = express();

var processproduct = require('./processproduct.js'); //or includes2.js, works the same but differnt style.

//http://shop.monkeymoto.com/catalog_items.asp?prodtree=f2-028-0235-021482&pagenum=5
//http://shop.monkeymoto.com/catalog_items.asp?prodtree=f2-024-02286
preurl = 'http://shop.monkeymoto.com';
//url = 'http://shop.monkeymoto.com/catalog_items.asp?prodtree=f2-028-0235-021482';
//url = 'http://shop.monkeymoto.com/catalog_items.asp?prodtree=f2-028-0235-021482&pagenum=5';

//APPAREL MORE
//url1 = 'http://shop.monkeymoto.com/eshopitems_prodtree_f2-024.Apparel.htm';


function scrap_cat_level_3(url_productlist) {

  var gonext = true;

  request(url_productlist, function(error, response, html){

      url_productlist = url_productlist.replace('&allbrands=Y','');

      if(!error){
        var $ = cheerio.load(html);



      $('#resultsProduct > div > a').filter(function(){

        var data = $(this);

        var purl = preurl + data.attr('href') + '\n';

        fs.appendFile('db_productlist_url.txt', purl, function(err) {
          //console.log('');
        });

      });


/*
        $('#middleContainer > div.grid_4 > div > div.stripeOuter > div > div:nth-child(2) > a').filter(function(){
          
          var data = $(this);

          var purl = preurl + data.attr('href') + '\n';


          fs.appendFile('db_cat_level_3.txt', purl, function(err) {
            //console.log('');
          });
          console.log('url:' , purl);     

        });     */
      }
    });

} /* scrap_cat_level_3 */



console.log( 'First param must be URL_TO_LEVEL_3' );
console.log( process.argv[2] );
//appendFile writeFile
fs.appendFile('db_productlist_url.txt', '', function(err) {
  scrap_cat_level_3( process.argv[2] );
});


console.log('scraping, please wait');
exports = module.exports = app;


