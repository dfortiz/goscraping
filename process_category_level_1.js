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


function scrap_cat_level_1(url_productlist) {

  var gonext = true;

  request(url_productlist, function(error, response, html){
      if(!error){
        var $ = cheerio.load(html);

        //#middleContainer > div.grid_4 > div > div.stripeOuter > div > div:nth-child(2) > a:nth-child(1)

        $('#middleContainer > div.grid_4 > div > div.stripeOuter > div > div:nth-child(2) > a').filter(function(){
          
          var data = $(this);

          var purl = preurl + data.attr('href') + '\n';

          //processproduct.scrap_product(purl);
          fs.appendFile('db_cat_level_1.txt', purl, function(err) {
            //console.log('');
          });
          console.log('url:' , purl);        

        });
        //var title, release, rating;
        //var nproducts = 1 * $('#resultsHeading > h2 > span > span').text().trim();       
        //var npages = Math.ceil(nproducts / 20);
        //console.log('nproducts:' , nproducts);        
        console.log(url_productlist + ': OK');



      }
    });

} /* scrap_cat_level_1 */



console.log( 'First param must be URL_TO_LEVEL_0' );
console.log( process.argv[2] );
//appendFile writeFile
fs.appendFile('db_cat_level_1.txt', '', function(err) {
  scrap_cat_level_1( process.argv[2] );
});


console.log('scraping, please wait');
exports = module.exports = app;

