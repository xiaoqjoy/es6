
// 身份证号码的脱敏显示
export function certificateNum(val) {
  if (val) {
    val = val.split("");
    val.splice(6, 8, "********");
    return val.join("");
  }
};
