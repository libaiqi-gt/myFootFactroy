const state = () => ({
  userInfo: {
    account: '',
    id: '',
    name: '',
    avatar: null,
    password: '',
    createDate: null
  }
});

const getters = {};

const actions = {

};

const mutations = {
  setUser: (state,userObj) => {
    state.userInfo = userObj;
    sessionStorage.setItem("userInfo",JSON.stringify(userObj));
  },
  outLogin: state => {
    state.userInfo = {
      account: '',
      id: '',
      name: '',
      avatar: null,
      password: '',
      createDate: null
    };
    sessionStorage.removeItem("userInfo");
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
