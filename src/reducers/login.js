
const defaultState = {
    isLoggedIn: false,
    username: '',
    password: '',
    mobile: '',
    token:'' ,
    nik:'',
    status:'',
    instakey: '',
    regkey: '',
    registeredname: '',
    registerednik: '',
    instance: ''
  };


function reducerLogin(state = defaultState, action) {
    switch (action.type) {
        case 'LOGIN': 
            return Object.assign({}, state, { 
                isLoggedIn: true,
                username: action.username,
                password: action.password,
                mobile: action.mobile,
                token: action.token
            });
        case 'LOGOUT':            
                state = undefined;           
            // return Object.assign({}, state, { 
            //     //isLoggedIn: false,
            //     // username: '',
            //     // password: '',
            //     // token: ''
            //     state : undefined
            // });   
        case 'SIGNUP':
            return Object.assign({}, state, { 
                isLoggedIn: true,
                username: action.username,
                password: action.password,
                mobile: action.mobile,
                instakey: action.instakey,
                token: action.token
            });   
        case 'REGISTERAPPROVAL':
            return Object.assign({}, state, {
                isLoggedIn: true,
                token: action.token,
                regkey: action.regkey,
                registeredname: action.registeredname,
                registerednik: action.registerednik,
                instance: action.instance
            });
        default:
            return state;
    }
  }
  
  
  export default reducerLogin;  