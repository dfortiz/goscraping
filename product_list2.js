var express = require('express');
var fs      = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var sleep = require('sleep');

var app     = express();

var processproduct = require('./processproduct.js'); //or includes2.js, works the same but differnt style.

//http://shop.monkeymoto.com/catalog_items.asp?prodtree=f2-028-0235-021482&pagenum=5

preurl = 'http://shop.monkeymoto.com';
//url = 'http://shop.monkeymoto.com/catalog_items.asp?prodtree=f2-028-0235-021482';
url = 'http://shop.monkeymoto.com/catalog_items.asp?prodtree=f2-028-0235-021482&pagenum=5';

url1 = 'http://shop.monkeymoto.com/catalog_items.asp?prodtree=f2-028-0235-021482&pagenum=';

function scrap_product_list(url_productlist) {
  
  request(url_productlist, function(error, response, html){
    if(!error){
      var $ = cheerio.load(html);

      var title, release, rating;

      var jsonproduct = { name : "", info1 : "", info2 : "", thumb : [], variation : [], urlerror : "" };

      $('#resultsProduct > div > a').filter(function(){

        var data = $(this);

        var purl = preurl + data.attr('href')

        processproduct.scrap_product(purl);

        console.log(purl);

      });

      console.log('link processed ####');

    }
  });

} /* scrap_product_list */

function scrap_product_pages_list(url_productlist) {

  var gonext = true;

  request(url_productlist, function(error, response, html){
      if(!error){
        var $ = cheerio.load(html);

        var title, release, rating;

        var jsonproduct = { name : "", info1 : "", info2 : "", thumb : [], variation : []};

        var nproducts = 1 * $('#resultsHeading > h2 > span > span').text().trim();
        
        var npages = Math.ceil(nproducts / 20);

        console.log('nproducts:' , nproducts);
        
        console.log('npages:' , npages);

        for ( var ipage = 1; ipage <= npages; ipage++) {

          scrap_product_list(url_productlist + ipage );

        }

      }
    });

} /* scrap_product_pages_list */


//console.log( scrap_product_list(url1) );

  fs.writeFile('output.json', '', function(err) {
  
    scrap_product_pages_list(url1);

  });

//http://shop.monkeymoto.com/catalog_items.asp?prodtree=f2-024-0215-02857

console.log('scraping, please wait');
exports = module.exports = app;

