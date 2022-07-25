package com.pingpong.backend.api.service;

import com.pingpong.backend.api.domain.ClassEntity;
import com.pingpong.backend.api.domain.RecordEntity;
import com.pingpong.backend.api.domain.TeacherEntity;
import com.pingpong.backend.api.domain.request.RecordRequest;
import com.pingpong.backend.api.domain.response.RecordResponse;
import com.pingpong.backend.api.repository.ClassRepository;
import com.pingpong.backend.api.repository.RecordRepository;
import com.pingpong.backend.api.repository.SubjectRepository;
import com.pingpong.backend.api.repository.TeacherRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;


@Service
@RequiredArgsConstructor
public class RecordService {

    private final RecordRepository recordRepository;
    private final ClassRepository classRepository;
    private final TeacherRepository teacherRepository;
    private final SubjectRepository subjectRepository;

    //강의 다시보기 저장
    @Transactional
    public void saveRecord(final RecordRequest req){
        ClassEntity classEntity = classRepository.getOne(req.getClassId());
        TeacherEntity teacherEntity = teacherRepository.getOne(req.getTeacherId());
        RecordEntity recordEntity = RecordEntity.builder()
                .classEntity(classEntity)
                .videoUrl(req.getVideoUrl())
                .videoSavetime(LocalDate.now())
                .build();
        RecordEntity entity = recordRepository.save(recordEntity);
    }
    //강의다시보기 목록 조회 및 검색(학생)
    public List<RecordResponse> findRecordsForStudent(final String studentId,  String classTitle){
        List<RecordResponse> list = new ArrayList<>();
        return list;
    }

    //강의다시보기 목록
    // (선생님)
    public List<RecordResponse> findRecordsForTeacher(final String teacherId){
        List<RecordResponse> list = new ArrayList<>();
        return list;
    }



}
