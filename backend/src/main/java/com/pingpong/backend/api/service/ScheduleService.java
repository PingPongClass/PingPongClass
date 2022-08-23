package com.pingpong.backend.api.service;

import com.pingpong.backend.api.domain.RankingEntity;
import com.pingpong.backend.api.domain.StudentEntity;
import com.pingpong.backend.api.repository.RankingRepository;
import com.pingpong.backend.api.repository.RefreshTokenRepository;
import com.pingpong.backend.api.repository.StudentRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.Arrays;
import java.util.List;

@Slf4j
@EnableScheduling
@Service
@RequiredArgsConstructor
public class ScheduleService {

    private final StudentRepository studentRepository;
    private final RankingRepository rankingRepository;

    private final RefreshTokenRepository refreshTokenRepository;

    //매일 8시마다 실행
    @Scheduled(cron= "0 0 8 * * *", zone = "Asia/Seoul")
//    @Scheduled(cron="0 */1 * * * *", zone = "Asia/Seoul") //5분마다 -> 8시마다로 바꿔주세요~
    public void everyDay_9_00_RankingJob(){
        System.out.println("8:00 RANKING 디비 갱신 시작!");
        rankingRepository.deleteAll();
        List<StudentEntity> list = studentRepository.findAllByOrderByTotalPointDesc();
        int size = list.size();

        //등수 제작
        int[] rank = new int[size];
        Arrays.fill(rank,1);
        for(int i=1; i<size; i++){
            rank[i] = list.get(i).getTotalPoint() == list.get(i-1).getTotalPoint()? rank[i - 1] : i + 1;
        }

        //DB 저장
        for(int i=0; i<size; i++){
            rankingRepository.save(new RankingEntity(list.get(i), rank[i], list.get(i).getTotalPoint()));
        }

        //만료된 RefreshToken 삭제
        refreshTokenRepository.deleteByExpireTimeLessThan(LocalDateTime.now(ZoneId.of("Asia/Seoul")));

        System.out.println("8:00 RANKING 디비 갱신 완료!");
    }
}
