package com.pingpong.backend.api.controller;

import com.pingpong.backend.api.domain.request.ClassRequest;
import com.pingpong.backend.api.domain.request.OpenRequest;
import com.pingpong.backend.api.domain.response.ClassResponse;
import com.pingpong.backend.api.service.ClassService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
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
    public String openClass(@RequestBody final OpenRequest req){
        classService.saveUrl(req);
        return "수업을 시작했습니다.";
    }

    //수업 종료 후 해당 수업의 url을 삭제
    @ApiOperation(value = "수업 종료")
    @PatchMapping("/{classId}/close")
    public String closeClass(@PathVariable final int classId){
        classService.deleteUrl(classId);
        return "수업이 종료되었습니다.";
    }

    //신규 수업을 생성
    @ApiOperation(value = "신규 수업 생성")
    @PostMapping("")
    public String insertClass(@RequestBody final ClassRequest req){
        classService.save(req);
        return "수업을 개설하였습니다.";
    }
    //수업 정보 정정
    @ApiOperation(value = "수업정보 수정")
    @PatchMapping("/{classId}")
    public String modifyClass(@PathVariable final int classId, @RequestBody final ClassRequest req){
        classService.modify(classId, req);
        return"수업 정보를 수정 완료했습니다.";
    }
    //수업 삭제
    @ApiOperation(value = "수업 삭제")
    @DeleteMapping("/{classId}")
    public String deleteClass(@PathVariable final int classId){
        classService.delete(classId);
        return "수업을 삭제했습니다.";
    }

    //오늘 요일에 해당하는 수업 목록 조회
    //오늘 해당하는 수업 없을 때 에러처리 해줘야된다.
    @ApiOperation(value = "오늘의 수업 목록 조회(요일)")
    @GetMapping("/{userId}/today")
    public Page<ClassResponse> findTodayClasses(@PathVariable final int userId, Pageable pageable){
        Page<ClassResponse> pageReponse = null;
        pageReponse=classService.findTodayClasses(userId, pageable);
        return pageReponse;
    }
    //전체 수업 목록 조회
    //오늘 해당하는 수업 없을 때 에러처리 해줘야된다.
    @ApiOperation(value = "전체 수업 목록 조회")
    @GetMapping("/{userId}")
    public Page<ClassResponse> findClassById(@PageableDefault(size=5) @PathVariable final int userId, Pageable pageable ){
        Page<ClassResponse> pageReponse = null;
        pageReponse=classService.findClassesById(userId, pageable);
        return pageReponse;
    }
}
