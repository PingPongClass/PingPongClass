package com.pingpong.backend.api.domain.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.pingpong.backend.api.domain.StudentEntity;
import lombok.*;

import javax.validation.constraints.NotNull;
import java.util.Set;
import java.util.stream.Collectors;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserDto {


    @NotNull
    private String name;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @NotNull
    private String password;

//  학생용
    private int studentId;

    private byte grade;

    private byte classNum;

    private byte studentNum;

//  선생님용
    private int teacherId;

    private String birth;

    private byte manageGrade;

    private byte isAdmin;

    private Set<AuthorityDto> authorityDtoSet;

    public static UserDto from(StudentEntity student) {
        if(student == null) return null;

        return UserDto.builder()
                .studentId(student.getStudentId())
                .name(student.getName())
                .password(student.getPassword())
                .authorityDtoSet(student.getAuthorities().stream()
                        .map(authority -> AuthorityDto.builder().authorityName(authority.getAuthorityName()).build())
                        .collect(Collectors.toSet()))
                .build();
    }
}