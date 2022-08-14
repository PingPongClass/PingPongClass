package com.pingpong.backend.api.controller;

import com.pingpong.backend.api.domain.request.LogRequest;
import com.pingpong.backend.api.domain.request.LogdateRequest;
import com.pingpong.backend.api.domain.request.RecordRequest;
import com.pingpong.backend.api.domain.response.LogResponse;
import com.pingpong.backend.api.domain.response.RecordResponse;
import com.pingpong.backend.api.domain.response.TeacherLogResponse;
import com.pingpong.backend.api.service.RecordService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;


@Api(value = "강의 다시보기 API", tags={"강의 다시보기 / 로그 저장"})
@RestController
@RequestMapping("/be/records")
@RequiredArgsConstructor
public class RecordController {
    private final RecordService recordService;

    //강의 다시보기 저장
    @ApiOperation(value = "강의다시보기 저장", notes = "teacherId, classTitle, classId, subjectCode, timatableId, videoUrl을 저장한다.")
    @PostMapping
    @PreAuthorize("hasRole('TEACHER')")
    public void insertRecord(@RequestBody final RecordRequest req){
        recordService.save(req);
    }

    //강의 다시보기 목록 조회 및 검색
    @ApiOperation(value = "강의다시보기 목록 조회 및 검색", notes = "userId로 강의다시보기를 조회하고, 수업명에 따라 검색합니다.")
    @GetMapping
    @PreAuthorize("hasRole('STUDENT')")
    public Page<RecordResponse> findBySearch(@RequestParam(value="id") int userId, @RequestParam(value="title", required = false) String classTitle, Pageable pageable){
        Page<RecordResponse> recordResponsePage =null;
        //학생일때 - 검색(수업명)
        if(userId>1000000000){
            recordResponsePage = recordService.findRecordsForStudent(userId, classTitle, pageable);
        }else{//선생님일때
            recordResponsePage = recordService.findRecordsForTeacher(userId, pageable);
        }
        return recordResponsePage;
    }

    @ApiOperation(value = "강의 종료 후 학생별 수업 로그 저장", notes = "포인트, 발표횟수(presentCnt), 수업참가여부 저장")
    @PostMapping("/log")
    @PreAuthorize("hasRole('STUDENT')")
    public void insertLog(@RequestBody LogRequest req){
        recordService.logSave(req);
    }

    @ApiOperation(value = "학생의 강의 로그 조회 - 일자별", notes = "학생아이디, 일자로 수업 - 강의 로그 조회")
    @PostMapping("/log/student")
    @PreAuthorize("hasRole('STUDENT')")
    public List<LogResponse> findStudentLog(@RequestBody LogdateRequest req){
        return recordService.fingstudentlog(req.getStudentId(), req.getRegDate());
    }

    @ApiOperation(value = "학생의 강의 로그 조회 - 일자별", notes = "학생아이디, 일자로 수업 - 강의 로그 조회")
    @GetMapping("/log/student/{studentId}")
    @PreAuthorize("hasRole('STUDENT')")
    public List<LocalDate> findStudentLog(@PathVariable int studentId){
        return recordService.findDate(studentId);
    }

    @ApiOperation(value = "선생님의 강의 로그 조회 - 일자별", notes = "classID -> 일자별 로그객체 ")
    @GetMapping("/teacher/{classId}")
    @PreAuthorize("hasRole('TEACHER')")
    public TeacherLogResponse findTeacherLog(@PathVariable int classId, @RequestBody LogdateRequest req){
        return recordService.findteacherlog(classId, req.getRegDate());
    }
}
