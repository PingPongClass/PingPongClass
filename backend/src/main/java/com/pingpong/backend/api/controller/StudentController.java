package com.pingpong.backend.api.controller;

import com.pingpong.backend.api.domain.LogEntity;
import com.pingpong.backend.api.domain.StudentEntity;
import com.pingpong.backend.api.domain.StudentSpecification;
import com.pingpong.backend.api.domain.response.RankResponse;
import com.pingpong.backend.api.domain.response.StudentResponse;
import com.pingpong.backend.api.repository.RankingRepository;
import com.pingpong.backend.api.repository.StudentRepository;
import com.pingpong.backend.api.service.StudentServiceImpl;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.SecureRandom;
import java.util.Date;
import java.util.List;

@Api(value = "학생 API", tags={"학생"})
@RestController
@CrossOrigin("*")
@RequestMapping("ssafy/students")
@RequiredArgsConstructor
public class StudentController {
    @Autowired
    private StudentServiceImpl service;
    @Autowired
    private StudentRepository repository;
    @Autowired
    private RankingRepository rankingRepository;

    @ApiOperation(value = "학생 회원가입", notes = "학생 정보 삽입, 임시비밀번호 제공")
    @PostMapping
    public ResponseEntity<?> register(@RequestBody StudentEntity student){
        try{
            student.updateRandomPassword(getRamdomPassword(10));
            service.register(student);
            return new ResponseEntity<String>("학생정보 입력 성공",HttpStatus.OK);
        } catch(Exception e){
            return new ResponseEntity<String>("학생정보 입력 실패",HttpStatus.FORBIDDEN);
        }
    }

    //랜덤 임시 패스워드 생성
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

    //FIXME
//    @ApiOperation(value = "학생 로그인", notes = "JWT")
//    @PostMapping("/login")
//    public ResponseEntity<?> login(){
//
//    }

    @ApiOperation(value = "학생 목록 조회", notes = "(기본은 전체 + 학년, 반, 이름)모든 학생 정보 조회")
    @GetMapping()
    public ResponseEntity<?> findAll(
            @RequestParam(required = false) Integer grade,
            @RequestParam(required = false) Integer classNum,
            @RequestParam(required = false) String name
    ){
        try{
            Specification<StudentEntity> spec = ((root, query, criteriaBuilder) -> null);

            if(grade != null){
                spec = spec.and(StudentSpecification.equalGrade(grade));
            }
            if(classNum != null){
                spec = spec.and(StudentSpecification.equalClassNum(classNum));
            }
            if(name != null){
                spec = spec.and(StudentSpecification.equalName(name));
            }

            List<StudentEntity> list = repository.findAll(spec);
            return new ResponseEntity<List<StudentEntity>>(list,HttpStatus.OK);
        } catch(Exception e){
            return new ResponseEntity<String>("학생 목록을 조회할 수 없습니다.",HttpStatus.FORBIDDEN);
        }
    }

    @ApiOperation(value = "학생 정보 조회", notes = "학번으로 학생 정보 조회")
    @GetMapping("/{studentId}")
    public ResponseEntity<?> findByStudentId(@PathVariable int studentId){
        StudentEntity student = repository.getOne(studentId);
        if(student!=null){
            int rank = repository.countByTotalPointGreaterThan(student.getTotalPoint())+1;
            if(rankingRepository.findFirstByStudent(student)!=null) rank = rankingRepository.findFirstByStudent(student).getRankNum();
            return new ResponseEntity<StudentResponse>(new StudentResponse(student, rank), HttpStatus.OK);
        } else{
            return new ResponseEntity<String>("해당 학생이 존재하지 않습니다.",HttpStatus.FORBIDDEN);
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

//    @PatchMapping
//    @ApiOperation(value = "학생 정보 수정", notes = "학생정보 수정")
//    public ResponseEntity<String> modify(@RequestBody StudentEntity student){
//        try {
//            service.modify(student);
//            return new ResponseEntity<String>("학생 정보수정 성공.", HttpStatus.OK);
//        } catch (Exception e){
//            return new ResponseEntity<String>("학생 정보수정 실패", HttpStatus.FORBIDDEN);
//        }
//    }

    @PatchMapping
    @ApiOperation(value = "학생 정보 수정", notes = "학생정보 수정")
    public ResponseEntity<String> modify(@RequestBody StudentEntity student){
        try {
            service.modify(student);
            return new ResponseEntity<String>("학생 정보수정 성공.", HttpStatus.OK);
        } catch (Exception e){
            return new ResponseEntity<String>("학생 정보수정 실패", HttpStatus.FORBIDDEN);
        }
    }

//    @PatchMapping("/email")
//    @ApiOperation(value = "학생 이메일 수정", notes = "이메일 수정")
//    public ResponseEntity<String> modifyEmail (@RequestBody StudentEntity student){
//        try {
//            service.modifyEmail(student.getStudentId(), student.getEmail());
//            return new ResponseEntity<String>("학생 이메일 수정 성공.", HttpStatus.OK);
//        } catch (Exception e){
//            return new ResponseEntity<String>("학생 이메일 수정  실패", HttpStatus.FORBIDDEN);
//        }
//    }
//
//    @PatchMapping("/introduce")
//    @ApiOperation(value = "학생 자기소개 수정", notes = "자기소개 수정")
//    public ResponseEntity<String> modifyIntroduce (@RequestBody StudentEntity student){
//        try {
//            service.modifyIntroduce(student.getStudentId(), student.getIntroduce());
//            return new ResponseEntity<String>("학생 자기소개 수정 성공.", HttpStatus.OK);
//        } catch (Exception e){
//            return new ResponseEntity<String>("학생 자기소개 수정  실패", HttpStatus.FORBIDDEN);
//        }
//    }

    @DeleteMapping("/{studentId}")
    @ApiOperation(value = "학생 삭제", notes = "학생정보 삭제")
    public ResponseEntity<String> deleteStudent(@PathVariable int studentId){
        try {
            service.delete(studentId);
            return new ResponseEntity<String>("학생 정보삭제 성공.", HttpStatus.OK);
        } catch (Exception e){
            return new ResponseEntity<String>("학생 정보삭제 실패", HttpStatus.FORBIDDEN);
        }
    }

    @GetMapping("/ranking")
    @ApiOperation(value = "학교 랭킹 10위까지", notes = "스티커 많은 순으로 ")
    public ResponseEntity<?> getRanking(){
        try{
            List<RankResponse> rankings = service.getRanking();
            return new ResponseEntity<List<RankResponse>>(rankings, HttpStatus.OK);
        } catch(Exception e){
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.FORBIDDEN);
        }
    }

    @GetMapping("/points/{studentId}")
    @ApiOperation(value = "히트맵을 위한 스티커 내역", notes = "한 학생의 스티커 내역")
    public ResponseEntity<?> getPoint(@PathVariable int studentId){
        try{
            List<LogEntity> list = service.getPoint(studentId);
            return new ResponseEntity<List<LogEntity>>(list, HttpStatus.OK);
        } catch(Exception e){
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.FORBIDDEN);
        }
    }

    @PatchMapping("/points/{point}")
    @ApiOperation(value = "학생 스티커 개수 수정", notes = "point만큼 추가하거나 빼거나")
    public ResponseEntity<?> updatePoint(@RequestParam int studentId, @PathVariable int point){
        try{
            service.updatePoint(studentId, point);
            return new ResponseEntity<String>("퐁퐁 수정 성공" , HttpStatus.OK);
        } catch(Exception e){
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.FORBIDDEN);
        }
    }


}
