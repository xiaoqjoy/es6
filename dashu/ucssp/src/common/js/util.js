// 获取字符串字符长度
export const getStrLen = (_val) => {
  let str = _val.toString();
  let count = 0;
  for (let i = 0; i < str.length; i++) {
    let c = str.charCodeAt(i);
    if ((c > 0x0001 && c <= 0x007e) || (c >= 0xff60 && c <= 0xff9f)) { // 这里是16进制表示，也可以用十进制
      count = count + 1;
    } else {
      count = count + 2;
    }
  }
  return count;
};

export function getLS(key) {
  if (typeof key === 'string' && key !== '') {
    let value = window.localStorage.getItem(key);
    return value ? JSON.parse(value) : value;
  }
}

export function setLS(key, value) {
  if (typeof value !== 'undefined') {
    return window.localStorage.setItem(key, JSON.stringify(value));
  }
}

export function getAllLSDicts() { // 获取localStorage里面的字典key
  let dictList = [];
  for (var i = 0; i < window.localStorage.length; i++) {
    var key = window.localStorage.key(i); // 获取本地存储的Key
    if (key && key.startsWith('dict|')) {
      dictList.push(key);
    }
  }
  return dictList;
}

/**
 * get position of input cursor
 */
export function getCursorsPosition(ctrl) {
  /* istanbul ignore if */
  if (!ctrl) {
    return 0;
  }
  let CaretPos = 0; // IE Support
  /* istanbul ignore next */
  if (document.selection) {
    ctrl.focus();
    const Sel = document.selection.createRange();
    Sel.moveStart('character', -ctrl.value.length);
    CaretPos = Sel.text.length;
  } else if (ctrl.selectionStart || ctrl.selectionStart === '0') {
    // Firefox support
    CaretPos = ctrl.selectionStart;
  }
  return CaretPos;
}

let timer = null;
/**
 * set position of input cursor
 */
export function setCursorsPosition(ctrl, pos) {
  /* istanbul ignore if */
  if (!ctrl) {
    return;
  }
  /* istanbul ignore if */
  if (timer) {
    clearTimeout(timer);
  }

  timer = setTimeout(() => {
    /* istanbul ignore next */
    if (ctrl.setSelectionRange) {
      ctrl.focus();
      ctrl.setSelectionRange(pos, pos);
    } else if (ctrl.createTextRange) {
      const range = ctrl.createTextRange();
      range.collapse(true);
      range.moveEnd('character', pos);
      range.moveStart('character', pos);
      range.select();
    }
  }, 50);
}
