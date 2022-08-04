package com.pingpong.backend.api.controller;

import com.pingpong.backend.api.domain.StudentEntity;
import com.pingpong.backend.api.domain.StudentSpecification;
import com.pingpong.backend.api.domain.request.UserRequest;
import com.pingpong.backend.api.domain.response.RankResponse;
import com.pingpong.backend.api.domain.response.StudentResponse;
import com.pingpong.backend.api.repository.RankingRepository;
import com.pingpong.backend.api.repository.StudentRepository;
import com.pingpong.backend.api.service.S3Service;
import com.pingpong.backend.api.service.StudentServiceImpl;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@Api(value = "학생 API", tags={"학생"})
@RestController
@CrossOrigin("*")
@RequestMapping("/students")
@RequiredArgsConstructor
public class StudentController {
    private final StudentServiceImpl service;
    private final S3Service s3Service;

    private final StudentRepository repository;

    private final PasswordEncoder passwordEncoder;

    private final RankingRepository rankingRepository;


    @ApiOperation(value = "학생 회원가입", notes = "학생 정보 삽입, 임시비밀번호 제공")
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> register(@RequestBody UserRequest.StudentSignUp student){
        try{
            //학번 검사
            Integer maxStudentId = repository.getMaxStudentId();

            if(maxStudentId == null || maxStudentId < 2022000001)  maxStudentId = 2022000001;                                        //학번이 범위 미만일 경우 초기값세팅
            else if(maxStudentId > 2022999999) return new ResponseEntity<String>("학번 범위 초과",HttpStatus.FORBIDDEN);  //학번 범위 초과했을 경우 에러
            StudentEntity studentEntity = StudentEntity.builder()
                    .studentId(maxStudentId)
                    .name(student.getName())
                    .grade(student.getGrade())
                    .classNum(student.getClassNum())
                    .studentNum(student.getStudentNum())
                    .password(passwordEncoder.encode("ssafy"+maxStudentId))
                    .build();
            service.register(studentEntity);

            return new ResponseEntity<String>("학생정보 입력 성공",HttpStatus.OK);
        } catch(Exception e){
            e.printStackTrace();
            return new ResponseEntity<String>("학생정보 입력 실패",HttpStatus.FORBIDDEN);
        }
    }


    @ApiOperation(value = "학생 목록 조회", notes = "(기본은 전체 + 학년, 반, 이름)모든 학생 정보 조회")
    @GetMapping
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<?> findAll(
            @RequestParam(required = false) Integer grade,
            @RequestParam(required = false) Integer classNum,
            @RequestParam(required = false) String name
    ){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        System.out.println("학생목록 조회" +auth.getAuthorities().size());

        if (auth != null) {
            for (GrantedAuthority aut1 : auth.getAuthorities()) {
                System.out.println(aut1.getAuthority().toString());
            }
        }
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
    @PreAuthorize("hasRole('STUDENT')")
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

    @PatchMapping
    @ApiOperation(value = "학생 정보 수정", notes = "학생정보 수정")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<String> modify(@RequestBody StudentEntity student) throws IOException {
        try {
            service.modify(student);
            return new ResponseEntity<String>("학생 정보수정 성공.", HttpStatus.OK);
        } catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<String>("학생 정보수정 실패", HttpStatus.FORBIDDEN);
        }
    }

    @PatchMapping("/profile")
    @ApiOperation(value = "학생 프로필 이미지 수정", notes = "학생 프로필 수정")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<String> modifyProfile(@RequestParam("studentId") int studentId, @RequestPart("file") MultipartFile file) throws IOException {
        try {
            if(file.getSize()>=1048576) {
                return new ResponseEntity<String>("이미지 크기 제한은 1MB 입니다.", HttpStatus.FORBIDDEN);
            }
            String originFile = file.getOriginalFilename();
            String originFileExtension = originFile.substring(originFile.lastIndexOf("."));
            if(!originFileExtension.equalsIgnoreCase(".jpg") && !originFileExtension.equalsIgnoreCase(".png")
                    && !originFileExtension.equalsIgnoreCase(".jpeg")) {
                return new ResponseEntity<String>("jpg, jpeg, png의 이미지 파일만 업로드해주세요", HttpStatus.FORBIDDEN);
            }

            StudentEntity student = repository.getOne(studentId);
            String imgPath = s3Service.upload(student.getProfile(), file);
            StudentEntity modstudent = new StudentEntity(student.getStudentId(), student.getName(), student.getGrade(),
                    student.getClassNum(), student.getStudentNum(), student.getEmail(), student.getPassword(),imgPath,
                    student.getPoint(), student.getTotalPoint(), student.getIntroduce());
            service.modify(modstudent);
            return new ResponseEntity<String>("학생 정보수정 성공.", HttpStatus.OK);
        } catch (Exception e){
            return new ResponseEntity<String>("학생 정보수정 실패", HttpStatus.FORBIDDEN);
        }
    }

    @DeleteMapping("/{studentId}")
    @ApiOperation(value = "학생 삭제", notes = "학생정보 삭제")
    @PreAuthorize("hasRole('ADMIN')")
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
    @PreAuthorize("hasRole('STUDENT')")
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
    @PreAuthorize("hasAnyRole('STUDENT')")
    public ResponseEntity<?> getPoint(@PathVariable int studentId){
        try{
            List<Map<String, Integer>> list = service.getPoint(studentId);
            return new ResponseEntity<List<Map<String, Integer>>>(list, HttpStatus.OK);
        } catch(Exception e){
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.FORBIDDEN);
        }
    }

    @PatchMapping("/points/{point}")
    @ApiOperation(value = "학생 스티커 개수 수정", notes = "point만큼 추가하거나 빼거나")
    @PreAuthorize("hasAnyRole('TEACHER')")
    public ResponseEntity<?> updatePoint(@RequestParam int studentId, @PathVariable int point){
        try{
            service.updatePoint(studentId, point);
            return new ResponseEntity<String>("퐁퐁 수정 성공" , HttpStatus.OK);
        } catch(Exception e){
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.FORBIDDEN);
        }
    }
}
