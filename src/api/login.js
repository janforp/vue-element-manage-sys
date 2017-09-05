export default {
  loginInfo:null,
  /**
   * 把登录成功之后的用户信息存入到 cookie
   * @param user
   */
  setUserInfoToCookie:function(user) {
    this.loginInfo = user;
    const userStr = JSON.stringify(user);
    Cookies.set("loginInfo", userStr);
  },

  /**
   * 获取登录用户的信息
   */
  getUserInfo:function () {
    if (this.loginInfo !== null) {
      return this.loginInfo;
    }else {
      this.loginInfo = JSON.parse(Cookies.get("loginInfo"));
      if (this.loginInfo !== undefined) {
        return this.loginInfo;
      }
      alert("用户信息空")
    }
  }
}
