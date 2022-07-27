package com.pingpong.backend.api.controller;

import com.pingpong.backend.api.domain.request.ClassRequest;
import com.pingpong.backend.api.domain.response.ClassResponse;
import com.pingpong.backend.api.service.ClassService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Api(value = "수업 API", tags={"수업"})
@RestController
@RequestMapping("/classes")
@RequiredArgsConstructor
public class ClassController {

    private final ClassService classService;

    //수업시작(활성화)를 하면 해당 수업의 url을 저장
    @ApiOperation(value = "실시간 수업 활성화")
    @PatchMapping("/{class}")
    public void openClass(@RequestBody final ClassRequest req){
        classService.saveUrl(req.getClassId(), req.getClassUrl());
    }

    //수업 종료 후 해당 수업의 url을 삭제
    @ApiOperation(value = "수업 종료")
    @PatchMapping("/{classId}")
    public void closeClass(@PathVariable int classId){
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
    @PatchMapping("")
    public void modifyClass(@RequestBody final ClassRequest req){
        classService.modify(req);
    }
    //수업 삭제
    @ApiOperation(value = "수업정보 수정")
    @DeleteMapping("/{classId}")
    public void deleteClass(@PathVariable int classId){
        classService.delete(classId);
    }

    //오늘 요일에 해당하는 수업 목록 조회
    @ApiOperation(value = "수업정보 수정")
    @GetMapping("/{userId}/today")
    public List<ClassResponse> findTodayClasses(@PathVariable int userId){
        return classService.findTodayClasses(userId);
    }
    //전체 수업 목록 조회
    @ApiOperation(value = "수업정보 수정")
    @GetMapping("/{userId}")
    public List<ClassResponse> findClassById(@PathVariable int userId){
        return classService.findClassesById(userId);
    }
}
