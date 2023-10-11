import { PageContainer, ProTable } from '@ant-design/pro-components';
import { useDispatch, useSelector } from '@umijs/max';
import { Button, Modal, Popconfirm, Switch, Tag } from 'antd';
import { message } from 'antd/lib';
import { useEffect, useState } from 'react';
import AdminForm from './components/adminForm';

function Admin() {
  // 从仓库获取管理员数据
  const { adminList } = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  // 存储当前要修改的管理员信息
  const [adminInfo, setAdminInfo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!adminList.length) {
      dispatch({
        type: 'admin/_initAdminList',
      });
    }
  }, [adminList]);

  // 对应表格的每一列配置
  const columns = [
    {
      title: '登录账号',
      dataIndex: 'loginId',
      key: 'loginId',
      align: 'center',
    },
    {
      title: '登录密码',
      dataIndex: 'loginPwd',
      key: 'loginPwd',
      align: 'center',
    },
    {
      title: '昵称',
      dataIndex: 'nickname',
      key: 'nickname',
      align: 'center',
    },
    {
      title: '头像',
      dataIndex: 'avatar',
      key: 'avatar',
      valueType: 'image',
      align: 'center',
    },
    {
      title: '权限',
      dataIndex: 'permission',
      key: 'permission',
      align: 'center',
      render: (_, row) => {
        return row.permission === 1 ? (
          <Tag color="orange" key={row._id}>
            超级管理员
          </Tag>
        ) : (
          <Tag color="blue" key={row._id}>
            普通管理员
          </Tag>
        );
      },
    },
    {
      title: '账号状态',
      dataIndex: 'enabled',
      key: 'enabled',
      align: 'center',
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
      width: 150,
      dataIndex: 'option',
      key: 'option',
      valueType: 'option',
      align: 'center',
      render: (_, row) => {
        return (
          <div key={row._id}>
            <Button type="link" size="small" onClick={() => showModal(row)}>
              编辑
            </Button>
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
          </div>
        );
      },
    },
  ];

  /**
   * 删除管理员
   */
  function handleDelete(adminInfo) {
    dispatch({
      type: 'admin/_deleteAdmin',
      payload: adminInfo,
    });
    message.success('该管理员已删除');
  }

  /**
   * 修改管理员的可用状态
   * @param {*} row 当前这一条管理员信息
   * @param {*} value 新的可用状态
   */
  function switchChange(row, value) {
    dispatch({
      type: 'admin/_editAdmin',
      payload: {
        adminInfo: row,
        newAdminInfo: {
          enabled: value,
        },
      },
    });
    if (value) {
      message.success('管理员状态已激活');
    } else {
      message.success('该管理员已被禁用');
    }
  }

  /**
   * 打开修改对话框
   */
  function showModal(row) {
    setAdminInfo(row);
    setIsModalOpen(true);
  }

  const handleOk = () => {
    dispatch({
      type: 'admin/_editAdmin',
      payload: {
        adminInfo,
        newAdminInfo: adminInfo,
      },
    });
    message.success('信息修改成功');
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <PageContainer>
        <ProTable
          headerTitle="管理员列表"
          dataSource={adminList}
          columns={columns}
          rowKey={(row) => row._id}
          search={false}
          pagination={{
            pageSize: 5,
          }}
        />
      </PageContainer>
      {/* 修改面板 */}
      {/* 修改管理员信息 */}
      <Modal
        title="修改管理员信息"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        style={{ top: 70 }}
        footer={false}
      >
        <AdminForm
          type="edit"
          handleSubmit={handleOk}
          adminInfo={adminInfo}
          setAdminInfo={setAdminInfo}
        />
      </Modal>
    </>
  );
}

export default Admin;
