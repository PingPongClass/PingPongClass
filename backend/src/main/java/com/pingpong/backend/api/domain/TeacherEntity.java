package com.pingpong.backend.api.domain;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import javax.persistence.*;
import java.util.Set;
import java.util.stream.Collectors;

@Entity(name = "teacher")
@Table(name = "teacher")
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
//@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class TeacherEntity {
    @Id
    private int teacherId;

    @Column(nullable = false, length=10)
    private String name;

    @Column(length=40, unique=true)
    private String email;

    @Column(nullable = false, length=256)
    private String password;

    @Column(nullable = false, length = 8)
    private String birth;

    @Column(nullable = false)
    private int manageGrade;

    @Column(nullable = false)
    @ColumnDefault("0")
    private int isAdmin;

    @Column
    private String profile;

    @Column(name = "activated")
    private boolean activated=true;

    @ManyToMany(cascade = CascadeType.REMOVE)
    @JoinTable(
            name = "teacher_authority",
            joinColumns = {@JoinColumn(name = "teacher_id", referencedColumnName = "teacherId")},
            inverseJoinColumns = {@JoinColumn(name = "authority_name", referencedColumnName = "authorityName")})
    private Set<Authority> authorities;

    @Builder
    public TeacherEntity(int teacherId, String name, String email, int isAdmin, String password, String birth, int manageGrade, String profile) {
        this.teacherId = teacherId;
        this.name = name;
        this.password = password;
        this.birth=birth;
        this.manageGrade=manageGrade;
        this.email=email;
        this.isAdmin=isAdmin;
        this.profile=profile;
    }

    @Builder
    public TeacherEntity(int teacherId, String name, String password, String birth, int manageGrade, int isAdmin) {
        this.teacherId = teacherId;
        this.name = name;
        this.password = password;
        this.birth=birth;
        this.manageGrade=manageGrade;
        this.isAdmin=isAdmin;
    }

    public void updatePassword(String password){
        this.password = password;
    }

    public void updateFirstEmail(String email){
        this.email = email;
    }

    public void modifyTeacher(String email, String password, String profile, int manageGrade){
        if("".equals(email) == false && email!=null){
            this.email =email;
        }
        if("".equals(password) == false && password!=null){
            this.password = password;
        }
        if("".equals(profile) == false && profile!=null){
            this.profile = profile;
        }
        if(manageGrade!=0){
            this.manageGrade = manageGrade;
        }
    }

    public static TeacherEntity from(TeacherEntity teacher) {
        if(teacher == null) return null;

        return TeacherEntity.builder()
                .teacherId(teacher.getTeacherId())
                .name(teacher.getName())
                .password(teacher.getPassword())
                .authorities(teacher.getAuthorities().stream()
                        .map(authority -> Authority.builder().authorityName(authority.getAuthorityName()).build())
                        .collect(Collectors.toSet()))
                .build();
    }

}
