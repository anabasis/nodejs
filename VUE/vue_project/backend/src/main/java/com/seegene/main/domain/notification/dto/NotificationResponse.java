package com.seegene.main.domain.notification.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.seegene.main.domain.external.entity.mongo.Alarm;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZoneOffset;

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
@Builder
@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class NotificationResponse {

    @JsonProperty("title")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Schema(description = "알림 제목", example = "Project")
    private String title;

    @JsonProperty("contents")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Schema(description = "알림 내용", example = "The Project maanger for project has been transferred")
    private String contents;

    @JsonProperty("notificationDate")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Schema(description = "알림 날짜", example = "2023-06-26 01:08:29")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime notiDt;

    @JsonProperty("url")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Schema(description = "알림 url", example = "http://seegene.dev.noti.2983619")
    private String url;

    @JsonProperty("readYn")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Schema(description = "읽음 유무", example = "n")
    private String readYn;

    public static NotificationResponse entityToDto(Alarm alarm){
        return NotificationResponse.builder()
                .title(alarm.getTitle())
                .contents(alarm.getContent())
                .notiDt(alarm.getCrtDt().atZone(ZoneId.systemDefault()).withZoneSameInstant(ZoneOffset.UTC).toLocalDateTime())
                .url(alarm.getLndgUrl())
                .build();
    }

}
