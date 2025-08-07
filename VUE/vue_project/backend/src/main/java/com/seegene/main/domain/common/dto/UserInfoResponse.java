package com.seegene.main.domain.common.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.seegene.main.domain.common.entity.TsyFl;
import com.seegene.main.domain.user.entity.TusUsr;
import io.swagger.v3.oas.annotations.media.Schema;

public record UserInfoResponse(
    @JsonProperty("usrUid")
    @Schema(description = "사용자 아이디", example = "아이디")
    String usrUid,
    @JsonProperty("emlId")
    @Schema(description = "사용자 메일", example = "메일")
    String emlId,
    @JsonProperty("usrNm")
    @Schema(description = "사용자 명", example = "김씨젠")
    String usrNm,
    @JsonProperty("corpNo")
    @Schema(description = "회사 번호", example = "321313")
    Long corpNo,
    @JsonProperty("corpNm")
    @Schema(description = "회사명", example = "corpNm")
    String corpNm,
    @JsonProperty("orgnNm")
    @Schema(description = "기관 ", example = "orgnNm")
    String orgnNm,
    @JsonProperty("jobTitle")
    @Schema(description = "jobTitle", example = "과장")
    String jobTitle,
    @JsonProperty("jobNm")
    @Schema(description = "jobNm", example = "테스트")
    String jobNm,
    @JsonProperty("fileInfoResponse")
    @Schema(description = "파일 정보")
    FileInfoResponse fileInfoResponse
) {
    public static UserInfoResponse of(TusUsr tusUsr, TsyFl tsyFl) {
        return new UserInfoResponse(
                tusUsr.getId(),
                tusUsr.getEmlId(),
                tusUsr.getUsrNm(),
                tusUsr.getTusCorp().getId(),
                tusUsr.getTusCorp().getCorpNm(),
                tusUsr.getOrgnNm(),
                tusUsr.getJobTitl(),
                tusUsr.getJobNm(),
                FileInfoResponse.of(tsyFl)
        );
    }
}