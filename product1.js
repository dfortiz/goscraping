var express = require('express');
var fs      = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();



url = 'http://shop.monkeymoto.com/eshopprod_cat_9911-42373_prodtree_f2-028-0235-021482_product_2387149.ACERBIS_OFFROAD_SKID_PLATES.htm';

function scrap_product(url_product) {

  request(url_product, function(error, response, html){
    if(!error){
      var $ = cheerio.load(html);

      var title, release, rating;

      var jsonproduct = { name : "", info1 : "", info2 : "", cat1 : "", cat2 : "", cat3 : "", manufacturercode : "", thumb : [], variation : []};

      jsonproduct.name = $('#stripeOuter > div > h4').text().trim();

      jsonproduct.info1 = $('#stripeOuter > div > div.productInfo').text().trim().replace('PRODUCT INFORMATION','');

      jsonproduct.cat1 = $('#youSelectedItem > a:nth-child(2)').text().trim();
      jsonproduct.cat2 = $('#youSelectedItem > a:nth-child(3)').text().trim();
      jsonproduct.cat3 = $('#youSelectedItem > a:nth-child(4)').text().trim();
      jsonproduct.manufacturercode = $('#margin0 > div > div.stripeInner.innerShadow > div > form > div > input[name="ManufacturerCode"]').first().val();
  

      // #margin0 > div > div.stripeInner.innerShadow > div > form > div > input[type="hidden"]:nth-child(10)

      $('#margin0 > div > div.stripeInner.innerShadow > div > form > div').filter(function(){

        var data = $(this);

        var variation = { skucode : "", skuname : "", skuprice : ""};

        variation.skuname = data.children('.itemTbl282').children('span').text();

        variation.skucode = data.children('.itemTbl282').children('div').text().trim().replace('product # ', '');        

        variation.skuprice = data.children('.itemTbl90').text().trim();

        jsonproduct.variation.push(variation);

        //console.log(variation);
      });

      
      $('#stripeOuter > div > div.grid_6.floatRt > div.product > div.productThumbs a > img').filter(function(){

          var data = $(this);
        
          jsonproduct.thumb.push(data.attr('src'));

          //console.log(thumb);
      });

      console.log(jsonproduct);

    }

    //fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){
    //fs.appendFile('output.json', JSON.stringify(arr), function(err){
    fs.writeFile('output.json', JSON.stringify(jsonproduct), function(err){
      console.log('File successfully written! - Check your project directory for the output.json file');
    });

  });

} /* scrap_product */

scrap_product(url);

//http://shop.monkeymoto.com/catalog_items.asp?prodtree=f2-024-0215-02857



console.log('scraping, please wait');
exports = module.exports = app;

