import { css } from '@emotion/react';
import getPositionCSS from '@utils/getPositionCSS';
import IosModalBase from '@components/Common/IosModalBase';
import type { GetpositionCSSProps } from '@utils/getPositionCSS';

// props에는 크기정보가 들어가야함

interface IosModalProps {
  children?: any;
  isOpen?: boolean;
  renderCenter?: boolean;
  isRelative?: boolean;
  relativePos?: GetpositionCSSProps;
  absolutePos?: GetpositionCSSProps;
  width?: string;
  height?: string;
}

const IosModal = ({
  children = null,
  isOpen = true,
  renderCenter = false,
  isRelative = true,
  relativePos = {},
  absolutePos = {},
  width = '1000px',
  height = '600px',
}: IosModalProps) => {
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

interface AbsoluteBoxProps {
  renderCenter: boolean;
  pos: any;
  width: any;
  height: any;
}

const AbsoluteBox = ({
  renderCenter,
  pos,
  width,
  height,
}: AbsoluteBoxProps) => css`
  position: absolute;
  width: ${width};
  height: ${height};
  ${renderCenter ? 'transform:translate(-50%, -50%); top:50%; left:50%;' : ''};
  ${getPositionCSS(pos)};
  padding: 10px;
`;

interface RelativeBoxProps {
  pos: any;
}

const RelativeBox = ({ pos }: RelativeBoxProps) => css`
  position: relative;
  width: 100%;
  height: 100%;
  ${getPositionCSS(pos)};
`;

export default IosModal;
