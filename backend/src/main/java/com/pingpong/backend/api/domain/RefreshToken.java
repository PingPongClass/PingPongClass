package com.pingpong.backend.api.domain;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@Table(name = "refresh_token")
@Entity
public class RefreshToken {

    @Id
    @Column(name = "rt_key")
    private int key;

    @Column(name = "rt_value")
    private String value;

    @Column(name = "rt_expire_time")
    private LocalDateTime expireTime;    //일주일 후에 만료

    @Builder
    public RefreshToken(int key, String value, LocalDateTime expireTime) {
        this.key = key;
        this.value = value;
        this.expireTime = LocalDateTime.now().plusWeeks(1);
    }

    public RefreshToken updateValue(String token) {
        this.value = token;
        this.expireTime = LocalDateTime.now().plusWeeks(1); //일주일 연장
        return this;
    }
}