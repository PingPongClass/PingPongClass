/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from 'react';
import { LogProps } from './ClassLogList';
import { useAppDispatch, useAppSelector } from '@src/store/hooks';
import { setContent, setParam, selectContent } from '@src/store/content';

const ClassLog = (props: { key: number; log: LogProps }) => {
  const [visible, setVisible] = useState(false);
  const [log, setLog] = useState<LogProps>(props.log);
  const dispatch = useAppDispatch();

  useEffect(() => {
    // 변경 결과 전송(예정)
  }, [log]);

  return (
    <div className="row logRow">
      <div className="col classInfo">
        {log.timetableId}교시 {log.subjectName}
      </div>
      <div className="col classTitle">{log.classTitle}</div>
      {log.attendance ? (
        <div className="col attendance" style={{ color: 'blue' }}>
          출석
        </div>
      ) : (
        <div className="col attendance" style={{ color: 'red' }}>
          결석
        </div>
      )}
      <div className="col point">{log.point}</div>
      <div className="col presentCnt">{log.presentCnt}</div>
    </div>
  );
};

export default ClassLog;
