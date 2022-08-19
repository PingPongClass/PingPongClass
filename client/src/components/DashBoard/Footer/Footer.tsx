import { css } from '@emotion/react';

const Footer = () => {
  return (
    <div css={TotalContainer}>
      <p>Copyright ⓒ 2022 by PingpongClass. All rights reserved.</p>
    </div>
  );
};

const TotalContainer = () => css`
  font-weight: 300;
  color: #4d4d4d;
  font-size: 0.8em;
  p {
    margin: 0;
  }
`;

export default Footer;
