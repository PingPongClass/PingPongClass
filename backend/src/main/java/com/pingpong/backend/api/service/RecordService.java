package com.pingpong.backend.api.service;

import com.pingpong.backend.api.domain.*;
import com.pingpong.backend.api.domain.request.LogRequest;
import com.pingpong.backend.api.domain.request.RecordRequest;
import com.pingpong.backend.api.domain.response.RecordResponse;
import com.pingpong.backend.api.repository.*;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import javax.transaction.Transactional;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

//페이지네이션 안했으니까 잊어버리지말기

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
    public List<RecordResponse> findRecordsForStudent(final int studentId,  String classTitle){
        Sort sort = Sort.by(Sort.Direction.DESC, "regtime");
        List<RecordEntity> recordEntityList = new ArrayList<>();
        List<RecordResponse> list = new ArrayList<>();
        StudentEntity studentEntity = studentRepository.getOne(studentId);
        List<ClassStudentEntity> classStudentEntityList = classStudentRepository.findByStudentEntity(studentEntity);
        if(classTitle==null){ //전체 조회
            for(ClassStudentEntity classStudentEntity: classStudentEntityList) {
                recordEntityList = recordRepository.findByClassEntity(classStudentEntity.getClassEntity(), sort);
                for (RecordEntity entity : recordEntityList)
                    list.add(new RecordResponse(entity));
            }
        }else{//검색 결과
            for(ClassStudentEntity classStudentEntity: classStudentEntityList) {
                recordEntityList = recordRepository.findByClassEntity(classStudentEntity.getClassEntity(), sort);
                for(RecordEntity entity: recordEntityList)
                    list.add(new RecordResponse(entity));
            }
        }
        return list;
    }

    //강의다시보기 목록 (선생님)
    public List<RecordResponse> findRecordsForTeacher(final int teacherId){
        Sort sort = Sort.by(Sort.Direction.DESC, "regtime");
        TeacherEntity teacherEntity = teacherRepository.getOne(teacherId);
        List<ClassEntity> classEntityList = classRepository.findByTeacherEntity(teacherEntity);
        List<RecordEntity> recordEntityList = new ArrayList<>();
        List<RecordResponse> list = new ArrayList<>();
        for(ClassEntity classEntity: classEntityList){
            recordEntityList = recordRepository.findByClassEntity(classEntity, sort);
            for(RecordEntity entity: recordEntityList)
                list.add(new RecordResponse(entity));
        }
        return list;
    }

    //수업 후 강의 로그 저장하기
    public void logSave(final LogRequest req){
        ClassEntity classEntity = classRepository.getById(req.getClassId());
        StudentEntity studentEntity = studentRepository.getById(req.getStudentId());
        LogEntity logEntity = LogEntity.builder()
                .classEntity(classEntity)
                .studententity(studentEntity)
                .regDate(LocalDate.now())
                .point(req.getPoint())
                .attendance(req.isAttendance())
                .presentCnt(req.getPresentCnt())
                .build();
        LogEntity saveEntity = logRepository.save(logEntity);
    }

}
