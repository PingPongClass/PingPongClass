interface EmailProps {
  setTap: Function;
}

const Email = (props: EmailProps) => {
  const { setTap } = props;
  const onClickNext = () => {
    setTap('passwordFind');
  };

  return (
    <div>
      Email
      <div>
        <button onClick={onClickNext}>다음으로</button>
      </div>
    </div>
  );
};

export default Email;
