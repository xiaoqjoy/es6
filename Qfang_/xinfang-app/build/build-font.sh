#!/bin/bash

if [ -z "$1" ]; then
  echo "Usage:"
  echo "$0 <target-font-name.ttf>"
  exit 1;
fi

SOURCEFONTNAME=../app/assets/fonts/iconfont.ttf
TARGETFONTNAME=../app/assets/fonts/$1

CURDIR=$( cd "$( dirname $0  )" && pwd )
cd $CURDIR

if [ -f "${SOURCEFONTNAME}" ]; then
  echo "Converting font..."
  mv $SOURCEFONTNAME $TARGETFONTNAME
  echo "Mapping..."
  python iconfont-mapper.py ${TARGETFONTNAME} ../app/components/Icon/FontMap.js
  cp ${TARGETFONTNAME} ../android/app/src/main/assets/fonts/
  echo "Convert success."
else
  echo "Error: File no found. Please make sure that the file is accessible - iconfont.ttf."
fi
