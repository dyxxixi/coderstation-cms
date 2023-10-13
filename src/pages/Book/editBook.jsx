import { PageContainer } from '@ant-design/pro-components';
import { message } from 'antd/lib';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BookForm from './components/bookForm';

// 请求方法
import BookController from '@/services/book';

function EditBook() {
  const { id } = useParams(); // 获取可能传递过来的 id
  const [bookInfo, setBookInfo] = useState(null);
  const navigate = useNavigate();

  // 根据传递过来的 id 获取面试题详情
  useEffect(() => {
    async function fetchData() {
      // 根据问答 id 获取该问答具体的信息
      const { data } = await BookController.getBookById(id);
      setBookInfo(data);
    }
    fetchData();
  }, []);

  /**
   * 修改书籍
   */
  function handleSubmit(bookIntro) {
    // 因为没有使用状态机，所以直接调用控制器方法，进行新增
    BookController.editBook(id, {
      bookTitle: bookInfo.bookTitle,
      bookIntro,
      downloadLink: bookInfo.downloadLink,
      requirePoints: bookInfo.requirePoints,
      bookPic: bookInfo.bookPic,
      typeId: bookInfo.typeId,
    });
    message.success('书籍信息修改成功');
    // 跳转回首页
    navigate('/book/bookList');
  }

  return (
    <PageContainer>
      <div className="container" style={{ width: 800 }}>
        <BookForm
          type="edit"
          handleSubmit={handleSubmit}
          bookInfo={bookInfo}
          setBookInfo={setBookInfo}
        />
      </div>
    </PageContainer>
  );
}

export default EditBook;
