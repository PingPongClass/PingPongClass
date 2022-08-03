package com.pingpong.backend.api.controller;

import com.pingpong.backend.api.service.ExcelService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.apache.poi.openxml4j.exceptions.InvalidFormatException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Api(value = "학생 엑셀 TEST API", tags={"엑셀"})
@RestController
@CrossOrigin("*")
@RequestMapping("/ssafy/excel")
@RequiredArgsConstructor
public class ExcelController {
    private final ExcelService excelService;

    @ApiOperation(value = "학생 일괄등록", notes = "엑셀 파일 첨부를 통해 학생을 일괄등록 합니다.", httpMethod = "POST", produces = "multipart/form-data")
    @RequestMapping(value = "/student", method = RequestMethod.POST)
    public String addStudentExcel(@RequestPart("file") MultipartFile file) throws IOException, InvalidFormatException {
        String message = excelService.addStudent(file);
        return message;
    };

    @ApiOperation(value = "선생님 일괄등록", notes = "엑셀 파일 첨부를 통해 선생님을 일괄등록 합니다.", httpMethod = "POST", produces = "multipart/form-data")
    @RequestMapping(value = "/teacher", method = RequestMethod.POST)
    public String addTeacherExcel(@RequestPart("file") MultipartFile file) throws IOException, InvalidFormatException {
        String message = excelService.addTeacher(file);
        return message;
    };
}
