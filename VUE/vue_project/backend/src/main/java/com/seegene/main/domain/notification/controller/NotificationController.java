package com.seegene.main.domain.notification.controller;

import com.seegene.main.domain.notification.dto.NotificationResponse;
import com.seegene.main.domain.notification.service.NotificationService;
import com.seegene.main.global.auth.PlatformUserInfo;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

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
@Tag(name = "notification", description = "Notification API 담당자 : 곽호원")
@RestController
@RequestMapping("/notification")
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationService notificationService;
    @Operation(summary = "[IFM013]알림 목록 조회 23.08.25 [완료]", description = "알림 목록을 조회한다.")
    @GetMapping(path = "/list", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<NotificationResponse> getMyNotificationList(PlatformUserInfo userDetails){
        return notificationService.getNotificationList(userDetails);
    }

    @Operation(summary = "[IFM141]알림 조회 후 사용자 알람 시간 업데이트 23.08.25 [완료]", description = "알림 조회 후 사용자 알람 시간 업데이트 한다.")
    @PostMapping(path = "/list/update", produces = MediaType.APPLICATION_JSON_VALUE)
    public void updateAlarmTime(PlatformUserInfo userDetails){
        notificationService.updateAlarmTime(userDetails);
    }

}
