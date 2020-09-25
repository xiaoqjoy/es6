import { getLS } from "@common/js/util.js";

// 身份证号码的脱敏显示
export function certificateNum(val) {
  if (val) {
    val = val.split("");
    val.splice(6, 8, "********");
    return val.join("");
  }
};

// 字典都缓存在localstorage里面(目前不是所有的字典都有缓存)
export function dict(dictKey = '', ...dictNameList) {
  if (!dictKey || dictNameList.length === 0) {
    return dictKey;
  }
  let targetDictItem;
  dictNameList.find(dictName => {
    const dictionary = getLS(`dict|${dictName}`) || [];
    targetDictItem = dictionary.find(item => item.itemCode === dictKey);
    return targetDictItem;
  });
  return targetDictItem ? targetDictItem.itemDesc : dictKey;
};
