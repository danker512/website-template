#!/bin/sh
ISERROR=0

which git-flow > /dev/null 2>&1
if [ $? -ne 0 ] ; then
	echo "command not found: git-flow"
	echo "please install git-flow. e.g. brew install git-flow"
	ISERROR=1
fi

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

which tsc > /dev/null 2>&1
if [ $? -ne 0 ] ; then
	echo "command not found: typescript"
	echo "please install typescript. e.g. npm install -g typescript"
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

# ##############################
# remove
# ##############################
rm -rf node_modules typings
rm -f dev/sass/demo.scss public/css/demo.css public/css/demo.css.map

# ##############################
# install
# ##############################
npm install
typings install

# ##############################
# Git
# ##############################
echo ""
echo "--------------------------------------------------"
echo ""
echo "A new git repository? (y/n)"
read initialize

if [ $initialize = "y" ]; then
  rm -rf .git
  git init
fi

echo ""
echo "--------------------------------------------------"
echo ""
echo "Use a git flow? (y/n)"
read gitFlow

if [ $gitFlow = "y" ]; then
  git flow init
  sh -c "$(curl -fsSL https://raw.githubusercontent.com/eaglesakura/git-flow-hook/master/installer/install-hooks.sh)"
fi


echo "Completed \xF0\x9f\x8d\xba \xF0\x9f\x8d\xba";
