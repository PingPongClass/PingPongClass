package com.pingpong.backend.api.service;

import com.pingpong.backend.Exception.CustomException;
import com.pingpong.backend.Exception.ErrorCode;
import com.pingpong.backend.api.domain.*;
import com.pingpong.backend.api.domain.request.ClassRequest;
import com.pingpong.backend.api.domain.request.OpenRequest;
import com.pingpong.backend.api.domain.response.ClassResponse;
import com.pingpong.backend.api.domain.response.ClassStudentResponse;
import com.pingpong.backend.api.domain.response.Participants;
import com.pingpong.backend.api.domain.response.RecordResponse;
import com.pingpong.backend.api.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

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
                .isActivated(1)
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
    public void delete(final int classId){
        ClassEntity classEntity = classRepository.findById(classId).orElseThrow(() -> new CustomException(ErrorCode.POSTS_NOT_FOUND));
        classRepository.delete(classEntity);
    }

    //수업 수정
    public void modify(int classId, ClassRequest req){
        ClassEntity cEntity = classRepository.getOne(classId);

        //원래 수업에 듣는 학생 리스트
        List<ClassStudentEntity> list = classStudentRepository.findByClassEntityOrderByStudentEntityAsc(cEntity);
        List<Integer> originStudentList = new ArrayList<>();
        List<Integer> deleteStudent = new ArrayList<>();
        for(ClassStudentEntity classStudent : list){
            originStudentList.add(classStudent.getStudentEntity().getStudentId());
            deleteStudent.add(classStudent.getStudentEntity().getStudentId());
        }

        //새롭게 수업에 듣는 학생 리스트
        List<Integer> newStudentList = (ArrayList<Integer>) req.getStudentIdList();
        List<Integer> updateStudent = new ArrayList<>();
        for(Integer studentId : newStudentList){
            updateStudent.add(studentId);
        }
        Collections.sort(newStudentList);

        //두 리스트가 동일하지 않을 경우에만
        if(!newStudentList.equals(originStudentList)) {

            //원래 리스트와 새로운 리스트를 비교해서 새로 추가해야하는 값 남기기
            updateStudent.removeAll(originStudentList);
            //원래 리스트와 새로운 리스트를 비교해서 삭제해야하는 값 남기기
            deleteStudent.removeAll(newStudentList);

            //delete해야하는 값 delete
            if(deleteStudent.size()!=0){
                for(Integer studentId : deleteStudent){
                    StudentEntity student = studentRepository.getOne(studentId);
                    ClassStudentEntity classStudent = classStudentRepository.findClassStudentEntityByClassEntityAndStudentEntity(cEntity, student);
                    classStudentRepository.delete(classStudent);
                }
            }

            //update해야하는 값 update
            if(updateStudent.size()!=0){
                for(Integer studentId : updateStudent){
                    StudentEntity student = studentRepository.getOne(studentId);
                    classStudentRepository.save(new ClassStudentEntity(student, cEntity));
                }
            }
        }

        //수업 정보 수정(timetableEntity, subjectEntity, classTitle, classDesc, classDay)
        SubjectEntity subjectEntity = subjectRepository.getOne(req.getSubjectCode());
        TimetableEntity timetableEntity = timetableRepository.getOne(req.getTimetableId());
        ClassEntity classEntity = classRepository.getOne(classId);
        classEntity.update(timetableEntity, subjectEntity, req.getClassTitle(), req.getClassDesc(), req.getClassDay());
    }

    //수업 목록 전체 조회
    public Page<ClassResponse> findClassesById(final int userId, Pageable pageable){
        List<ClassEntity> classEntityList = new ArrayList<>();
        if(userId>1000000000) {// 학생일때
            StudentEntity studentEntity = studentRepository.getById(userId);
            List<ClassStudentEntity> classStudentEntityList = classStudentRepository.findByStudentEntity(studentEntity);
            for(ClassStudentEntity classStudentEntity: classStudentEntityList)
                classEntityList.add(classStudentEntity.getClassEntity());
        }else if(userId>=4030000 && userId<=4039999){ //선생님일때
            TeacherEntity teacherEntity = teacherRepository.getById(userId);
            classEntityList = classRepository.findByTeacherEntity(teacherEntity);
        } else if(userId>=5030000 && userId<=5039999) { //관리자일때
            classEntityList = classRepository.findAll();
        }
        List<ClassEntity> resultList = new ArrayList<>();
        for(ClassEntity classEntity:classEntityList){
            if(classEntity.getIsActivated()==1)
                resultList.add(classEntity);
        }
        List<ClassResponse> list = resultList.stream().map(ClassResponse::new).collect(Collectors.toList());
        int start = (int)pageable.getOffset();
        int end =  (start + pageable.getPageSize())>list.size()?list.size():(start +pageable.getPageSize());
        return new PageImpl<>(list.subList(start, end), pageable, list.size());
    }

    //요일별 수업 목록 조회(학생/선생님)
    public Page<ClassResponse> findTodayClasses(final int userId, final int classDay, Pageable pageable){
        Sort sort = Sort.by(Sort.Direction.ASC,"TimetableEntity");
        List<ClassEntity> classEntityList = new ArrayList<>();
        if(userId>1000000000) {// 학생일때
            StudentEntity studentEntity = studentRepository.getOne(userId);
            List<ClassStudentEntity> classStudentEntityList = classStudentRepository.findByStudentEntity(studentEntity);
            for (ClassStudentEntity classStudentEntity : classStudentEntityList) {
                List<ClassEntity> subList = classRepository.findByClassIdAndClassDay(classStudentEntity.getClassEntity().getClassId(), classDay, sort);
                for(ClassEntity classEntity:subList)
                    classEntityList.add(classEntity);
            }
        }else { //선생님일때
            TeacherEntity teacherEntity = teacherRepository.findByTeacherId(userId);
            List<ClassEntity> subList = classRepository.findByTeacherEntityAndClassDay(teacherEntity, classDay, sort);
            for(ClassEntity classEntity:subList)
                classEntityList.add(classEntity);
        }
        List<ClassEntity> resultList = new ArrayList<>();
        for(ClassEntity classEntity:classEntityList){
            if(classEntity.getIsActivated()==1)
                resultList.add(classEntity);
        }
        List<ClassResponse> list = resultList.stream().map(ClassResponse::new).collect(Collectors.toList());
        int start = (int)pageable.getOffset();
        int end =  (start + pageable.getPageSize())>list.size()?list.size():(start +pageable.getPageSize());
        return new PageImpl<>(list.subList(start, end), pageable, list.size());
    }

    //시간표 출력용 요일별 수업 리스트 전체
    public List<List<ClassResponse>> makeTimeTable(final int userId){
        List<List<ClassResponse>> res = new ArrayList<>();
        Sort sort = Sort.by(Sort.Direction.ASC,"TimetableEntity");
        for(int i=1; i<6; i++){
            List<ClassEntity> classEntityList = new ArrayList<>();
            if(userId>1000000000) {// 학생일때
                StudentEntity studentEntity = studentRepository.getOne(userId);
                List<ClassStudentEntity> classStudentEntityList = classStudentRepository.findByStudentEntity(studentEntity);
                for (ClassStudentEntity classStudentEntity : classStudentEntityList) {
                    List<ClassEntity> subList = classRepository.findByClassIdAndClassDay(classStudentEntity.getClassEntity().getClassId(), i, sort);
                    for(ClassEntity classEntity:subList)
                        classEntityList.add(classEntity);
                }
            }else { //선생님일때
                TeacherEntity teacherEntity = teacherRepository.findByTeacherId(userId);
                List<ClassEntity> subList = classRepository.findByTeacherEntityAndClassDay(teacherEntity, i, sort);
                for(ClassEntity classEntity:subList)
                    classEntityList.add(classEntity);
            }
            List<ClassEntity> resultList = new ArrayList<>();
            for(ClassEntity classEntity:classEntityList){
                if(classEntity.getIsActivated()==1)
                    resultList.add(classEntity);
            }
            List<ClassResponse> list = resultList.stream().map(ClassResponse::new).collect(Collectors.toList());
            res.add(list);
        }
        return res;
    }

    //실시간 강의 열기
    @Transactional
    public void saveUrl(OpenRequest openRequest){
        ClassEntity classEntity = classRepository.getOne(openRequest.getClassId());
        classEntity.updateUrl(openRequest.getClassUrl());
    }

    @Transactional
    public String isOpen(int classId){
        String classUrl = classRepository.getOne(classId).getClassUrl();
        if(classUrl==null || classUrl==""){
            return "";
        } else{
            return classUrl;
        }
    }

    //강의 종료
    @Transactional
    public void deleteUrl(int classId){
        ClassEntity classEntity = classRepository.getOne(classId);
        classEntity.updateUrl("");
    }
    //해당 수업에 참가하는 학생 목록
    public ClassStudentResponse findParticipant(int classId){
        List<Participants> participantsList=new ArrayList<>();
        ClassEntity classEntity = classRepository.getOne(classId);
        List<ClassStudentEntity> classStudentEntityList = classStudentRepository.findByClassEntity(classEntity);
        for(ClassStudentEntity classStudentEntity: classStudentEntityList){
                participantsList.add(new Participants(classStudentEntity.getStudentEntity()));
        }
        ClassStudentResponse classStudentResponse = new ClassStudentResponse(classId, participantsList);
        return classStudentResponse;
    }

    public List<String>findOpenUrl(){
        List<ClassEntity> classEntityList= classRepository.findAll();
        List<String> urlList = new ArrayList<>();
        for(ClassEntity classEntity: classEntityList){
            if(classEntity.getClassUrl()==null||classEntity.getClassUrl().equals("")) continue;
            urlList.add(classEntity.getClassUrl());
        }
        return urlList;
    }

    @Transactional
    public ClassResponse findClassInfo(int classId){
        return new ClassResponse(classRepository.getOne(classId));
    }
    @Transactional
    public void updateState(int classId){
        ClassEntity classEntity = classRepository.getById(classId);
        classEntity.chanageState();
    }
}
