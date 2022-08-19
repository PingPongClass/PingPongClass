package com.pingpong.backend.api.domain;


import com.pingpong.backend.api.domain.request.StudentRequest;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import javax.persistence.*;
import java.util.Set;
import java.util.stream.Collectors;

@Entity(name = "student")
@Table(name="student")
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class StudentEntity {
    @Id
    private int studentId;

    @Column(nullable = false, length = 10)
    private String name;

    @Column(nullable = false)
    private byte grade;

    @Column(nullable = false)
    private byte classNum;

    @Column(nullable = false)
    private byte studentNum;

    @Column(length = 40, unique = true)
    private String email;

    @Column(nullable = false, length=256)
    private String password;

    @Column(length=256)
    private String profile;

    @Column(nullable = false)
    @ColumnDefault("0")
    private int point;

    @Column(nullable = false)
    @ColumnDefault("0")
    private int totalPoint;

    @Column(length = 50)
    private String introduce;

    @Column(nullable = false, name = "activated")
    private boolean activated=true;

    @ManyToMany(cascade = CascadeType.REMOVE)
    @JoinTable(
            name = "student_authority",
            joinColumns = {@JoinColumn(name = "student_id", referencedColumnName ="studentId")},  //외래키
            inverseJoinColumns = {@JoinColumn(name = "authority_name", referencedColumnName = "authorityName")})   //반대 엔티티의 외래키
    private Set<Authority> authorities;

    @Column(nullable = false)
    @ColumnDefault("0")
    private int jandiColor;

    @Column(nullable = false)
    @ColumnDefault("0")
    private int borderColor;

    @Builder
    public StudentEntity(int studentId, String name, byte grade, byte classNum, byte studentNum, String email, String password, String profile, int point, int totalPoint, String introduce){
        this.studentId = studentId;
        this.name = name;
        this.grade = grade;
        this.classNum=classNum;
        this.studentNum=studentNum;
        this.email=email;
        this.password=password;
        this.profile=profile;
        this.point=point;
        this.totalPoint=totalPoint;
        this.introduce=introduce;
    }

    public StudentEntity(int studentId, String name, byte grade, byte classNum, byte studentNum, String password){
        this.studentId = studentId;
        this.name = name;
        this.grade = grade;
        this.classNum=classNum;
        this.studentNum=studentNum;
        this.password=password;
    }

    public void updatePoint(int point) {
        this.point += point;
        this.totalPoint += point;
    }

    public void updateJandiColor(int jandiColor) {
        this.jandiColor=jandiColor;
    }

    public void updateBorderColor(int borderColor) {
        this.borderColor=borderColor;
    }

    public void updatePassword(String password) {
        this.password=password;
    }

    public void modifyStudent(StudentRequest request){
        if(request.getGrade()!=0){
            this.grade = request.getGrade();
        }
        if(request.getClassNum()!=0){
            this.classNum = request.getClassNum();
        }
        if(request.getStudentNum()!=0){
            this.studentNum = request.getStudentNum();
        }
        if("".equals(request.getEmail())==false && request.getEmail()!=null){
            this.email = request.getEmail();
        }
        if("".equals(request.getPassword())==false && request.getPassword()!=null){
            this.password = request.getPassword();
        }
        if(request.getIntroduce()!=null) {
            this.introduce = request.getIntroduce();
        }
        if("".equals(request.getProfile())==false && request.getProfile()!=null){
            this.profile = request.getProfile();
        }
    }

    public void usePoint(int point){
        this.point=point;
    }

    public static StudentEntity from(StudentEntity student) {
        if(student == null) return null;
        return StudentEntity.builder()
                .studentId(student.getStudentId())
                .name(student.getName())
                .password(student.getPassword())
                .authorities(student.getAuthorities().stream()
                        .map(authority -> Authority.builder().authorityName(authority.getAuthorityName()).build())
                        .collect(Collectors.toSet()))
                .build();
    }
}