package com.seegene.main.domain.external.dto;


import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.seegene.main.domain.common.dto.FileInfoResponse;
import com.seegene.main.domain.external.entity.TguDtlGud;
import com.seegene.main.domain.external.entity.TguDtlGudAtch;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

import java.util.List;
import java.util.stream.Collectors;

import static io.swagger.v3.oas.annotations.media.Schema.RequiredMode.REQUIRED;

@Getter
@Builder
public class GuideListResponse {
    @JsonProperty("guideNumber")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Schema(description = "guide 번호", example = "1", requiredMode = REQUIRED)
    private Long dtlGudNum;

    @JsonProperty("title")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Schema(description = "Title", example = "DHF 지침서", requiredMode = REQUIRED)
    private String titl;

    @JsonProperty("guideAttachmentRequestList")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Schema(description = "첨부 파일")
    List<FileInfoResponse> guideAttachmentrequestList;

    public static GuideListResponse of(TguDtlGud tguDtlGud) {
        return GuideListResponse.builder()
                .dtlGudNum(tguDtlGud.getId())
                .titl(tguDtlGud.getTitl())
                .guideAttachmentrequestList(
                        tguDtlGud.getTguDtlGudAtches()
                                .stream()
                                .map(TguDtlGudAtch::getTsyFl)
                                .map(FileInfoResponse::of)
                                .collect(Collectors.toList())
                )
                .build();
    }
}
