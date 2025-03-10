import { getStore, setStore } from "@/util/store";
import { isURL, validatenull } from "@/util/validate";
import {
  loginByMobile,
  loginBySocial,
  login,
  getUserInfo,
  logout,
  refreshToken,
} from "@/api/login";
import { deepClone, encryption } from "@/util/util";
import webiste from "@/const/website";
import { resetRouter } from "@/router/router";
import { getMenu, getTopMenu } from "@/api/admin/menu";

function addPath(ele, first) {
  const menu = webiste.menu;
  const propsConfig = menu.props;
  const propsDefault = {
    label: propsConfig.label || "name",
    path: propsConfig.path || "path",
    icon: propsConfig.icon || "icon",
    children: propsConfig.children || "children",
  };
  const icon = ele[propsDefault.icon];
  ele[propsDefault.icon] = validatenull(icon) ? menu.iconDefault : icon;
  const isChild =
    ele[propsDefault.children] && ele[propsDefault.children].length !== 0;
  if (!isChild) ele[propsDefault.children] = [];
  if (!isChild && first && !isURL(ele[propsDefault.path])) {
    ele[propsDefault.path] = ele[propsDefault.path] + "/index";
  } else {
    ele[propsDefault.children].forEach((child) => {
      addPath(child);
    });
  }
}

