#!/usr/bin/env bash

echo 'All files? [y/n]'
read all

# ファイル一式の場合
if [ $all = 'y' ]; then
  git archive --format=zip --prefix=public/ HEAD:public -o ~/Desktop/public.$(date +"%y%m%d%H%M").zip
# 差分ファイルの場合
elif [ $all = 'n' ]; then
  echo 'Enter commit ID'
  read commitID
  git archive --format=zip --prefix=public/ HEAD:public $(git diff --diff-filter=D --name-only HEAD:public ${commitID}) -o ~/Desktop/public.$(date +"%y%m%d%H%M").zip
# 不正な値が入力された場合
else
  echo 'Invalid values.'
  exit 1
fi
