#!/bin/sh
ISERROR=0

which npm > /dev/null 2>&1
if [ $? -ne 0 ] ; then
	echo "command not found: npm"
	echo "please install npm. e.g. sudo port install npm"
	ISERROR=1
fi

which gulp > /dev/null 2>&1
if [ $? -ne 0 ] ; then
	echo "command not found: gulp"
	echo "please install gulp. e.g. npm install -g gulp"
	ISERROR=1
fi

which typings > /dev/null 2>&1
if [ $? -ne 0 ] ; then
	echo "command not found: typings"
	echo "please install typings. e.g. npm install -g typings"
	ISERROR=1
fi

if [ $ISERROR == 1 ] ; then
	exit
fi

rm -rf node_modules typings
npm install
typings install

echo "COMPLETE!!"
