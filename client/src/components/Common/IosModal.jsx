/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import PropTypes from 'prop-types';
import getPositionCSS from '../../utils/getPositionCSS';

// props에는 크기정보가 들어가야함

const IosModal = ({
  children,
  isOpen,
  renderCenter = false,
  isRelative = true,
  relativePos = {},
  absolutePos = {},
}) => {
  console.log(children);
  if (!isOpen) return <div />;
  if (!isRelative)
    return (
      <div
        css={AbsoluteBox({
          renderCenter: { renderCenter },
          pos: { absolutePos },
        })}
      >
        test
        {children}
      </div>
    );
  return (
    <div css={RelativeBox({ pos: { relativePos } })}>
      <div
        css={AbsoluteBox({
          renderCenter: { renderCenter },
          pos: { absolutePos },
        })}
      >
        {children}
      </div>
    </div>
  );
};

const AbsoluteBox = ({ renderCenter, pos }) => css`
  position: absolute;
  width: 900px;
  height: 900px;
  ${getPositionCSS(pos)}
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0px 0px 4px rgba(204, 204, 204, 0.5),
    0px 2px 4px rgba(0, 0, 0, 0.25);
  ${renderCenter ? 'transform:translate(-50%, -50%);' : ''};
`;

const RelativeBox = ({ pos }) => css`
  position: relative;
  ${getPositionCSS(pos)};
`;

IosModal.propTypes = {
  children: PropTypes.node,
  isOpen: PropTypes.bool,
  renderCenter: PropTypes.bool,
  isRelative: PropTypes.bool,
  relativePos: PropTypes.shape({
    top: PropTypes.string,
    right: PropTypes.string,
    bottom: PropTypes.string,
    left: PropTypes.string,
  }),
  absolutePos: PropTypes.shape({
    top: PropTypes.string,
    right: PropTypes.string,
    bottom: PropTypes.string,
    left: PropTypes.string,
  }),
};

IosModal.defaultProps = {
  children: null,
  isOpen: true,
  renderCenter: false,
  isRelative: true,
  relativePos: {},
  absolutePos: {},
};

export default IosModal;
