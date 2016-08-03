# Template for Website

Webサイトを作るときの個人用テンプレートです。

## Required / 必要なもの

下記のものは一度PCにインストールしていたらOK。

* git-flow / brew install git-flow
* npm / sudo port install npm
* gulp / npm install -g gulp
* typescript / npm install -g typings
* typings / npm install -g typings

## How to use / 使い方

* クローンしてきたら何はともあれ `./setup.sh`
    * download dependencies.
    * required *git-flow*, *npm*, *gulp*, *typescript*, *typings*.
* 開発するときは `npm start`
    * launch server and files watch
* テストするときは `npm test`
    * karma start
    * required *karma*, *mocha*, *chai*
* 納品ファイルを作成（zipに）するときは `./mkzip.sh`
    * All files? → y: public内全て、n: public内差分
    * Enter commit ID → 差分元のコミットIDを `git log --oneline` などで調べおき入力する。

## Structure / 構成

**dev** folder - contains source files.
**public** folder - contains production files.

## Source folder / 開発用フォルダ内

### sass

* **components** - contains components files.  
* **functions** - contains scss function files.  
* **generics** - contains basic files. ex. reset, normalize  
* **layouts** - contains pages layout files. ex.header, footer, main  
    * **pages** - contains files for each pages.   
* **lib** - contains library files. ex.bootstrap  
* **mixin** - contains scss mixin files.  
* **utility** -contains utility scss files.  
* **settings.scss** - sets variables.  
* **style.scss**
