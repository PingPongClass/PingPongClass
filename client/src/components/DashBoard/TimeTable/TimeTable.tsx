import React, { useState, useEffect } from 'react';
// import { ClassProps } from '@components/DashBoard/Board/ManagedClassBoard';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { setContent, selectContent } from '@store/content';

const TimeTable = () => {
  const [visible, setVisible] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    // 변경 결과 전송(예정)
  }, []);

  const goClass = (e: React.MouseEvent<HTMLElement>) => {
    // onCLick 이벤트
    setVisible(!visible);
  };

  const editClass = () => {
    // 수정페이지로 이동
    dispatch(setContent({ content: 'editClass' }));
  };

  return <div></div>;
};

export default TimeTable;
