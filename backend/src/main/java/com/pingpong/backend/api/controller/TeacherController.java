package com.pingpong.backend.api.controller;

import com.pingpong.backend.api.domain.StudentEntity;
import com.pingpong.backend.api.domain.TeacherEntity;
import com.pingpong.backend.api.domain.request.UserRequest;
import com.pingpong.backend.api.domain.response.StudentResponse;
import com.pingpong.backend.api.repository.TeacherRepository;
import com.pingpong.backend.api.service.TeacherServiceImpl;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Api(value = "선생님 API", tags={"선생님"})
@RestController
@CrossOrigin("*")
@RequestMapping("/teachers")
@RequiredArgsConstructor
public class TeacherController {
    private final TeacherRepository repository;
    private final TeacherServiceImpl service;
    private final PasswordEncoder passwordEncoder;

    @ApiOperation(value = "선생님 회원가입", notes = "선생님 정보 삽입, 임시비밀번호 제공")
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> register(@RequestBody UserRequest.TeacherSignUp teacher){
        try {
            Integer maxTeacherId = 0;
            //관리자체크
            if (teacher.getIsAdmin() == 0) {        //선생님
                maxTeacherId = repository.getMaxTeacherId();
                //아이디 유효성 검사
                if(maxTeacherId == null || maxTeacherId < 4030001 ){
                    maxTeacherId = 4030001;
                } else if(maxTeacherId > 4039999 ){
                    return new ResponseEntity<String>("선생님 pk 범위 초과",HttpStatus.FORBIDDEN);
                }
            } else if (teacher.getIsAdmin() == 1) {  //관리자(행정실)
                maxTeacherId = repository.getMaxAdminId();
                //아이디 유효성 검사
                if(maxTeacherId == null || maxTeacherId < 5030001 ){
                    maxTeacherId = 5030001;
                } else if(maxTeacherId > 5039999 ){
                    return new ResponseEntity<String>("관리자 pk 범위 초과",HttpStatus.FORBIDDEN);
                }
            }

            TeacherEntity teacherEntity = TeacherEntity.builder()
                    .teacherId(maxTeacherId)
                    .name(teacher.getName())
                    .password(passwordEncoder.encode("ssafy"+maxTeacherId))
                    .birth(teacher.getBirth())
                    .manageGrade(teacher.getManageGrade())
                    .isAdmin(teacher.getIsAdmin())
                    .build();
            service.register(teacherEntity);
            return new ResponseEntity<String>("선생님(관리자) 회원가입 성공",HttpStatus.OK);
        } catch(Exception e){
            e.printStackTrace();
            return new ResponseEntity<String>("선생님(관리자) 회원가입 실패",HttpStatus.FORBIDDEN);
        }
    }

    @ApiOperation(value = "선생님 삭제", notes = "선생님 삭제")
    @DeleteMapping("/{teacherId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteTeacher(@PathVariable int teacherId){
        try{
            service.delete(teacherId);
            return new ResponseEntity<String>("선생님(관리자) 삭제 성공", HttpStatus.OK);
        } catch (Exception e){
            return new ResponseEntity<String>("선생님(관리자) 삭제 실패"+e.getMessage(), HttpStatus.FORBIDDEN);
        }
    }

    @ApiOperation(value = "선생님 목록 조회(이름검색까지)", notes = "이름으로 검색하면 이름까지 검색, 아니면 전체 검색")
    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> findAll(@RequestParam(defaultValue = "전체") String name){
        try{
            List<TeacherEntity> list = service.findByName(name);
            return new ResponseEntity<List<TeacherEntity>>(list, HttpStatus.OK);
        } catch (Exception e){
            return new ResponseEntity<String>("선생님 조회 실패"+e.getMessage(), HttpStatus.FORBIDDEN);
        }
    }

    //FIXME
    @ApiOperation(value = "선생님 정보 조회", notes = "선생님번호로 선생님 정보 조회")
    @GetMapping("/{teacherId}")
    public ResponseEntity<?> findByTeacherId(@PathVariable int teacherId){
//        return new ResponseEntity<TeacherEntity>(repository.getOne(teacherId),HttpStatus.OK);
        try{
            TeacherEntity teacher = repository.findByTeacherId(teacherId);
            if(teacher!=null){
                return new ResponseEntity<TeacherEntity>(teacher,HttpStatus.OK);
            } else{
                return new ResponseEntity<String>("해당 회원을 찾을 수 없습니다.",HttpStatus.NOT_FOUND);
            }
        } catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<String>("선생님 정보 조회 시 오류 발생",HttpStatus.FORBIDDEN);
        }
    }

    //링크로 비밀번호 수정하러 들어올 때, teacher 권한 줘야할듯
    @ApiOperation(value = "비밀번호 수정", notes = "비밀번호 수정")
    @PatchMapping("/password")
    @PreAuthorize("hasRole('TEACHER')")
    public ResponseEntity<?> modifyPassword(@RequestBody TeacherEntity teacher){
        try{
            service.modifyPassword(teacher.getTeacherId(), passwordEncoder.encode(teacher.getPassword()));
            return new ResponseEntity<String>("선생님 비밀번호 수정 성공", HttpStatus.OK);
        } catch (Exception e){
            return new ResponseEntity<String>("선생님 비밀번호 수정 실패"+e.getMessage(), HttpStatus.FORBIDDEN);
        }
    }

    @ApiOperation(value = "이메일 수정", notes = "이메일 수정")
    @PatchMapping("/email")
    @PreAuthorize("hasRole('TEACHER')")
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
