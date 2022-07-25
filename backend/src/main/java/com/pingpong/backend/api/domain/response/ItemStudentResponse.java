package com.pingpong.backend.api.domain.response;

import com.pingpong.backend.api.domain.ItemEntity;
import com.pingpong.backend.api.domain.enums.ItemCategory;

public class ItemStudentResponse {
    private int itemId;
    private String name;
    private byte rarity;
    private ItemCategory category;
    private String describe;
    private int cnt;

    public ItemStudentResponse(ItemEntity itemEntity, int cnt){
        this.itemId = itemEntity.getItemId();
        this.name = itemEntity.getName();
        this.rarity = itemEntity.getRarity();
        this.category = itemEntity.getCategory();
        this.describe = itemEntity.getDescribe();
        this.cnt = cnt;
    }
}