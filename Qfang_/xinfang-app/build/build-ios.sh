#!/bin/bash
# Created by ljf

IOSDIR=../broker-platform-ios
cp -r ios/RNBundle/xinfang.* ${IOSDIR}/JMPanKeTong/RNBundle/xinfang/
cp -r ios/RNBundle/assets ${IOSDIR}/JMPanKeTong/RNBundle/
cp -r app/assets/fonts/*.* ${IOSDIR}/JMPanKeTong/RNBundle/xinfang/

cd ${IOSDIR}
./build.sh release
