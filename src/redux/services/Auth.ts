// import React from "react";

class Auth {
  public authenticated: boolean;

  constructor() {
    this.authenticated = false;
  }

  login(cb?: any): any {
    this.authenticated = true;
    cb();
  }

  logout(callBack?: any): any {
    this.authenticated = false;
    callBack();
    localStorage.clear();
  }

  isAuthenticated(): any {
    if (localStorage.getItem('user') != null) {
      this.authenticated = true;
    } else {
      this.authenticated = false;
    }
    return this.authenticated;
  }

  getAccessToken = (): any => {
    const user = localStorage.getItem('user');
    if (user !== null) {
      return JSON.parse(user).data.sessionToken;
    }
    return '';
  };

  getUser = (): any => {
    const user = localStorage.getItem('user');
    if (user !== null) {
      return JSON.parse(user);
    }
    return '';
  };
}

export default new Auth();
