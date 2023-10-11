import {
  addAdminApi,
  deleteAdminApi,
  editAdminApi,
  getAdminApi,
  getAdminByIdApi,
} from '../services/admin';

export default {
  // 命名空间
  namespace: 'admin',
  // 仓库数据
  state: {
    adminList: [], // 存储所有的管理员信息
  },
  // 处理异步副作用
  effects: {
    // 初始化管理员列表
    *_initAdminList(_, { call, put }) {
      // 和服务器进行通信，拿到所有数据
      const { data } = yield call(getAdminApi);

      // 调用 reducer 更新本地仓库
      yield put({
        type: 'initAdminList',
        payload: data,
      });
    },
    // 新增管理员
    *_addAdmin({ payload }, { call, put }) {
      // 和服务器通信，进行新增
      const { data } = yield call(addAdminApi, payload);
      // 调用 reducer 方法更新本地仓库
      yield put({ type: 'addAdmin', payload: data });
    },
    // 删除管理员
    *_deleteAdmin({ payload }, { call, put }) {
      // 和服务器通信，进行删除
      yield call(deleteAdminApi, payload._id);
      // 本地仓库也需要同步更新
      yield put({ type: 'deleteAdmin', payload });
    },
    // 修改管理员信息
    *_editAdmin({ payload }, { call, put }) {
      // 和服务器通信，进行修改
      yield call(editAdminApi, payload.adminInfo._id, payload.newAdminInfo);
      // 从服务器获取该 id 的管理员最新的数据
      const { data } = yield call(getAdminByIdApi, payload.adminInfo._id);
      yield put({ type: 'updateAdmin', payload: data });
    },
  },
  // 同步更新仓库状态数据
  reducers: {
    // 初始化管理员列表
    initAdminList(state, { payload }) {
      let newState = { ...state };
      newState.adminList = payload;
      return newState;
    },
    deleteAdmin: (state, { payload }) => {
      const newObj = { ...state };
      const index = newObj.adminList.indexOf(payload);
      const arr = [...state.adminList];
      arr.splice(index, 1);
      newObj.adminList = arr;
      return newObj;
    },
    updateAdmin: (state, { payload }) => {
      const newObj = { ...state };
      const admin = newObj.adminList.find((item) => item._id === payload._id);
      for (let key in payload) {
        if (payload.hasOwnProperty(key)) {
          admin[key] = payload[key];
        }
      }
      return newObj;
    },
    addAdmin: (state, { payload }) => {
      const newState = { ...state };
      const arr = [...state.adminList];
      arr.push(payload);
      newState.adminList = arr;
      return newState;
    },
  },
};
