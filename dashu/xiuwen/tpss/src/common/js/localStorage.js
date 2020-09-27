/**
 * Created by liuzhe on 2018/11/12.
 */
let token = {
  setToken(token) {
    localStorage.setItem('DSF-token', token);
  },
  getToken() {
   return localStorage.getItem('DSF-token');
  },
  removeToken() {
    localStorage.removeItem('DSF-token');
  }
};

let departments = {
  setDepartments(departments) {
    localStorage.setItem('departments', departments);
  },
  getDepartments() {
    return localStorage.getItem('departments');
  },
  removeDepartments() {
    localStorage.removeItem('departments');
  }
};

let menu = {
  setMenu(menu) {
    localStorage.setItem('menu', menu);
  },
  getMenu() {
    return localStorage.getItem('menu');
  },
  removeMenu() {
    localStorage.removeItem('menu');
  }
};

let userInfo = {
  setUserInfo(info) {
    localStorage.setItem('DSFUserInfo', info);
  },
  getUserInfo() {
    return localStorage.getItem('DSFUserInfo');
  },
  removeUserInfo() {
    localStorage.removeItem('DSFUserInfo');
  }
};

let codeDependent = {
  setCodeDependent(codeDependent) {
    localStorage.setItem('codeDependent', codeDependent);
  },
  getCodeDependent() {
    return localStorage.getItem('codeDependent');
  },
  removeCodeDependent() {
    localStorage.removeItem('codeDependent');
  }
};

export {
  token,
  departments,
  menu,
  userInfo,
  codeDependent
};
