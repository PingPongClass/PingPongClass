package com.pingpong.backend.api.service;

import com.pingpong.backend.Exception.CustomException;
import com.pingpong.backend.Exception.ErrorCode;
import com.pingpong.backend.api.domain.*;
import com.pingpong.backend.api.domain.dto.LogDto;
import com.pingpong.backend.api.domain.request.LogRequest;
import com.pingpong.backend.api.domain.request.RecordRequest;
import com.pingpong.backend.api.domain.response.LogResponse;
import com.pingpong.backend.api.domain.response.RecordResponse;
import com.pingpong.backend.api.domain.response.TeacherLogResponse;
import com.pingpong.backend.api.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import javax.transaction.Transactional;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
public class RecordService {
    private final RecordRepository recordRepository;
    private final ClassRepository classRepository;
    private final ClassStudentRepository classStudentRepository;
    private final StudentRepository studentRepository;
    private final TeacherRepository teacherRepository;
    private final LogRepository logRepository;

    //강의 다시보기 저장
    @Transactional
    public void save(final RecordRequest req){
        ClassEntity classEntity = classRepository.getOne(req.getClassId());
        RecordEntity recordEntity = RecordEntity.builder()
                .classEntity(classEntity)
                .videoUrl(req.getVideoUrl())
                .videoSavetime(LocalDate.now())
                .build();
        RecordEntity entity = recordRepository.save(recordEntity);
    }
    //강의다시보기 목록 조회 및 수업명 검색(학생)
    public Page<RecordResponse> findRecordsForStudent(final int studentId,  String classTitle, Pageable pageable){
        Sort sort = Sort.by(Sort.Direction.DESC, "videoSavetime");
        List<RecordEntity> recordEntityList = new ArrayList<>();
        StudentEntity studentEntity = studentRepository.getOne(studentId);
        List<ClassStudentEntity> classStudentEntityList = classStudentRepository.findByStudentEntity(studentEntity);
        if(classTitle==null) { //전체 조회
            for (ClassStudentEntity classStudentEntity : classStudentEntityList) {
                List<RecordEntity> reList = recordRepository.findByClassEntity(classStudentEntity.getClassEntity(), sort);
                for(RecordEntity recordEntity: reList)
                    recordEntityList.add(recordEntity);
            }
        }else{//검색 결과
            //studentity -> classstudententity-> classentity로 강의명이 포함된 검색
            for(ClassStudentEntity classStudentEntity: classStudentEntityList) {
                List<ClassEntity> classEntityList = classRepository.findByClassIdAndClassTitleContaining(classStudentEntity.getClassEntity().getClassId(), classTitle);
                for (ClassEntity classEntity : classEntityList) {
                    List<RecordEntity> reList = recordRepository.findByClassEntity(classStudentEntity.getClassEntity(), sort);
                    for (RecordEntity recordEntity : reList)
                        recordEntityList.add(recordEntity);
                }
            }
        }
        List<RecordResponse> list = recordEntityList.stream().map(RecordResponse::new).collect(Collectors.toList());
        int start = (int) pageable.getOffset();
        int end = Math.min((start+pageable.getPageSize()), list.size());
        return new PageImpl<>(list.subList(start, end), pageable, list.size());
    }

    //강의다시보기 목록 (선생님)
    public Page<RecordResponse> findRecordsForTeacher(final int teacherId, Pageable pageable){
        Sort sort = Sort.by(Sort.Direction.DESC, "videoSavetime");
        TeacherEntity teacherEntity = teacherRepository.getOne(teacherId);
        List<ClassEntity> classEntityList = classRepository.findByTeacherEntity(teacherEntity);
        List<RecordEntity> recordEntityList = new ArrayList<>();
        for(ClassEntity classEntity: classEntityList)
            recordEntityList = recordRepository.findByClassEntity(classEntity, sort);
        List<RecordResponse> list =recordEntityList.stream().map(RecordResponse::new).collect(Collectors.toList());
        int start = (int) pageable.getOffset();
        int end = Math.min((start+pageable.getPageSize()), list.size());
        return new  PageImpl<>(list.subList(start, end), pageable, list.size());
    }

    //수업 후 강의 로그+포인트 저장하기
    @Transactional
    public void logSave(final LogRequest req){
        int classId = req.getClassId();
        ClassEntity classEntity = classRepository.getById(req.getClassId());
        for(LogDto log:req.getLogList()){
            StudentEntity studentEntity = studentRepository.getById(log.getStudentId());
            //일단 로그저장
            LogEntity logEntity = LogEntity.builder()
                    .classEntity(classEntity)
                    .studententity(studentEntity)
                    .regDate(LocalDate.now())
                    .point(log.getPoint())
                    .attendance(log.isAttendance())
                    .presentCnt(log.getPresentCnt())
                    .build();
            LogEntity saveEntity = logRepository.save(logEntity);
            //포인트 업데이트
            studentEntity.updatePoint(log.getPoint());
        }

    }
    //학생로그기록 조회-> 해당 일자에 들은 수업과 강의 로그 리스트 반환
    public List<LogResponse> fingstudentlog(int studentId, LocalDate regDate){
        List<LogResponse> logResponseList =new ArrayList<>();
        StudentEntity studentEntity = studentRepository.getById(studentId);
        List<LogEntity> logList = logRepository.findByRegDateAndStudentEntity(regDate, studentEntity);
        if(!logList.isEmpty()) {
            for(int i=0; i<logList.size(); i++){
                logResponseList.add(new LogResponse(logList.get(i)));
            }
        }
        return logResponseList;
    }
    //선생님 로그 기록 조회 -> 수업에 일자별 로그 리스트 반환
    public TeacherLogResponse findteacherlog(int classId, LocalDate regDate){
        ClassEntity classEntity = classRepository.getById(classId);
        List<ClassStudentEntity> classStudentEntityList = classStudentRepository.findByClassEntity(classEntity);
        int totalStuNum = classStudentEntityList.size();
        List<LogEntity> logEntities = logRepository.findByRegDateAndClassEntity(regDate, classEntity);
        return new TeacherLogResponse(totalStuNum, logEntities);
    }

    public List<LocalDate> findDate(int studentId){
        return logRepository.getDateList(studentId);
    }




}
