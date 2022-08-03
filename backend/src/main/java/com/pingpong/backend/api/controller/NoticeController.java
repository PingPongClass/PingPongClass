package com.pingpong.backend.api.controller;

import com.pingpong.backend.api.domain.TeacherEntity;
import com.pingpong.backend.api.domain.request.NoticeRequest;
import com.pingpong.backend.api.domain.response.NoticeResponse;
import com.pingpong.backend.api.repository.TeacherRepository;
import com.pingpong.backend.api.service.NoticeService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/notice")
@RequiredArgsConstructor
public class NoticeController {
    private final NoticeService noticeService;

    private final TeacherRepository teacherRepository;

    @ApiOperation(value = "공지사항 작성", notes = "teacherId, classId, title, content를 이용하여 공지사항을 작성합니다.")
    @PostMapping
    @PreAuthorize("hasRole('TEACHER')")
    public int writeNotice(@RequestBody final NoticeRequest params){
        return noticeService.save(params);
    }

    @ApiOperation(value = "공지사항 수정", notes = "teacherId, classId, title, content를 이용하여 공지사항을 수정합니다.")
    @PatchMapping("/{noticeId}")
    @PreAuthorize("hasRole('TEACHER')")
    public int updateNotice(@PathVariable final int noticeId, @RequestBody final NoticeRequest params){
        return noticeService.update(noticeId, params);
    }

    @ApiOperation(value = "공지사항 조회 및 검색", notes = "공지사항을 조회하고, 필터에 따라 검색합니다.")
    @GetMapping("/list")
    @PreAuthorize("hasRole('ADMIN')")
    public Page<NoticeResponse> selectNotice(@RequestParam(value="userId") int userId, @RequestParam(value="classId") int classId, @RequestParam(value="titleSearch", required = false) String titleSearch, Pageable pageable){
        Page<NoticeResponse> result = null;
        int type = Integer.toString(userId).length();
        if(type==7){
            //관리자일 때
            TeacherEntity teacher = teacherRepository.getOne(userId);
            if(teacher.getIsAdmin()==1) {
                result = noticeService.findAll(classId, titleSearch, pageable);
            }
            //선생님일 때
            else {
                result = noticeService.findTeacher(userId, classId, titleSearch, pageable);
            }
            //학생일 때
        } else if(type==10){
            result = noticeService.findStudent(userId, classId, titleSearch, pageable);
        }

        return result;
    }

    @ApiOperation(value = "공지사항 삭제", notes = "해당 번호의 공지글을 삭제합니다.")
    @DeleteMapping("/{noticeId}")
    @PreAuthorize("hasRole('TEACHER')")
    public int deleteNotice(@PathVariable final int noticeId){
        noticeService.delete(noticeId);
        return 200;
    }
}
