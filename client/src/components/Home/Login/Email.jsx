import React from 'react';
import PropTypes from 'prop-types';

const Email = (props) => {
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

Email.propTypes = {
  setTap: PropTypes.func.isRequired,
};

export default Email;
