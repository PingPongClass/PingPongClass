package com.pingpong.backend.api.controller;

import com.pingpong.backend.api.domain.TeacherEntity;
import com.pingpong.backend.api.service.TeacherServiceImpl;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.SecureRandom;
import java.util.Date;
import java.util.List;

@Api(value = "선생님 API", tags={"선생님"})
@RestController
@CrossOrigin("*")
@RequestMapping("/teachers")
@RequiredArgsConstructor
public class TeacherController {

    @Autowired
    private TeacherServiceImpl service;

    @ApiOperation(value = "선생님 회원가입", notes = "선생님 정보 삽입, 임시비밀번호 제공")
    @PostMapping
    public ResponseEntity<?> register(@RequestBody TeacherEntity teacher){
        try{
            teacher.updateRandomPassword(getRamdomPassword(10));
            service.register(teacher);
            return new ResponseEntity<String>("선생님 회원가입 성공", HttpStatus.OK);
        } catch (Exception e){
            return new ResponseEntity<String>("선생님 회원가입 실패", HttpStatus.FORBIDDEN);
        }
    }

    public String getRamdomPassword(int size) {
        char[] charSet = new char[] {
                '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
                'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
                'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
                '!', '@', '#', '$', '%', '^', '&' };

        StringBuffer sb = new StringBuffer();
        SecureRandom sr = new SecureRandom();
        sr.setSeed(new Date().getTime());

        int idx = 0;
        int len = charSet.length;
        for (int i=0; i<size; i++) {
            idx = sr.nextInt(len);    // 강력한 난수를 발생시키기 위해 SecureRandom을 사용한다.
            sb.append(charSet[idx]);
        }

        return sb.toString();
    }

    @ApiOperation(value = "선생님 목록 조회(이름검색까지)", notes = "이름으로 검색하면 이름까지 검색, 아니면 전체 검색")
    @GetMapping
    public ResponseEntity<?> findAll(@RequestParam(defaultValue = "전체") String name){
        try{
            List<TeacherEntity> list = service.findByName(name);
            return new ResponseEntity<List<TeacherEntity>>(list, HttpStatus.OK);
        } catch (Exception e){
            return new ResponseEntity<String>("선생님 조회 실패"+e.getMessage(), HttpStatus.FORBIDDEN);
        }
    }

    @GetMapping("/email/{email}")
    @ApiOperation(value = "이메일 중복 체크", notes = "중복 이메일인지 체크")
    public ResponseEntity<String> hasEmail(@PathVariable String email){
        Boolean isExists = service.hasEmail(email);
        if(isExists){
            return new ResponseEntity<String>("중복된 이메일입니다.", HttpStatus.FORBIDDEN);
        } else{
            return new ResponseEntity<String>("사용가능한 이메일입니다.", HttpStatus.OK);
        }
    }

    @ApiOperation(value = "비밀번호 수정", notes = "비밀번호 수정")
    @PatchMapping("/password")
    public ResponseEntity<?> modifyPassword(@RequestBody TeacherEntity teacher){
        try{
            service.modifyPassword(teacher.getTeacherId(), teacher.getPassword());
            return new ResponseEntity<String>("선생님 비밀번호 수정 성공", HttpStatus.OK);
        } catch (Exception e){
            return new ResponseEntity<String>("선생님 비밀번호 수정 실패"+e.getMessage(), HttpStatus.FORBIDDEN);
        }
    }

    @ApiOperation(value = "이메일 수정", notes = "이메일 수정")
    @PatchMapping("/email")
    public ResponseEntity<?> modifyEmail(@RequestBody TeacherEntity teacher){
        try {
            service.modifyEmail(teacher.getTeacherId(), teacher.getEmail());
            System.out.println(teacher.getTeacherId()+","+ teacher.getEmail());
            return new ResponseEntity<String>("선생님 이메일 수정 성공", HttpStatus.OK);
        } catch (Exception e){
            return new ResponseEntity<String>("선생님 이메일 수정 실패"+e.getMessage(), HttpStatus.FORBIDDEN);
        }
    }

}
