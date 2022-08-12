/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import IosModalNew from '@src/components/Common/IosModalNewAdmin';
import { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { setupInterceptorsTo } from '@utils/AxiosInterceptor';

interface ModalDefaultType {
  onClickOpenBulkModal: () => void;
}

const AddTeacherBulk = ({ onClickOpenBulkModal }: ModalDefaultType) => {
  const [files, setFiles] = useState([]);
  const InterceptedAxios = setupInterceptorsTo(axios.create());

  const onClickDownload = () => {
    let filename = '선생님 등록 양식.xlsx';
    let address =
      'https://test-ppc-bucket.s3.ap-northeast-2.amazonaws.com/' + filename;
    location.href = address;
  };

  const onChangeFiles = (e) => {
    setFiles(e.target.files);
  };

  const onClickUpload = () => {
    if (!files) {
      toast.warning('파일을 넣어주세요.');
    } else {
      const frm = new FormData();
      frm.append('file', files[0]);

      InterceptedAxios.post('/excel/teacher', frm, {
        headers: {
          'Content-Type': `multipart/form-data`,
        },
      })
        .then(function (response) {
          alert('선생님 일괄 등록이 완료되었습니다.');
          location.href = '/admin/teachers';
        })
        .catch(function (error) {
          console.log(error);
          toast.error('선생님 일괄 등록이 실패하였습니다.');
        });
    }
  };

  return (
    <div css={ModalCSS}>
      <div className="commonModal">
        <IosModalNew />
      </div>
      <div className="infoContainer">
        <div className="downloadContainer">
          <h2>선생님 일괄 등록 양식 다운로드</h2>
          <hr />
          <button className="button-sm blue" onClick={onClickDownload}>
            엑셀 다운로드
          </button>
        </div>
        <div className="uploadContainer">
          <h2>선생님 일괄 등록 업로드</h2>
          <hr />
          <input
            type="file"
            accept=".xlsx, .xls"
            onChange={(e) => onChangeFiles(e)}
          />
        </div>
        <div className="buttonContainer">
          <button className="submit" onClick={onClickUpload}>
            등록
          </button>
          <button className="cancel" onClick={onClickOpenBulkModal}>
            취소
          </button>
        </div>
      </div>
    </div>
  );
};

const ModalCSS = () => css`
  min-height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.409);
  z-index: 9999;

  .infoContainer {
    position: relative;
    width: 100%;
    height: 60%;
    min-height: 100px;
    max-height: 250px;
    display: flex;
    margin-top: 50px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    z-index: 3;
  }
  .downloadContainer,
  .uploadContainer {
    margin: 20px;
    font-size: 15pt;
    hr {
      width: 500px;
    }
  }

  .buttonContainer {
    display: flex;
    flex-direction: row;
    margin: 20px;
    button {
      color: white;
      border: 0;
      padding: 10px 30px;
      border-radius: 20px;
      font-size: 20px;
      box-shadow: 2px 2px 10px -5px;
      box-sizing: border-box;
      font-family: 'NanumSquareRound';
      cursor: pointer;
      margin-right: 15px;
    }
  }

  .submit {
    background-color: var(--blue);
  }

  .cancel {
    background-color: var(--gray);
  }

  input {
    width: 450px;
  }

  .commonModal {
    position: absolute;
    width: 800px;
    height: 60%;
  }
`;

export default AddTeacherBulk;
