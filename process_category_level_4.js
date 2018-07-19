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


        var nproducts = 1 * $('#resultsHeading > h2 > span > span').text().trim();
        
        var npages = Math.ceil(nproducts / 20);

        console.log('nproducts:' , nproducts);
        
        console.log('npages:' , npages);

        for ( var ipage = 1; ipage <= npages; ipage++) {

          console.log('URL:' , url_productlist  + '&pagenum=' + ipage);

          //fs.appendFile('db_cat_level_4.txt', url_productlist  + '&pagenum=' + ipage + '\n', function(err) {
            //console.log('');
          //});

        }



      }
    });

} /* scrap_cat_level_3 */



console.log( 'First param must be URL_TO_LEVEL_4' );
console.log( process.argv[2] );
//appendFile writeFile
fs.appendFile('db_cat_level_4.txt', '', function(err) {
  scrap_cat_level_4( process.argv[2] );
});


console.log('scraping, please wait');
exports = module.exports = app;