const user = {
  state: {
    userInfo:
      getStore({
        name: "userInfo",
      }) || {},
    permissions:
      getStore({
        name: "permissions",
      }) || [],
    roles: [],
    menu:
      getStore({
        name: "menu",
      }) || [],
    menuAll: [],
    expires_in:
      getStore({
        name: "expires_in",
      }) || "",
    sfFirst: getStore({
      name: "sfFirst",
    }), //  0:第一次 1:不是第一次
    access_token:
      getStore({
        name: "access_token",
      }) || "",
    refresh_token:
      getStore({
        name: "refresh_token",
      }) || "",
  },
  actions: {
    // 根据用户名登录
    LoginByUsername({ commit }, userInfo) {
      // const user = encryption({
      //   data: userInfo,
      //   key: 'pigxpigxpigxpigx',
      //   param: ['password']
      // })
      return new Promise((resolve, reject) => {
        login(userInfo)
          .then((response) => {
            const data = response;
            commit("SET_ACCESS_TOKEN", data.access_token);
            commit("SET_REFRESH_TOKEN", data.refresh_token);
            commit("SET_EXPIRES_IN", data.expires_in);
            commit("SET_SF_FIRST", data.sfFirst);
            commit("SET_USER_INFO", data);
            commit("SET_PERMISSIONS", data.authorities || []);
            commit("CLEAR_LOCK");
            resolve();
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    // 根据手机号登录
    LoginByPhone({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        loginByMobile(userInfo.mobile, userInfo.code)
          .then((response) => {
            const data = response.data;
            commit("SET_ACCESS_TOKEN", data.access_token);
            commit("SET_REFRESH_TOKEN", data.refresh_token);
            commit("SET_EXPIRES_IN", data.expires_in);
            commit("SET_USER_INFO", data.user_info);
            commit("SET_PERMISSIONS", data.user_info.authorities || []);
            commit("CLEAR_LOCK");
            resolve();
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    // 根据OpenId登录
    LoginBySocial({ commit }, param) {
      return new Promise((resolve, reject) => {
        loginBySocial(param.state, param.code)
          .then((response) => {
            const data = response.data;
            commit("SET_ACCESS_TOKEN", data.access_token);
            commit("SET_REFRESH_TOKEN", data.refresh_token);
            commit("SET_EXPIRES_IN", data.expires_in);
            commit("SET_USER_INFO", data.user_info);
            commit("SET_PERMISSIONS", data.user_info.authorities || []);
            commit("CLEAR_LOCK");
            resolve();
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    // 刷新token
    RefreshToken({ commit, state }) {
      return new Promise((resolve, reject) => {
        refreshToken(state.refresh_token)
          .then((response) => {
            const data = response.data;
            commit("SET_ACCESS_TOKEN", data.access_token);
            commit("SET_REFRESH_TOKEN", data.refresh_token);
            commit("SET_EXPIRES_IN", data.expires_in);
            commit("CLEAR_LOCK");
            resolve();
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    // 查询用户信息
    GetUserInfo({ commit }) {
      return new Promise((resolve, reject) => {
        getUserInfo()
          .then((res) => {
            const data = res || {};
            commit("SET_USER_INFO", data);
            commit("SET_ROLES", data.roles || []);
            commit("UPDATE_PERMISSIONS", data.permissions || []);
            resolve(data);
          })
          .catch(() => {
            reject();
          });
      });
    },
    // 登出
    LogOut({ commit }) {
      return new Promise((resolve, reject) => {
        logout()
          .then(() => {
            resetRouter();
            commit("SET_MENU", []);
            commit("SET_PERMISSIONS", []);
            commit("SET_USER_INFO", {});
            commit("SET_ACCESS_TOKEN", "");
            commit("SET_REFRESH_TOKEN", "");
            commit("SET_EXPIRES_IN", "");
            commit("SET_SF_FIRST", 1);

            commit("SET_ROLES", []);
            commit("DEL_ALL_TAG");
            commit("CLEAR_LOCK");
            resolve();
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    // 注销session
    FedLogOut({ commit }) {
      return new Promise((resolve) => {
        resetRouter();
        commit("SET_MENU", []);
        commit("SET_PERMISSIONS", []);
        commit("SET_USER_INFO", {});
        commit("SET_ACCESS_TOKEN", "");
        commit("SET_REFRESH_TOKEN", "");
        commit("SET_ROLES", []);
        commit("DEL_ALL_TAG");
        commit("CLEAR_LOCK");
        resolve();
      });
    },
    // 获取系统菜单
    GetMenu({ commit }, obj) {
      return new Promise((resolve) => {
        getMenu(obj.id).then((res) => {
          const data = res;
          const menu = deepClone(data);
          menu.forEach((ele) => {
            addPath(ele);
          });
          let type = obj.type;
          commit("SET_MENU", { type, menu });
          resolve(menu);
        });
      });
    },
    //顶部菜单
    GetTopMenu() {
      return new Promise((resolve) => {
        getTopMenu().then((res) => {
          const data = res || [];
          resolve(data);
        });
      });
    },
  },
  mutations: {
    SET_ACCESS_TOKEN: (state, access_token) => {
      state.access_token = access_token;
      setStore({
        name: "access_token",
        content: state.access_token,
        type: "session",
      });
    },
    SET_EXPIRES_IN: (state, expires_in) => {
      state.expires_in = expires_in;
      setStore({
        name: "expires_in",
        content: state.expires_in,
        type: "session",
      });
    },

    SET_SF_FIRST: (state, sfFirst) => {
      state.sfFirst = sfFirst;
      setStore({
        name: "sfFirst",
        content: state.sfFirst,
        type: "session",
      });
    },
    SET_REFRESH_TOKEN: (state, rfToken) => {
      state.refresh_token = rfToken;
      setStore({
        name: "refresh_token",
        content: state.refresh_token,
        type: "session",
      });
    },
    SET_USER_INFO: (state, userInfo) => {
      state.userInfo = userInfo;
      setStore({
        name: "userInfo",
        content: userInfo,
        type: "session",
      });
    },
    SET_MENU: (state, params = {}) => {
      let { menu, type } = params;
      if (type !== false) state.menu = menu;
      setStore({
        name: "menu",
        content: menu,
        type: "session",
      });
    },
    SET_MENU_ALL: (state, menuAll) => {
      state.menuAll = menuAll;
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles.map((role) => role);
    },
    SET_PERMISSIONS: (state, permissions) => {
      const list = {};
      for (let i = 0; i < permissions.length; i++) {
        list[permissions[i].authority] = true;
      }

      state.permissions = list;
      setStore({
        name: "permissions",
        content: list,
        type: "session",
      });
    },
    UPDATE_PERMISSIONS: (state, permissions) => {
      const list = {};
      for (let i = 0; i < permissions.length; i++) {
        list[permissions[i]] = true;
      }

      state.permissions = list;
      setStore({
        name: "permissions",
        content: list,
        type: "session",
      });
    },
  },
};
export default user;
