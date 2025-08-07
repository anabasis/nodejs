package com.seegene.main.domain.mypage.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class MyInfoRequest
{
        @JsonProperty("jobNm")
        @Schema(description = "jobNm", example = "jobNm")
        String jobNm;

        @JsonProperty("prflFlNum")
        @Schema(description = "prflFlNum", example = "prflFlNum")
        Long prflFlNum;
}
