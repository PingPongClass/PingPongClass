package com.pingpong.backend.api.controller;

import com.pingpong.backend.api.domain.ItemEntity;
import com.pingpong.backend.api.domain.request.ColorUpdateRequest;
import com.pingpong.backend.api.domain.request.ItemRequest;
import com.pingpong.backend.api.domain.response.ItemStudentResponse;
import com.pingpong.backend.api.service.ItemServiceImpl;
import com.pingpong.backend.api.service.StudentService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.List;

@Api(value = "상점 API", tags={"상점"})
@CrossOrigin
@RestController
@RequestMapping("/be/items")
@RequiredArgsConstructor
public class StoreController {
    private final ItemServiceImpl itemService;
    private final StudentService studentService;

    @ApiOperation(value = "전체 아이템 목록 조회", notes = "학생이 뽑을 수 있는 모든 아이템의 목록을 조회한다.")
    @GetMapping("")
    public List<ItemEntity> findAll() throws Exception {
        return itemService.loadItem();
    }

    @ApiOperation(value = "보유 아이템 목록 조회", notes = "학생이 보유하는 모든 아이템의 목록을 조회한다.")
    @GetMapping("/{studentId}")
    public List<ItemStudentResponse> findByStudent(@PathVariable final int studentId) throws Exception {
        return itemService.findItemById(studentId);
    }

    @ApiOperation(value = "보유 리액션 목록 조회", notes = "학생이 보유한 리액션의 목록을 조회한다.")
    @GetMapping("/reaction/{studentId}")
    public HashSet<String> findReaction(@PathVariable final int studentId) throws Exception {
        return itemService.findReaction(studentId);
    }

    @ApiOperation(value = "아이템 사용", notes = "선택한 아이템을 사용합니다.")
    @DeleteMapping("/{studentId}/{itemId}")
    public List<ItemStudentResponse> delete(@PathVariable final int studentId, @PathVariable final int itemId) throws Exception{
        itemService.delete(studentId, itemId);
        return itemService.findItemById(studentId);
    }

    @ApiOperation(value = "칭찬스티커 개수 조회", notes = "유저의 현재 사용가능한 칭찬스티커 개수를 조회합니다.")
    @GetMapping("/sticker/{studentId}")
    public int findSticker(@PathVariable final int studentId) throws Exception {
        return studentService.findByStudentId(studentId).get().getPoint();
    }

    @ApiOperation(value = "칭찬스티커 전체 개수 조회", notes = "유저가 지금까지 획득한 칭찬스티커 개수를 조회합니다.")
    @GetMapping("/totalsticker/{studentId}")
    public int findTotalSticker(@PathVariable final int studentId) throws Exception {
        return studentService.getTotalPoint(studentId);
    }

    @ApiOperation(value = "칭찬스티커 개수 사용", notes = "유저의 사용가능한 칭찬스티커 15장을 소멸시킵니다.")
    @PatchMapping("/sticker")
    public int useSticker(@RequestBody final int params) throws Exception {
        return itemService.usePoint(params);
    }

    @ApiOperation(value = "아이템 저장", notes = "뽑힌 아이템을 저장합니다.")
    @PostMapping("")
    public ResponseEntity<?> save(@RequestBody ItemRequest request) throws Exception{
        try{
            itemService.save(request);
            return new ResponseEntity<List<ItemStudentResponse>>(itemService.findItemById(request.getStudentId()),HttpStatus.OK);
        } catch(Exception e){
            e.printStackTrace();
            return new ResponseEntity<String>("아이템 저장 실패",HttpStatus.FORBIDDEN);
        }
    }

    @ApiOperation(value = "잔디 색상 변경", notes = "유저의 잔디의 색상을 변경합니다.")
    @PatchMapping("/color/jandi")
    public ResponseEntity<?> updateJandi(@RequestBody ColorUpdateRequest request) throws Exception {
        try{
            itemService.updateJandiColor(request.getStudentId(), request.getColor());
            return new ResponseEntity<String>("잔디 색 변경 성공",HttpStatus.OK);
        } catch(Exception e){
            e.printStackTrace();
            return new ResponseEntity<String>("잔디 색 변경 실패",HttpStatus.FORBIDDEN);
        }
    }

    @ApiOperation(value = "테두리 색상 변경", notes = "유저의 테두리 색상을 변경합니다.")
    @PatchMapping("/color/border")
    public ResponseEntity<?> updateBorder(@RequestBody ColorUpdateRequest request) throws Exception {
        try{
            itemService.updateBorderColor(request.getStudentId(), request.getColor());
            return new ResponseEntity<String>("테두리 색 변경 성공",HttpStatus.OK);
        } catch(Exception e){
            e.printStackTrace();
            return new ResponseEntity<String>("테두리 색 변경 실패",HttpStatus.FORBIDDEN);
        }
    }
    @ApiOperation(value = "아이템 번호로 아이템명 조회", notes = "아이템명 조회")
    @GetMapping("/itemName/{item_id}")
    public ResponseEntity<?> findItemName(@PathVariable int item_id) throws Exception {
        try{
            String itemName = itemService.findItemName(item_id);
            return new ResponseEntity<String>(itemName,HttpStatus.OK);
        } catch(Exception e){
            e.printStackTrace();
            return new ResponseEntity<String>("아이템명조회 실패",HttpStatus.FORBIDDEN);
        }
    }

}
