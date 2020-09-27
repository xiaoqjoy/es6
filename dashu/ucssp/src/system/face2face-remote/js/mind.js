/**
 * 监测是否含有否决-其他项
 * @param {Array}
 * @returns {Boloon} true表示含有,false表示不含有
 */
export function filterOH1(_list) {
  if (!(_list instanceof Array)) {
    console.error(`filterOH1 handler argument _list is not a Array`);
    throw new Error('filterOH1 handler argument _list is not a Array');
  }
  if (_list.length === 0) {
    return false;
  }
  for (let i = 0; i < _list.length; i++) {
    if (_list[i].code === 'OH1') {
      return true;
    }
  }
  return false;
};
