package com.pingpong.backend.api.service;

import com.pingpong.backend.Exception.CustomException;
import com.pingpong.backend.Exception.ErrorCode;
import com.pingpong.backend.api.domain.*;
import com.pingpong.backend.api.domain.request.ClassRequest;
import com.pingpong.backend.api.domain.response.ClassResponse;
import com.pingpong.backend.api.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
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
    private final TimetableRepository timetableRepository;
    private final ClassStudentRepository classStudentRepository;
    private final StudentRepository studentRepository;

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
        ClassEntity saveEntity = classRepository.save(classEntity);

        List<Integer> studentIdList = req.getStudentIdList();
        for(Integer studentId : studentIdList){
            StudentEntity student = studentRepository.getOne(studentId);
            ClassStudentEntity classstudent = new ClassStudentEntity(student, saveEntity);
            classStudentRepository.save(classstudent);
        }
    }

    //수업 삭제
    //연관관계 테이블 데이터 삭제하는 옵션 추가 해야된다......
    public void delete(final int classId){
        ClassEntity classEntity = classRepository.findById(classId).orElseThrow(() -> new CustomException(ErrorCode.POSTS_NOT_FOUND));
        classRepository.delete(classEntity);
    }

    //수업 수정
    public void modify(int classId, ClassRequest req){
        //해당 수업id에 해당 하는 classStudentEntity List로 뽑아서 싹 삭제
        ClassEntity cEntity = classRepository.getOne(classId);
        List<ClassStudentEntity> classStudentEntityList = classStudentRepository.findByClassEntity(cEntity);
        for(ClassStudentEntity classStudentEntity: classStudentEntityList){
            classStudentRepository.delete(classStudentEntity);
        }
        //수업 정보 새로 저장
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
        ClassEntity saveEntity = classRepository.save(classEntity);

        List<Integer> studentIdList = req.getStudentIdList();
        for(Integer studentId : studentIdList){
            StudentEntity student = studentRepository.getOne(studentId);
            ClassStudentEntity classstudent = new ClassStudentEntity(student, saveEntity);
            classStudentRepository.save(classstudent);
        }
    }

    //수업 목록 전체 조회
    public List<ClassResponse> findClassesById(final int userId){
        List<ClassResponse> list = new ArrayList<>();
        if(userId>1000000000) {// 학생일때
            StudentEntity studentEntity = studentRepository.getOne(userId);
            List<ClassStudentEntity> classStudentEntityList = classStudentRepository.findByStudentEntity(studentEntity);
            for (ClassStudentEntity classStudentEntity : classStudentEntityList) {
                List<ClassEntity> classEntityList = classRepository.findByClassId(classStudentEntity.getClassEntity().getClassId());
                for (ClassEntity classEntity : classEntityList)
                    list.add(new ClassResponse(classEntity));
            }
        }else{ //선생님일때
            TeacherEntity teacherEntity = teacherRepository.findByTeacherId(userId);
            List<ClassEntity> classEntityList = classRepository.findByTeacherEntity(teacherEntity);
            for (ClassEntity classEntity: classEntityList)
                list.add(new ClassResponse(classEntity));
        }
        return list;
    }

    //오늘의 수업 목록 조회(학생/선생님)
    public List<ClassResponse> findTodayClasses(final int userId){
        Sort sort = Sort.by(Sort.Direction.DESC,"TimeTableEntity");
        LocalDate localDate = LocalDate.now();
        DayOfWeek dayOfWeek = localDate.getDayOfWeek();
        int dayNumber = dayOfWeek.getValue();
        List<ClassResponse> list = new ArrayList<>();
        if(userId>1000000000) {// 학생일때
            StudentEntity studentEntity = studentRepository.getOne(userId);
            List<ClassStudentEntity> classStudentEntityList = classStudentRepository.findByStudentEntity(studentEntity);
            for (ClassStudentEntity classStudentEntity : classStudentEntityList) {
                List<ClassEntity> classEntityList = classRepository.findByClassIdAndClassDay(classStudentEntity.getClassEntity().getClassId(), dayNumber, sort);
                for (ClassEntity classEntity : classEntityList)
                    list.add(new ClassResponse(classEntity));
            }
        }else{ //선생님일때
            TeacherEntity teacherEntity = teacherRepository.findByTeacherId(userId);
            List<ClassEntity> classEntityList = classRepository.findByTeacherEntityAndClassDay(teacherEntity, dayNumber, sort);
            for (ClassEntity classEntity : classEntityList)
                list.add(new ClassResponse(classEntity));
        }
        return list;
    }
    //실시간 강의 열기
    public void saveUrl(int classId, String classUrl){
        ClassEntity classEntity = classRepository.getOne(classId);
        classEntity.updateUrl(classUrl);
    }

    //강의 종료
    public void deleteUrl(int classId){
        ClassEntity classEntity = classRepository.getOne(classId);
        classEntity.updateUrl("");
    }

}
