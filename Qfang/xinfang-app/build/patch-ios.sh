#!/bin/bash
# Created by dhg


IOS_BUNDLE_PATH=../broker-platform-ios/JMPanKeTong/RNBundle/xinfang/xinfang.jsbundle

NEW_IOS_BUNDLE_PATH=./ios/RNBundle/xinfang.jsbundle

BUNDLE_DIR=./bundle


./build/DiffPatch -s ${IOS_BUNDLE_PATH} -d ${NEW_IOS_BUNDLE_PATH} -o ${BUNDLE_DIR}

mv -f  ${BUNDLE_DIR}/xinfang.jsbundle.pat ${BUNDLE_DIR}/xinfang.pat

cd ${BUNDLE_DIR}


zip -r xinfang.bundle xinfang.pat

rm -r xinfang.pat
