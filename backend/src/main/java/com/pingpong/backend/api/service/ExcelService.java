package com.pingpong.backend.api.service;

import com.pingpong.backend.api.domain.Authority;
import com.pingpong.backend.api.domain.StudentEntity;
import com.pingpong.backend.api.domain.TeacherEntity;
import com.pingpong.backend.api.repository.StudentRepository;
import com.pingpong.backend.api.repository.TeacherRepository;
import lombok.RequiredArgsConstructor;
import org.apache.commons.io.FilenameUtils;
import org.apache.poi.openxml4j.exceptions.InvalidFormatException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;

@Service
@RequiredArgsConstructor
public class ExcelService {

    private final StudentRepository studentRepository;
    private final TeacherRepository teacherRepository;
    private final ExcelUtil excelUtil;
    private final PasswordEncoder passwordEncoder;

    public String addStudent(MultipartFile file) throws IOException, InvalidFormatException {
        if(file.isEmpty()){
            return "Excel 파일을 선택해주세요.";
        }

        String contentType = FilenameUtils.getExtension(file.getOriginalFilename());
        if(!contentType.equals("xls") && !contentType.equals("xlsx")){
            return "Excel 파일만 업로드해주세요.";
        }

        List<StudentEntity> listStudent = new ArrayList<>();
        List<Map<String, Object>> listMap = excelUtil.getListData(file, 1, 5);

        for(Map<String, Object> map : listMap){
            StudentEntity studentInfo = new StudentEntity(Integer.parseInt(map.get("0").toString()), map.get("1").toString(), Byte.parseByte(map.get("2").toString()),
                    Byte.parseByte(map.get("3").toString()), Byte.parseByte(map.get("4").toString()), passwordEncoder.encode("ssafy"+map.get("0").toString()));

            listStudent.add(studentInfo);
        }

        for(StudentEntity studentInfo : listStudent){
            Authority authority = Authority.builder()
                    .authorityName("ROLE_STUDENT")
                    .build();
            StudentEntity studentEntity = StudentEntity.builder()
                    .studentId(studentInfo.getStudentId())
                    .name(studentInfo.getName())
                    .password(studentInfo.getPassword())
                    .grade(studentInfo.getGrade())
                    .classNum(studentInfo.getClassNum())
                    .studentNum(studentInfo.getStudentNum())
                    .authorities(Collections.singleton(authority))
                    .activated(true)
                    .build();
            studentRepository.save(studentEntity);
        }

        return "등록되었습니다.";
    }

    public String addTeacher(MultipartFile file) throws IOException, InvalidFormatException {
        if(file.isEmpty()){
            return "Excel 파일을 선택해주세요.";
        }

        String contentType = FilenameUtils.getExtension(file.getOriginalFilename());
        if(!contentType.equals("xls") && !contentType.equals("xlsx")){
            return "Excel 파일만 업로드해주세요.";
        }

        List<TeacherEntity> listTeacher = new ArrayList<>();
        List<Map<String, Object>> listMap = excelUtil.getListData(file, 1, 4);

        for(Map<String, Object> map : listMap){
            TeacherEntity teacherInfo = new TeacherEntity(Integer.parseInt(map.get("0").toString()), map.get("1").toString(), passwordEncoder.encode("ssafy"+map.get("0").toString()),
                    map.get("2").toString(), Integer.parseInt(map.get("3").toString()), Integer.parseInt(map.get("4").toString()));

            listTeacher.add(teacherInfo);
        }

        for(TeacherEntity teacherInfo : listTeacher){
            //teacher계정은 권한이 2개
            Set<Authority> authorities= new HashSet<>();
            Authority role = Authority.builder()
                    .authorityName("ROLE_STUDENT")
                    .build();
            authorities.add(role);

            role = Authority.builder()
                    .authorityName("ROLE_TEACHER")
                    .build();
            authorities.add(role);

            if(teacherInfo.getIsAdmin() == 1){
                role = Authority.builder()
                        .authorityName("ROLE_ADMIN")
                        .build();
                authorities.add(role);
            }

            TeacherEntity teacherEntity = TeacherEntity.builder()
                    .teacherId(teacherInfo.getTeacherId())
                    .name((teacherInfo.getName()))
                    .password(teacherInfo.getPassword())
                    .birth(teacherInfo.getBirth())
                    .manageGrade(teacherInfo.getManageGrade())
                    .authorities(authorities)
                    .isAdmin(teacherInfo.getIsAdmin())
                    .activated(true)
                    .build();

            teacherRepository.save(teacherEntity);
        }

        return "등록되었습니다.";
    }
}
