package com.pingpong.backend.api.service;

import com.pingpong.backend.Exception.CustomException;
import com.pingpong.backend.Exception.ErrorCode;
import com.pingpong.backend.api.domain.*;
import com.pingpong.backend.api.domain.request.NoticeRequest;
import com.pingpong.backend.api.domain.response.NoticeResponse;
import com.pingpong.backend.api.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class NoticeService {
    private final NoticeRepository noticeRepository;
    private final TeacherRepository teacherRepository;
    private final ClassRepository classRepository;
    private final StudentRepository studentRepository;
    private final ClassStudentRepository classStudentRepository;

    //공지사항 작성
    @Transactional
    public int save(final NoticeRequest request){
        ClassEntity classEntity = classRepository.getOne(request.getClassId());
        TeacherEntity teacherEntity = teacherRepository.getOne(request.getTeacherId());
        NoticeEntity noticeEntity = NoticeEntity.builder()
                .classEntity(classEntity)
                .teacherEntity(teacherEntity)
                .title(request.getTitle())
                .content(request.getContent())
                .build();
        NoticeEntity entity = noticeRepository.save(noticeEntity);
        return entity.getNoticeId();
    }

    //공지사항 리스트 조회 및 검색(선생님) + 페이지네이션
    public Page<NoticeResponse> findTeacher(final int teacherId, final int classId, final String titleSearch, Pageable pageable){
        Sort sort = Sort.by(Sort.Direction.DESC, "noticeId", "regtime");
        TeacherEntity teacherEntity = teacherRepository.getOne(teacherId);
        List<ClassEntity> classlist = classRepository.findByTeacherEntity(teacherEntity);
        List<NoticeEntity> noticelist = new ArrayList<>();
        if(classId!=-1 && titleSearch!=null){
            ClassEntity classentity = classRepository.getOne(classId);
            noticelist = noticeRepository.findByClassEntityAndTitleContaining(classentity, titleSearch, sort);
        } else if(classId==-1 && titleSearch!=null){
            noticelist = noticeRepository.findByTitleContaining(titleSearch, sort);
        } else if(classId!=-1 && titleSearch==null){
            ClassEntity classentity = classRepository.getOne(classId);
            noticelist = noticeRepository.findByClassEntity(classentity, sort);
        } else {
            noticelist = noticeRepository.findAll(sort);
        }

        List<NoticeEntity> list = new ArrayList<>();
        for(ClassEntity classentity : classlist) {
            for (NoticeEntity noticeentity : noticelist) {
                if (classentity.equals(noticeentity.getClassEntity())) {
                    list.add(noticeentity);
                }
            }
        }

        List<NoticeResponse> responseList = list.stream().map(NoticeResponse::new).collect(Collectors.toList());
        int start = (int) pageable.getOffset();
        int end = Math.min((start+pageable.getPageSize()), responseList.size());
        Page<NoticeResponse> result = new PageImpl<>(responseList.subList(start, end), pageable, responseList.size());
        return result;
    }

    //공지사항 리스트 조회 및 검색(관리자)
    public Page<NoticeResponse> findAll(final int classId, final String titleSearch, Pageable pageable){
        Sort sort = Sort.by(Sort.Direction.DESC, "noticeId", "regtime");
        List<NoticeEntity> list = new ArrayList<>();
        if(classId!=-1 && titleSearch!=null){
            ClassEntity classentity = classRepository.getOne(classId);
            list = noticeRepository.findByClassEntityAndTitleContaining(classentity, titleSearch, sort);
        } else if(classId==-1 && titleSearch!=null){
            list = noticeRepository.findByTitleContaining(titleSearch, sort);
        } else if(classId!=-1 && titleSearch==null){
            ClassEntity classentity = classRepository.getOne(classId);
            list = noticeRepository.findByClassEntity(classentity, sort);
        } else {
            list = noticeRepository.findAll(sort);
        }
        List<NoticeResponse> responseList = list.stream().map(NoticeResponse::new).collect(Collectors.toList());
        int start = (int) pageable.getOffset();
        int end = Math.min((start+pageable.getPageSize()), responseList.size());
        Page<NoticeResponse> result = new PageImpl<>(responseList.subList(start, end), pageable, responseList.size());
        return result;
    }

    //공지사항 리스트 조회 및 검색(학생)
    public Page<NoticeResponse> findStudent(final int studentId, final int classId, final String titleSearch, Pageable pageable){
        Sort sort = Sort.by(Sort.Direction.DESC, "noticeId", "regtime");
        StudentEntity studentEntity = studentRepository.getOne(studentId);
        List<ClassStudentEntity> classstudentlist = classStudentRepository.findByStudentEntity(studentEntity);
        List<NoticeEntity> noticelist = new ArrayList<>();
        if(classId!=-1 && titleSearch!=null){
            ClassEntity classentity = classRepository.getOne(classId);
            noticelist = noticeRepository.findByClassEntityAndTitleContaining(classentity, titleSearch, sort);
        } else if(classId==-1 && titleSearch!=null){
            noticelist = noticeRepository.findByTitleContaining(titleSearch, sort);
        } else if(classId!=-1 && titleSearch==null){
            ClassEntity classentity = classRepository.getOne(classId);
            noticelist = noticeRepository.findByClassEntity(classentity, sort);
        } else {
            noticelist = noticeRepository.findAll(sort);
        }

        List<NoticeEntity> list = new ArrayList<>();
        for(ClassStudentEntity classsstudententity : classstudentlist) {
            for (NoticeEntity noticeentity : noticelist) {
                if (classsstudententity.getClassEntity().equals(noticeentity.getClassEntity())) {
                    list.add(noticeentity);
                }
            }
        }

        List<NoticeResponse> responseList = list.stream().map(NoticeResponse::new).collect(Collectors.toList());
        int start = (int) pageable.getOffset();
        int end = Math.min((start+pageable.getPageSize()), responseList.size());
        Page<NoticeResponse> result = new PageImpl<>(responseList.subList(start, end), pageable, responseList.size());
        return result;
    }

    //공지사항 수정
    @Transactional
    public int update(final int noticeId, final NoticeRequest request){
        NoticeEntity entity = noticeRepository.findById(noticeId).orElseThrow(() -> new CustomException(ErrorCode.POSTS_NOT_FOUND));
        ClassEntity classEntity = classRepository.getOne(request.getClassId());
        entity.update(classEntity, request.getTitle(), request.getContent());
        return noticeId;
    }

    //공지사항 삭제
    @Transactional
    public void delete(final int noticeId){
        NoticeEntity entity = noticeRepository.findById(noticeId).orElseThrow(() -> new CustomException(ErrorCode.POSTS_NOT_FOUND));
        noticeRepository.delete(entity);
    }

    //페이지네이션 연습
    @Transactional
    public Page<NoticeResponse> findTest(Pageable pageable){
        return noticeRepository.findAll(pageable).map(NoticeResponse::new);
    }
}