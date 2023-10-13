import { typeOptionCreator } from '@/utils/tool';
import { PlusOutlined } from '@ant-design/icons';
import '@toast-ui/editor/dist/i18n/zh-cn';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import { Button, Form, Image, Input, Select, Upload } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'umi';

function BookForm({ type, handleSubmit, bookInfo, setBookInfo }) {
  const formRef = useRef();
  const editorRef = useRef();
  const [firstIn, setFirstIn] = useState(true); // 记录是否是第一次进入

  // 数据回填
  useEffect(() => {
    if (type === 'edit') {
      if (formRef.current && firstIn && bookInfo) {
        editorRef.current.getInstance().setHTML(bookInfo?.bookIntro);
        setFirstIn(false);
      }
      if (formRef.current) {
        formRef.current.setFieldsValue(bookInfo);
      }
    }
  }, [bookInfo]);

  const dispatch = useDispatch(); // 获取 dispatch

  // 从仓库获取类型列表
  const { typeList } = useSelector((state) => state.type);

  useEffect(() => {
    // 如果类型列表为空，则初始化一次
    if (!typeList.length) {
      dispatch({
        type: 'type/_initTypeList',
      });
    }
  }, []);

  // 书籍封面
  let bookPicPreview = null;
  if (type === 'edit') {
    bookPicPreview = (
      <Form.Item label="当前封面" name="bookPicPreview">
        <Image src={bookInfo?.bookPic} width={100} />
      </Form.Item>
    );
  }

  // 用户填写内容时更新表单控件内容
  function updateInfo(newInfo, key) {
    const newBookInfo = { ...bookInfo };
    if (typeof newInfo === 'string') {
      newBookInfo[key] = newInfo.trim();
    } else {
      newBookInfo[key] = newInfo;
    }
    setBookInfo(newBookInfo);
  }

  // 分类下拉列表改变时对应的回调
  const handleTypeChange = (value) => {
    updateInfo(value, 'typeId');
  };

  // 积分下拉列表改变时对应的回调
  const handlePointChange = (value) => {
    updateInfo(value, 'requirePoints');
  };

  function handleAdd() {
    const content = editorRef.current.getInstance().getHTML();
    handleSubmit(content);
  }

  return (
    <Form
      name="basic"
      initialValues={bookInfo}
      autoComplete="off"
      ref={formRef}
      onFinish={handleAdd}
    >
      <Form.Item
        label="书籍标题"
        name="bookTitle"
        rules={[{ required: true, message: '请输入书名' }]}
      >
        <Input
          value={bookInfo?.bookTitle}
          onChange={(e) => updateInfo(e.target.value, 'bookTitle')}
        />
      </Form.Item>

      <Form.Item
        label="书籍介绍"
        name="bookIntro"
        rules={[{ required: true, message: '请输入书本相关的介绍' }]}
      >
        <Editor
          initialValue=""
          previewStyle="vertical"
          height="600px"
          initialEditType="markdown"
          useCommandShortcut={true}
          language="zh-CN"
          ref={editorRef}
        />
      </Form.Item>

      <Form.Item
        label="下载链接"
        name="downloadLink"
        rules={[{ required: true, message: '请输入书籍链接' }]}
      >
        <Input
          value={bookInfo?.downloadLink}
          onChange={(e) => updateInfo(e.target.value, 'downloadLink')}
        />
      </Form.Item>

      <Form.Item
        label="所需积分"
        name="requirePoints"
        rules={[{ required: true, message: '请选择下载所需积分' }]}
      >
        <Select style={{ width: 200 }} onChange={handlePointChange}>
          <Select.Option value={20} key={20}>
            20
          </Select.Option>
          <Select.Option value={30} key={30}>
            30
          </Select.Option>
          <Select.Option value={40} key={40}>
            40
          </Select.Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="书籍分类"
        name="typeId"
        rules={[{ required: true, message: '请选择书籍分类' }]}
      >
        <Select style={{ width: 200 }} onChange={handleTypeChange}>
          {typeOptionCreator(Select, typeList)}
        </Select>
      </Form.Item>

      {bookPicPreview}

      <Form.Item label="书籍封面" valuePropName="fileList">
        <Upload
          action="/api/upload"
          listType="picture-card"
          maxCount={1}
          onChange={(e) => {
            if (e.file.status === 'done') {
              // 说明上传已经完成
              const url = e.file.response.data;
              updateInfo(url, 'bookPic');
            }
          }}
        >
          <PlusOutlined />
        </Upload>
      </Form.Item>

      {/* 确认修改按钮 */}
      <Form.Item wrapperCol={{ offset: 3, span: 16 }}>
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

export default BookForm;
