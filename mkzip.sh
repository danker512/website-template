#!/usr/bin/env bash
echo 'All files? [y/n]'
read all
if [ $all = 'y' ]; then
  git archive --format=zip HEAD:public -o ~/Desktop/public.zip
elif [ $all = 'n' ]; then
  echo 'Enter commit ID'
  read id

  git archive --format=zip HEAD:public `git diff --diff-filter=D --name-only HEAD $id` -o ~/Desktop/public.zip
else
  echo 'Invalid values.'
  exit 1
fi
