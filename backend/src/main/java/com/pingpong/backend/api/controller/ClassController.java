package com.pingpong.backend.api.controller;

import com.pingpong.backend.api.domain.request.ClassRequest;
import com.pingpong.backend.api.domain.request.OpenRequest;
import com.pingpong.backend.api.domain.response.ClassResponse;
import com.pingpong.backend.api.service.ClassService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Api(value = "수업 API", tags={"수업"})
@RestController
@RequestMapping("/ssafy/classes")
@RequiredArgsConstructor
public class ClassController {

    private final ClassService classService;

    //수업시작(활성화)를 하면 해당 수업의 url을 저장
    @ApiOperation(value = "실시간 수업 활성화")
    @PatchMapping("/open")
    public void openClass(@RequestBody final OpenRequest req){
        classService.saveUrl(req);
    }

    //수업 종료 후 해당 수업의 url을 삭제
    @ApiOperation(value = "수업 종료")
    @PatchMapping("/{classId}/close")
    public void closeClass(@PathVariable final int classId){
        classService.deleteUrl(classId);
    }

    //신규 수업을 생성
    @ApiOperation(value = "신규 수업 생성")
    @PostMapping("")
    public void insertClass(@RequestBody final ClassRequest req){
        classService.save(req);
    }
    //수업 정보 정정
    @ApiOperation(value = "수업정보 수정")
    @PatchMapping("/{classId}")
    public void modifyClass(@PathVariable final int classId, @RequestBody final ClassRequest req){
        classService.modify(classId, req);
    }
    //수업 삭제
    @ApiOperation(value = "수업 삭제")
    @DeleteMapping("/{classId}")
    public void deleteClass(@PathVariable final int classId){
        classService.delete(classId);
    }

    //오늘 요일에 해당하는 수업 목록 조회
    @ApiOperation(value = "오늘의 수업 목록 조회(요일)")
    @GetMapping("/{userId}/today")
    public List<ClassResponse> findTodayClasses(@PathVariable final int userId){
        return classService.findTodayClasses(userId);
    }
    //전체 수업 목록 조회
    @ApiOperation(value = "전체 수업 목록 조회")
    @GetMapping("/{userId}")
    public List<ClassResponse> findClassById(@PathVariable final int userId){
        return classService.findClassesById(userId);
    }
}
