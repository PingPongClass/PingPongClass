package com.pingpong.backend.api.controller;

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

@Api(value = "유저 API", tags={"Users(학생, 선생님) 비밀번호 찾기"})
@RestController
@CrossOrigin("*")
@RequestMapping("/users")
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
                StudentEntity student = studentRepository.getOne(findPwdRequest.getUserId());
                if(findPwdRequest.getEmail().equals(student.getEmail())) {
                    emailService.sendStudentMail(student);
                    return new ResponseEntity<String>("입력된 이메일로 비밀번호 재설정링크 전송 성공",HttpStatus.OK);
                } else {
                    return new ResponseEntity<String>("일치하는 정보가 존재하지 않음",HttpStatus.BAD_REQUEST);
                }
            } else if(Integer.toString(findPwdRequest.getUserId()).length()==7){
                TeacherEntity teacher = teacherRepository.getOne(findPwdRequest.getUserId());
                if(findPwdRequest.getEmail().equals(teacher.getEmail())) {
                    emailService.sendTeacherMail(teacher);
                    return new ResponseEntity<String>("입력된 이메일로 비밀번호 재설정링크 전송 성공",HttpStatus.OK);
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
