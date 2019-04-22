export const login = (username, password, mobile, token) => {
    return {
        type: 'LOGIN',
        username: username,
        password: password,
        mobile: mobile,
        token: token
    };
  };
  
  export const logout = () => {
    return {
        type: 'LOGOUT',
    };
  };
  
  export const signup = (username, password, mobile,instakey,token) => {
    return {
      type: 'SIGNUP',
      username: username,
      password: password,
      mobile: mobile,
      instakey: instakey,
      token: token
    };
  };

  export const registerApproval = (token,regkey,registeredname,registerednik,instance) => {
    return{
      type: 'REGISTERAPPROVAL',
      token: token,
      regkey: regkey,
      registeredname: registeredname,
      registerednik: registerednik,
      instance: instance
    };
  };