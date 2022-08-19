package com.pingpong.backend.api.domain;

import org.springframework.data.jpa.domain.Specification;

public class StudentSpecification {
    public static Specification<StudentEntity> equalGrade(Integer grade){
        return ((root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("grade"), grade));
    }

    public static Specification<StudentEntity> equalClassNum(Integer classNum){
        return ((root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("classNum"), classNum));
    }

    public static Specification<StudentEntity> equalName(String name){
        return ((root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("name"), name));
    }
}
