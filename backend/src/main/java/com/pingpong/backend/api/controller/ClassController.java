package com.pingpong.backend.api.controller;

import com.pingpong.backend.api.domain.request.ClassRequest;
import com.pingpong.backend.api.domain.request.OpenRequest;
import com.pingpong.backend.api.domain.response.ClassResponse;
import com.pingpong.backend.api.domain.response.ClassStudentResponse;
import com.pingpong.backend.api.service.ClassService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Api(value = "수업 API", tags={"수업"})
@RestController
@RequestMapping("/be/classes")
@RequiredArgsConstructor
public class ClassController {
    private final ClassService classService;

    //수업시작(활성화)를 하면 해당 수업의 url을 저장
    @ApiOperation(value = "실시간 수업 활성화")
    @PatchMapping("/open")
    @PreAuthorize("hasRole('TEACHER')")
    public String openClass(@RequestBody final OpenRequest req){
        classService.saveUrl(req);
        return "수업을 시작했습니다.";
    }

    //수업 종료 후 해당 수업의 url을 삭제
    @ApiOperation(value = "수업 종료")
    @PatchMapping("/{classId}/close")
    @PreAuthorize("hasRole('TEACHER')")
    public String closeClass(@PathVariable final int classId){
        classService.deleteUrl(classId);
        return "수업이 종료되었습니다.";
    }

    //신규 수업을 생성
    @ApiOperation(value = "신규 수업 생성")
    @PostMapping
    @PreAuthorize("hasRole('TEACHER')")
    public String insertClass(@RequestBody final ClassRequest req){
        classService.save(req);
        return "수업을 개설하였습니다.";
    }
    //수업 정보 정정
    @ApiOperation(value = "수업정보 수정")
    @PatchMapping("/{classId}")
    @PreAuthorize("hasRole('TEACHER')")
    public String modifyClass(@PathVariable final int classId, @RequestBody final ClassRequest req){
        classService.modify(classId, req);
        return"수업 정보를 수정 완료했습니다.";
    }
    //수업 삭제
    @ApiOperation(value = "수업 삭제")
    @DeleteMapping("/{classId}")
    @PreAuthorize("hasRole('TEACHER')")
    public String deleteClass(@PathVariable final int classId){
        classService.delete(classId);
        return "수업을 삭제했습니다.";
    }

    //요청받은 요일에 해당하는 수업 목록 조회
    @ApiOperation(value = "요일에 따른 수업 목록 조회")
    @GetMapping("/{userId}/today")
    @PreAuthorize("hasRole('STUDENT')")
    public Page<ClassResponse> findTodayClasses(@RequestParam(value="id") final int userId, @RequestParam(value="day") final int classDay, Pageable pageable){
        Page<ClassResponse> pageReponse = null;
        pageReponse=classService.findTodayClasses(userId, classDay ,pageable);
        return pageReponse;
    }
    //전체 수업 목록 조회
    @ApiOperation(value = "전체 수업 목록 조회")
    @GetMapping("/{userId}")
    @PreAuthorize("hasRole('STUDENT')")
    public Page<ClassResponse> findClassById(@PageableDefault(size=5) @PathVariable final int userId, Pageable pageable ){
        Page<ClassResponse> pageReponse = null;
        pageReponse=classService.findClassesById(userId, pageable);
        return pageReponse;
    }

    //수업에 참가하는 학생 목록
    @ApiOperation(value= "참가 학생 목록 조회" )
    @GetMapping("/student/{classId}")
    @PreAuthorize("hasRole('TEACHER')")
    public ClassStudentResponse findStudentByClassId(final int classId){
        return classService.findParticipant(classId);
    }

    @ApiOperation(value = "수업중인 세션 url 체크")
    @GetMapping("/checkcode")
    @PreAuthorize("hasRole('TEACHER')")
    public List<String> findUrlCheck(){
        return classService.findOpenUrl();
    }
}
