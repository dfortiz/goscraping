#/bin/bash!
echo 'Starting...'

# &allbrands=Y

# /usr/bin/node process_category_level_2.js http://shop.monkeymoto.com/catalog_items.asp?prodtree=f2-0214-02278

while read p; do
#	echo $p
	/usr/bin/node process_category_level_3.js $p
done <db_cat_level_3.txt


echo 'OK'
