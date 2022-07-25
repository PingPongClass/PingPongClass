package com.pingpong.backend.api.service;

import com.pingpong.backend.Exception.CustomException;
import com.pingpong.backend.Exception.ErrorCode;
import com.pingpong.backend.api.domain.*;
import com.pingpong.backend.api.domain.request.ClassRequest;
import com.pingpong.backend.api.domain.response.ClassResponse;
import com.pingpong.backend.api.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ClassService {
    private final ClassRepository classRepository;
    private final TeacherRepository teacherRepository;
    private final SubjectRepository subjectRepository;
    private final StudentRepository studentRepository;
    private final TimetableRepository timetableRepository;

    //수업 등록
    public void save(final ClassRequest req) {
        TeacherEntity teacherEntity = teacherRepository.getOne(req.getTeacherId());
        SubjectEntity subjectEntity = subjectRepository.getOne(req.getSubjectCode());
        TimetableEntity timetableEntity = timetableRepository.getOne(req.getTimetableId());
        ClassEntity classEntity = ClassEntity.builder()
                .teacherEntity(teacherEntity)
                .subjectEntity(subjectEntity)
                .classTitle(req.getClassTitle())
                .classDay(req.getClassDay())
                .timetableEntity(timetableEntity)
                .classDesc(req.getClassDesc())
                .classUrl(req.getClassUrl())
                .build();
    }

    //수업 삭제
    public void delete(final int classId){
        ClassEntity classEntity = classRepository.findById(classId).orElseThrow(() -> new CustomException(ErrorCode.POSTS_NOT_FOUND));
        classRepository.delete(classEntity);
    }

    //수업 수정

    //수업 목록 조회
    public List<ClassResponse> findbyClassResponses(final String userId){
        ClassEntity classEntity = classRepository.getById(Integer.parseInt(userId));
        List<ClassResponse> list = new ArrayList<>();
        if(userId.length()>5) {// 학생일때

        }else{

        }
        return list;
    }

    //오늘의 수업 목록 조회(학생/선생님)
    public List<ClassResponse> findTodayClasses(final String userId){
        LocalDate localDate = LocalDate.now();
        DayOfWeek dayOfWeek = localDate.getDayOfWeek();
        int dayNumber = dayOfWeek.getValue();
        List<ClassResponse> list = new ArrayList<>();
        return list;
    }
    //실시간 강의 열기

    //강의 종료

}
