// Toast 에디터
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import {useCallback, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";

const Write = ({ foodWrite }) => {

  const editorRef = useRef(null)

  const navigate = useNavigate()

  const [state, setState] = useState({
    image: '',
    title: '',
    info: '',
  })

  // 파일 업로드 관련
  const upload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setState({
        ...state,
        image: reader.result
      });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleStateChange = (e) => {
    setState({
      ...state,
      [e.target.name] : e.target.value
    })
  }

  const handleContentChange = useCallback(() => {
    setState(prev => ({
      ...prev,
      info: editorRef.current.getInstance().getMarkdown()
    }));
  }, []);

  const handleSubmit = () => {
    foodWrite(state.image,state.title, state.info)
    navigate('/')
  }


  return (
    <div>
      <div className="img_wrap">
        <label htmlFor='fileInput'>파일선택</label>
        <input
          id='fileInput'
          type="file"
          onChange={(event) => upload(event)}
          style={{ display: 'none'}}
        />
        <div className="image">
          { state.image ? <img src={state.image} alt="썸네일"/> : null }
        </div>
      </div>

      <div className="name">
        <input
          type="text"
          name={'title'}
          value={state.title}
          onChange={handleStateChange}
          placeholder={'상호명 입력'}
        />
      </div>

      <div className="editor">
        <Editor
          placeholder="내용을 입력해주세요."
          previewStyle="vertical" // 미리보기 스타일 지정
          height="350px" // 에디터 창 높이
          initialEditType="wysiwyg" // 초기 입력모드 설정(디폴트 markdown)
          initialValue= ' '
          ref={editorRef}
          onChange={handleContentChange}
          name={'info'}
          toolbarItems={[
            // 툴바 옵션 설정
            ['heading', 'bold', 'italic', 'strike'],
            ['hr', 'quote'],
            ['ul', 'ol', 'task', 'indent', 'outdent'],
            ['table', 'image', 'link'],
            ['code', 'codeblock']
          ]}
        />
      </div>

      <div className="btn">
        <button onClick={handleSubmit}>저장</button>
        <button onClick={() => navigate(-1)}>취소</button>
      </div>
    </div>
  )
}

export default Write