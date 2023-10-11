import { PageContainer } from '@ant-design/pro-components';
import { useDispatch, useNavigate, useSelector } from '@umijs/max';
import { message } from 'antd/lib';
import { useEffect, useState } from 'react';
import AdminForm from './components/adminForm';

function AddAdmin() {
  const [newAdminInfo, setNewAdminInfo] = useState({
    loginId: '',
    loginPwd: '',
    nickname: '',
    avatar: '',
    permission: 2,
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { adminList } = useSelector((state) => state.admin);

  useEffect(() => {
    if (!adminList.length) {
      dispatch({
        type: 'admin/_initAdminList',
      });
    }
  }, [adminList]);

  // 用户点击新建按钮
  function handleSubmit() {
    if (newAdminInfo.loginId) {
      dispatch({ type: 'admin/_addAdmin', payload: newAdminInfo });
      message.success('添加管理员成功');
      // 跳转回首页
      navigate('/admin/adminList');
    }
  }

  return (
    <PageContainer>
      <div className="container" style={{ width: 500 }}>
        <AdminForm
          type="add"
          handleSubmit={handleSubmit}
          adminInfo={newAdminInfo}
          setAdminInfo={setNewAdminInfo}
        />
      </div>
    </PageContainer>
  );
}

export default AddAdmin;
