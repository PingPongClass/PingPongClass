import { Link } from 'react-router-dom';

interface PasswordFindProps {
  setTap: Function;
}

const PasswordFind = ({ setTap }: PasswordFindProps) => {
  return (
    <div>
      PasswordFind
      <div>
        <Link to="/dashboard">
          <button>설정하기</button>
        </Link>
        <button>이전으로</button>
      </div>
    </div>
  );
};

export default PasswordFind;
