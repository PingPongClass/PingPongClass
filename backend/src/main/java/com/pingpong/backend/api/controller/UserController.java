package com.pingpong.backend.api.controller;

import com.pingpong.backend.Exception.CustomException;
import com.pingpong.backend.Exception.ErrorCode;
import com.pingpong.backend.api.domain.StudentEntity;
import com.pingpong.backend.api.domain.TeacherEntity;
import com.pingpong.backend.api.domain.request.FindPwdRequest;
import com.pingpong.backend.api.repository.StudentRepository;
import com.pingpong.backend.api.repository.TeacherRepository;
import com.pingpong.backend.api.service.EmailService;
import com.pingpong.backend.api.service.StudentServiceImpl;
import com.pingpong.backend.api.service.TeacherServiceImpl;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.SecureRandom;
import java.util.Date;

@Api(value = "유저 API", tags={"Users(학생, 선생님) 비밀번호 찾기"})
@RestController
@CrossOrigin("*")
@RequestMapping("/be/users")
@RequiredArgsConstructor
public class UserController {

    private final StudentRepository studentRepository;
    private final TeacherRepository teacherRepository;
    private final EmailService emailService;

    private final TeacherServiceImpl teacherService;
    private final StudentServiceImpl studentService;

    @ApiOperation(value = "비밀번호 찾기", notes = "학생 정보 삽입, 임시비밀번호 제공")
    @PostMapping("/password")
    public ResponseEntity<?> findPassword(@RequestBody FindPwdRequest findPwdRequest){
        try{
            if(Integer.toString(findPwdRequest.getUserId()).length()==10){
                StudentEntity student = studentRepository.findById(findPwdRequest.getUserId()).orElseThrow(() -> new CustomException(ErrorCode.POSTS_NOT_FOUND));
                if(findPwdRequest.getEmail().equals(student.getEmail())) {
                    //임시비밀번호 생성
                    String randomPassword = getRamdomPassword(10);
                    //비밀번호 재설정
                    studentService.modifyPassword(findPwdRequest.getUserId(), randomPassword);
                    //이메일 발송
                    emailService.sendStudentMail(student, randomPassword);
                    return new ResponseEntity<String>("입력된 이메일로 임시비밀번호 제공",HttpStatus.OK);
                } else {
                    return new ResponseEntity<String>("일치하는 정보가 존재하지 않음",HttpStatus.BAD_REQUEST);
                }
            } else if(Integer.toString(findPwdRequest.getUserId()).length()==7){
                TeacherEntity teacher = teacherRepository.findById(findPwdRequest.getUserId()).orElseThrow(() -> new CustomException(ErrorCode.POSTS_NOT_FOUND));
                if(findPwdRequest.getEmail().equals(teacher.getEmail())) {
                    //임시비밀번호 생성
                    String randomPassword = getRamdomPassword(10);
                    //비밀번호 재설정
                    teacherService.modifyPassword(findPwdRequest.getUserId(), randomPassword);
                    //이메일 발송
                    emailService.sendTeacherMail(teacher, randomPassword);
                    return new ResponseEntity<String>("입력된 이메일로 임시비밀번호 제공",HttpStatus.OK);
                } else {
                    return new ResponseEntity<String>("일치하는 정보가 존재하지 않음",HttpStatus.BAD_REQUEST);
                }
            } else {
                return new ResponseEntity<String>("일치하는 정보가 존재하지 않음",HttpStatus.BAD_REQUEST);
            }
        } catch(Exception e){
            e.printStackTrace();
            return new ResponseEntity<String>("비밀번호 찾기 실패",HttpStatus.FORBIDDEN);
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
            // idx = (int) (len * Math.random());
            idx = sr.nextInt(len);    // 강력한 난수를 발생시키기 위해 SecureRandom을 사용한다.
            sb.append(charSet[idx]);
        }

        return sb.toString();
    }

    @GetMapping("/email/{email}")
    @ApiOperation(value = "이메일 중복 체크", notes = "중복 이메일인지 체크")
    public ResponseEntity<String> hasEmail(@PathVariable String email){
        Boolean isExists = studentService.hasEmail(email) || teacherService.hasEmail(email);
        if(isExists){
            return new ResponseEntity<String>("중복된 이메일입니다.", HttpStatus.FORBIDDEN);
        } else{
            return new ResponseEntity<String>("사용가능한 이메일입니다.", HttpStatus.OK);
        }
    }
}
