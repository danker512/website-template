#!/bin/sh
ISERROR=0

which git-flow > /dev/null 2>&1
if [ $? -ne 0 ] ; then
	echo "command not found: git-flow"
	echo "please install npm. e.g. brew install git-flow"
	ISERROR=1
fi

# eaglesakura/git-flow-hook
# https://github.com/eaglesakura/git-flow-hook
which git-flow-fook > /dev/null 2>&1
if [ $? -ne 0 ] ; then
	echo "command not found: git-flow-hook"
	echo "please install git-flow-hook. see https://github.com/eaglesakura/git-flow-hook"
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
rm -rf node_modules typings .git

# ##############################
# install
# ##############################
npm install
typings install
echo "INSTALL COMPLETE!!"

# ##############################
# Git
# ##############################
git flow init
sh -c "$(curl -fsSL https://raw.githubusercontent.com/eaglesakura/git-flow-hook/master/installer/install-hooks.sh)"
