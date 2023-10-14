import UserController from '@/services/user';
import { formatDate } from '@/utils/tool';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Access, useAccess, useNavigate } from '@umijs/max';
import { Button, Image, Modal, Popconfirm, Switch, Tag } from 'antd';
import { message } from 'antd/lib';
import { useRef, useState } from 'react';

function User(props) {
  const actionRef = useRef();
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5,
  });
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const access = useAccess();

  const columns = [
    {
      title: '序号',
      width: 50,
      align: 'center',
      search: false,
      render: (_, row, index) => {
        return index + 1 + (pagination.current - 1) * pagination.pageSize;
      },
    },
    {
      title: '登录账号',
      dataIndex: 'loginId',
      align: 'center',
    },
    {
      title: '登录密码',
      dataIndex: 'loginPwd',
      align: 'center',
      search: false,
    },
    {
      title: '昵称',
      dataIndex: 'nickname',
      align: 'center',
    },
    {
      title: '头像',
      dataIndex: 'avatar',
      valueType: 'image',
      align: 'center',
      search: false,
    },
    {
      title: '账号状态',
      align: 'center',
      search: false,
      render: (_, row) => {
        return (
          <Switch
            key={row._id}
            defaultChecked={row.enabled ? true : false}
            size="small"
            onChange={(value) => switchChange(row, value)}
          />
        );
      },
    },
    {
      title: '操作',
      width: 200,
      align: 'center',
      search: false,
      render: (_, row) => {
        return (
          <div>
            <Button type="link" size="small" onClick={() => showModal(row)}>
              详情
            </Button>
            <Button
              type="link"
              size="small"
              onClick={() => navigate(`/user/editUser/${row?._id}`)}
            >
              编辑
            </Button>
            <Access accessible={access.SuperAdmin}>
              <Popconfirm
                title="你确定要删除？"
                onConfirm={() => handleDelete(row)}
                okText="删除"
                cancelText="取消"
              >
                <Button type="link" size="small">
                  删除
                </Button>
              </Popconfirm>
            </Access>
          </div>
        );
      },
    },
  ];

  /**
   * 删除用户
   * @param {*} userInfo 一条用户信息
   */
  function handleDelete(userInfo) {
    UserController.deleteUser(userInfo._id);
    actionRef.current.reload(); // 再次刷新请求
    message.success('删除用户成功');
  }

  /**
   * 修改用户的可用状态
   * @param {*} row 当前这一条用户信息
   * @param {*} value 新的可用状态
   */
  function switchChange(row, value) {
    // 不同于管理员，这里直接通过控制器来发请求
    UserController.editUser(row._id, {
      enabled: value,
    });

    if (value) {
      message.success('用户状态已激活');
    } else {
      message.success('该用户已被禁用');
    }
  }

  /**
   *
   * @param {*} page 当前页
   * @param {*} pageSize 每页条数
   */
  function handlePageChange(current, pageSize) {
    setPagination({
      current,
      pageSize,
    });
  }

  /**
   * 打开修改对话框
   */
  function showModal(row) {
    setUserInfo(row);
    setIsModalOpen(true);
  }

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <PageContainer>
        <ProTable
          headerTitle="用户列表"
          actionRef={actionRef}
          columns={columns}
          rowKey={(row) => row._id}
          pagination={{
            showQuickJumper: true,
            showSizeChanger: true,
            pageSizeOptions: [5, 10, 20, 50, 100],
            ...pagination,
            onChange: handlePageChange,
          }}
          request={async (params) => {
            const response = await UserController.getUserByPage(params);
            return {
              data: response.data.data,
              // success 请返回 true，
              // 不然 table 会停止解析数据，即使有数据
              success: !response.code,
              // 不传会使用 data 的长度，如果是分页一定要传
              total: response.data.count,
            };
          }}
        />
      </PageContainer>
      {/* 用户详情信息 */}
      <Modal
        title={userInfo?.nickname}
        open={isModalOpen}
        onCancel={handleCancel}
        style={{ top: 20 }}
        footer={false}
      >
        <h3>登录账号</h3>
        <p>
          <Tag color="red">{userInfo?.loginId}</Tag>
        </p>
        <h3>登录密码</h3>
        <p>
          <Tag color="magenta">{userInfo?.loginPwd}</Tag>
        </p>
        <h3>当前头像</h3>
        <Image src={userInfo?.avatar} width={60} />

        <h3>联系方式</h3>
        <div
          style={{
            display: 'flex',
            width: '350px',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <h4>QQ</h4>
            <p>{userInfo?.qq ? userInfo.qq : '未填写'}</p>
          </div>
          <div>
            <h4>微信</h4>
            <p>{userInfo?.wechat ? userInfo.wechat : '未填写'}</p>
          </div>
          <div>
            <h4>邮箱</h4>
            <p>{userInfo?.mail ? userInfo.mail : '未填写'}</p>
          </div>
        </div>
        <h3>个人简介</h3>
        <p>{userInfo?.intro ? userInfo.intro : '未填写'}</p>
        <h3>时间信息</h3>
        <div
          style={{
            display: 'flex',
            width: '450px',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <h4>注册时间</h4>
            <p>{formatDate(userInfo?.registerDate)}</p>
          </div>
          <div>
            <h4>上次登录</h4>
            <p>{formatDate(userInfo?.lastLoginDate)}</p>
          </div>
        </div>
        <h3>当前积分</h3>
        <p>{userInfo?.points} 分</p>
      </Modal>
    </>
  );
}

export default User;
