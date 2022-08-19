import { useEffect } from 'react';

// name: 오석호
// date: 2022/08/07
// desc: Stream을 갱신해주는 커스텀 훅
const useUpdateStream = (elementRef, srcObject, callback = () => {}) => {
  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;
    element.srcObject = srcObject ?? null;
    callback();
  }, [srcObject]);
};

export default useUpdateStream;
