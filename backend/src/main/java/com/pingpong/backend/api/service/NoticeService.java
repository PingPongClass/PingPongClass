package com.pingpong.backend.api.service;

import com.pingpong.backend.Exception.CustomException;
import com.pingpong.backend.Exception.ErrorCode;
import com.pingpong.backend.api.domain.*;
import com.pingpong.backend.api.repository.ClassRepository;
import com.pingpong.backend.api.repository.NoticeRepository;
import com.pingpong.backend.api.repository.TeacherRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class NoticeService {

    private final NoticeRepository noticeRepository;
    private final TeacherRepository teacherRepository;
    private final ClassRepository classRepository;

    //게시글 작성
    @Transactional
    public int save(final NoticeRequest params){
        ClassEntity classEntity = classRepository.getOne(params.getClassId());
        TeacherEntity teacherEntity = teacherRepository.getOne(params.getTeacherId());
        NoticeEntity noticeEntity = NoticeEntity.builder()
                .classEntity(classEntity)
                .teacherEntity(teacherEntity)
                .title(params.getTitle())
                .content(params.getContent())
                .build();
        NoticeEntity entity = noticeRepository.save(noticeEntity);
        return entity.getNoticeId();
    }

    //게시글 리스트 조회
    public List<NoticeResponse> findAll(){
        Sort sort = Sort.by(Sort.Direction.DESC, "noticeId", "regtime");
        List<NoticeEntity> list = noticeRepository.findAll(sort);
        return list.stream().map(NoticeResponse::new).collect(Collectors.toList());
    }

    //게시글 수정
}
