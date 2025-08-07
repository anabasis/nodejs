package com.seegene.main.domain.notification.service;

import com.seegene.main.domain.notification.dto.NotificationResponse;
import com.seegene.main.domain.notification.repository.mongo.AlarmRepository;
import com.seegene.main.domain.user.entity.TusUsr;
import com.seegene.main.domain.user.repository.TusUsrRepository;
import com.seegene.main.global.auth.PlatformUserInfo;
import com.seegene.main.global.exception.DataNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.List;
import java.util.stream.IntStream;

import static java.time.ZoneId.of;
import static java.util.stream.Collectors.toList;

/**
 * class 한글 설명
 * <PRE>
 * </PRE>
 * @author   : hwkwak@mz.co.kr
 *
 * @History
 * <PRE>
 * No  Date           Author            Desc
 *---- ------------ ---------------- ------------------------------------
 *   1 2023-06-29        hwkwak        최초작성
 * </PRE>
 */
@Service
@Slf4j
@RequiredArgsConstructor
public class NotificationService {
    private final TusUsrRepository tusUsrRepository;
    private final AlarmRepository alarmRepository;

    public List<NotificationResponse> getNotificationList(PlatformUserInfo user) {
        List<NotificationResponse> collect = alarmRepository.findByToUsrUidOrderByCrtDtDesc(user.getUsrUid())
                .stream()
                .map(NotificationResponse::entityToDto)
                .collect(toList());
        TusUsr tusUsr = tusUsrRepository.findById(user.getUsrUid()).orElseThrow(DataNotFoundException::new);
        LocalDateTime lstTime = tusUsr.getLstAlmInqrDt();
        IntStream.range(0, collect.size()).forEach(i -> collect.get(i).setReadYn(collect.get(i).getNotiDt().isBefore(lstTime) ? "Y" : "N"));
        return collect;
    }

    @Transactional
    public void updateAlarmTime(PlatformUserInfo userDetails) {
        ZoneId utcTime = of("UTC");
        tusUsrRepository.findById(userDetails.getUsrUid()).orElseThrow(DataNotFoundException::new)
                .setLstAlmInqrDt(LocalDateTime.now(utcTime));
    }
}
