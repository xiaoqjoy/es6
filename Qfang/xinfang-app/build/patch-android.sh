#!/bin/bash
# Created by dhg

BUNDLE_DIR=./bundle

ANDROID_BUNDLE_PATH=../QfangJoin/assets/xinfang.android.bundle

ANDROID_MAIN_PATH=./android/app/src/main

NEW_ANDROID_BUNDLE_PATH=${ANDROID_MAIN_PATH}/assets/xinfang.android.bundle

./build/DiffPatch -s ${ANDROID_BUNDLE_PATH} -d ${NEW_ANDROID_BUNDLE_PATH} -o ${BUNDLE_DIR}


mv -f ${BUNDLE_DIR}/xinfang.android.bundle.pat ${BUNDLE_DIR}/xinfang.android.pat

cp -r ${ANDROID_MAIN_PATH}/res/drawable-mdpi  ${BUNDLE_DIR}

cd  ${BUNDLE_DIR}


zip -r xinfang.android.bundle xinfang.android.pat drawable-mdpi/

rm -rf drawable-mdpi xinfang.android.pat






