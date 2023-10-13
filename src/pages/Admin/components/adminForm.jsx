import { adminIsExistApi } from '@/services/admin';
import { Button, Form, Image, Input, Radio, Upload } from 'antd';
import { useEffect, useRef } from 'react';
import { Icon } from 'umi';

/**
 * 封装新增管理员和修改管理员的公共表单组件
 */
function AdminForm({ type, handleSubmit, adminInfo, setAdminInfo }) {
  let formRef = useRef();
  // 数据回填
  useEffect(() => {
    if (formRef.current) {
      formRef.current.setFieldsValue(adminInfo);
    }
  }, [adminInfo]);

  // 头像容器
  let avatarPreview = null;
  if (type === 'edit') {
    avatarPreview = (
      <Form.Item label="当前头像" name="avatarPreview">
        <Image src={adminInfo.avatar} width={100} />
      </Form.Item>
    );
  }

  // 用户填写内容时更新表单控件内容
  function updateInfo(newInfo, key) {
    const newAdminInfo = { ...adminInfo };
    if (typeof newInfo === 'string') {
      newAdminInfo[key] = newInfo.trim();
    } else {
      newAdminInfo[key] = newInfo;
    }
    setAdminInfo(newAdminInfo);
  }

  /**
   * 验证登录账号是否存在
   */
  async function checkLoginIdIsExist() {
    if (adminInfo.loginId && type === 'add') {
      const { data } = await adminIsExistApi(adminInfo.loginId);
      if (data) {
        // 该 loginId 已经注册过了
        return Promise.reject('该管理员已经注册过了');
      }
    }
  }

  return (
    <Form
      name="basic"
      initialValues={adminInfo}
      autoComplete="off"
      onFinish={handleSubmit}
      ref={formRef}
    >
      {/* 账号 */}
      <Form.Item
        label="管理员账号"
        name="loginId"
        rules={[
          { required: true, message: '请输入管理员账号' },
          // 验证用户是否已经存在
          { validateTrigger: 'onblur', validator: checkLoginIdIsExist },
        ]}
      >
        <Input
          value={adminInfo?.loginId}
          onChange={(e) => updateInfo(e.target.value, 'loginId')}
          disabled={type === 'edit' ? true : false}
        />
      </Form.Item>

      {/* 密码 */}
      <Form.Item
        label="管理员密码"
        name="loginPwd"
        rules={[
          type === 'edit' ? { required: true, message: '密码不能为空' } : null,
        ]}
      >
        <Input.Password
          placeholder="密码可选，默认是123123"
          value={adminInfo?.loginPwd}
          onChange={(e) => updateInfo(e.target.value, 'loginPwd')}
        />
      </Form.Item>

      {/* 昵称 */}
      <Form.Item
        label="管理员昵称"
        name="nickname"
        rules={[
          type === 'edit' ? { required: true, message: '昵称不能为空' } : null,
        ]}
      >
        <Input
          placeholder={type === 'add' ? '昵称可选，默认是新增管理员' : ''}
          value={adminInfo?.nickname}
          onChange={(e) => updateInfo(e.target.value, 'nickname')}
        />
      </Form.Item>

      {/* 权限 */}
      <Form.Item label="权限选择" name="permission">
        <Radio.Group
          onChange={(e) => updateInfo(e.target.value, 'permission')}
          value={adminInfo?.permission}
        >
          <Radio value={2}>普通管理员</Radio>
          <Radio value={1}>超级管理员</Radio>
        </Radio.Group>
      </Form.Item>

      {avatarPreview}
      <Form.Item label="上传头像">
        <Upload
          action="/api/upload"
          listType="picture-card"
          maxCount={1}
          // class="uploadStyle"
          onChange={(e) => {
            if (e.file.status === 'done') {
              // 说明上传已经完成
              const url = e.file.response.data;
              updateInfo(url, 'avatar');
            }
          }}
        >
          <div>
            <Icon icon="heroicons-outline:plus" />
            <div
              style={{
                marginTop: 8,
              }}
            >
              头像可选
            </div>
          </div>
        </Upload>
      </Form.Item>

      {/* 按钮容器 */}
      <Form.Item wrapperCol={{ offset: 5, span: 16 }}>
        <Button type="primary" htmlType="submit">
          {type === 'add' ? '确认新增' : '修改'}
        </Button>

        <Button type="default" className="resetBtn">
          重置
        </Button>
      </Form.Item>
    </Form>
  );
}

export default AdminForm;
