package com.pingpong.backend.api.controller;

import com.pingpong.backend.api.domain.NoticeEntity;
import com.pingpong.backend.api.domain.NoticeRequest;
import com.pingpong.backend.api.domain.NoticeResponse;
import com.pingpong.backend.api.repository.NoticeRepository;
import com.pingpong.backend.api.service.NoticeService;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class NoticeController {

    private final NoticeService noticeService;

    //게시글 생성
    @ApiOperation(value = "공지사항 작성", notes = "teacherid, classid, title, content를 이용하여 공지사항을 작성합니다.")
    @PostMapping("/notice/write")
    public int save(@RequestBody final NoticeRequest params){
        return noticeService.save(params);
    }

    //게시글 조회
    @ApiOperation(value = "공지사항 조회", notes = "전체 공지사항을 조회합니다.")
    @GetMapping("/notice/lists")
    public List<NoticeResponse> findAll(){
        return noticeService.findAll();
    }

    //게시글 수정
//    @ApiOperation(value = "공지사항 수정", notes = "classid, title, content를 이용하여 공지사항을 수정합니다.")
//    @PatchMapping("/notice/update")
//    public int save(@PathVariable final int notice_id, @RequestBody final NoticeRequest params){
//        return noticeService.update(notice_id, params);
//    }
}
