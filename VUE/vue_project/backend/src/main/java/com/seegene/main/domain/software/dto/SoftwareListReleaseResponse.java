package com.seegene.main.domain.software.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.querydsl.core.annotations.QueryProjection;
import com.seegene.main.domain.common.dto.FileInfoResponse;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;


@Getter
@Builder
public class SoftwareListReleaseResponse {

    @JsonProperty("softwareReleaseNumber")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Schema(description = "소프트웨어 릴리즈 버전 고유 번호", example = "10001", requiredMode = Schema.RequiredMode.REQUIRED)
    private long swRelsNum;

    @JsonProperty("version")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Schema(description = "소프트웨어 버전", example = "V.xxx.xx", requiredMode = Schema.RequiredMode.REQUIRED)
    private String ver;

    @JsonProperty("softwareFile")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private FileInfoResponse softwareFile;


    @QueryProjection
    public SoftwareListReleaseResponse(
            long swRelsNum,
            String ver,
            FileInfoResponse softwareFile) {
        this.swRelsNum = swRelsNum;
        this.ver = ver;
        this.softwareFile = softwareFile;
    }

}
