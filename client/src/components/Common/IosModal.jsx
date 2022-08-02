/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import PropTypes from 'prop-types';
import getPositionCSS from '../../utils/getPositionCSS';
import IosModalBase from './IosModalBase';

// props에는 크기정보가 들어가야함

const IosModal = ({
  children,
  isOpen = true,
  renderCenter = false,
  isRelative = true,
  relativePos = {},
  absolutePos = {},
  width,
  height,
}) => {
  if (!isOpen) return <div />;
  if (!isRelative)
    return (
      <div
        css={AbsoluteBox({
          renderCenter,
          pos: { absolutePos },
          width,
          height,
        })}
      >
        <IosModalBase width={width} height={height}>
          {children}
        </IosModalBase>
      </div>
    );
  return (
    <div css={RelativeBox({ pos: { relativePos } })}>
      <div
        css={AbsoluteBox({
          renderCenter,
          pos: { absolutePos },
          width,
          height,
        })}
      >
        <IosModalBase width={width} height={height}>
          {children}
        </IosModalBase>
      </div>
    </div>
  );
};

const AbsoluteBox = ({ renderCenter, pos, width, height }) => css`
  position: absolute;
  width: ${width};
  height: ${height};
  ${renderCenter ? 'transform:translate(-50%, -50%); top:50%; left:50%;' : ''};
  ${getPositionCSS(pos)};
  padding: 10px;
`;

const RelativeBox = ({ pos }) => css`
  position: relative;
  width: 100%;
  height: 100%;
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
  width: PropTypes.string,
  height: PropTypes.string,
};

IosModal.defaultProps = {
  children: null,
  isOpen: true,
  renderCenter: false,
  isRelative: true,
  relativePos: {},
  absolutePos: {},
  width: '1000px',
  height: '600px',
};

export default IosModal;
