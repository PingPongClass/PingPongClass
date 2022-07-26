package com.pingpong.backend.api.service;

import com.pingpong.backend.api.domain.StudentExcelTest;
import com.pingpong.backend.api.domain.response.StudentExcelResponse;
import com.pingpong.backend.api.repository.StudentExcelRepository;
import lombok.NoArgsConstructor;
import org.apache.commons.io.FilenameUtils;
import org.apache.poi.openxml4j.exceptions.InvalidFormatException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.security.SecureRandom;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

@Service
@NoArgsConstructor
public class StudentExcelService {

    @Autowired
    StudentExcelRepository studentExcelRepository;

    @Autowired
    ExcelUtil excelUtil;

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

    public String addExcel(MultipartFile file) throws IOException, InvalidFormatException {
        if(file.isEmpty()){
            return "Excel 파일을 선택해주세요.";
        }

        String contentType = FilenameUtils.getExtension(file.getOriginalFilename());
        if(!contentType.equals("xls") && !contentType.equals("xlsx")){
            return "Excel 파일만 업로드해주세요.";
        }

        List<StudentExcelTest> listStudent = new ArrayList<>();
        List<Map<String, Object>> listMap = excelUtil.getListData(file, 1, 5);

        for(Map<String, Object> map : listMap){
            StudentExcelTest studentInfo = new StudentExcelTest(Integer.parseInt(map.get("0").toString()), map.get("1").toString(), Integer.parseInt(map.get("2").toString()),
                    Integer.parseInt(map.get("3").toString()), Integer.parseInt(map.get("4").toString()), getRamdomPassword(10));

            listStudent.add(studentInfo);
        }

        for(StudentExcelTest studentInfo : listStudent){
            studentExcelRepository.save(studentInfo);
        }

        return "등록되었습니다.";
    }
}