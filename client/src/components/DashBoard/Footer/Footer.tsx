/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

const Footer = () => {
  return (
    <div css={TotalContainer}>
      <p>Copyright ⓒ 2022 by PingpongClass. All rights reserved.</p>
    </div>
  );
};

const TotalContainer = () => css`
  font-weight: 600;
  p {
    margin: 0;
  }
`;

export default Footer;
