package com.pingpong.backend.api.service;

import com.pingpong.backend.Exception.CustomException;
import com.pingpong.backend.Exception.ErrorCode;
import com.pingpong.backend.api.domain.*;
import com.pingpong.backend.api.domain.request.NoticeRequest;
import com.pingpong.backend.api.domain.response.ItemStudentResponse;
import com.pingpong.backend.api.repository.ItemRepository;
import com.pingpong.backend.api.repository.ItemStudentRepository;
import com.pingpong.backend.api.repository.StudentRepository;
import lombok.RequiredArgsConstructor;
import org.hibernate.cache.spi.support.AbstractReadWriteAccess;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ItemServiceImpl implements ItemService{
    @Autowired
    private ItemRepository itemRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private ItemStudentRepository itemStudentRepository;

    //전체 아이템 목록 조회
    @Override
    public List<ItemEntity> loadItem() throws Exception {
        return itemRepository.findAll();
    }

    //보유 아이템 목록 조회
    @Override
    public List<ItemStudentResponse> findItemById(int studentId) throws Exception {
        StudentEntity student = studentRepository.getOne(studentId);
        List<ItemEntity> haveItemlist = itemRepository.findAll();
        List<ItemStudentResponse> result = new ArrayList<>();
        for(ItemEntity itemlist : haveItemlist){
            result.add(new ItemStudentResponse(itemlist, itemStudentRepository.countByStudentEntityAndItemEntity(student, itemlist)));
        }
        return result;
    }

    //아이템 사용
    @Transactional
    public void delete(final int studentId, final int itemId){
        StudentEntity student = studentRepository.getOne(studentId);
        System.out.println(student.toString());
        ItemEntity item = itemRepository.getOne(itemId);
        ItemStudentEntity entity = itemStudentRepository.findFirstByStudentEntityAndItemEntity(student, item);
        itemStudentRepository.delete(entity);
    }

    //칭찬스티커 사용
    @Transactional
    public int updatePoint(final int studentId){
        StudentEntity entity = studentRepository.findById(studentId).orElseThrow(() -> new CustomException(ErrorCode.POSTS_NOT_FOUND));
        entity.updatePoint(entity.getPoint()-5);
        return entity.getPoint();
    }
}
