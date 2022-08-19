package com.pingpong.backend.api.domain;

import com.pingpong.backend.api.domain.enums.ItemCategory;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name="item")
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ItemEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int itemId;

    @Column(nullable = false, length = 20)
    private String name;

    @Column(nullable = false)
    private byte rarity;

//    @Column(nullable = false)
//    private byte category;
    @Enumerated(EnumType.STRING)
    @Column(length = 10)
    private ItemCategory category;

    @Column(nullable = false)
    private String itemDescribe;
}