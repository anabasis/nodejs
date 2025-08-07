package com.seegene.main.domain.software.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.seegene.main.domain.common.dto.FileInfoResponse;
import com.seegene.main.domain.software.entity.TswSwRels;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class SoftwareReleaseDetailResponse {

    @JsonProperty("softwareReleaseNumber")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Schema(description = "소프트웨어 릴리즈 버전 고유 번호", example = "10001", requiredMode = Schema.RequiredMode.REQUIRED)
    private long swRelsNum;

    @JsonProperty("version")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Schema(description = "소프트웨어 버전", example = "V.xxx.xx", requiredMode = Schema.RequiredMode.REQUIRED)
    private String ver;

    @JsonProperty("softwareNumber")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Schema(description = "소프트웨어 고유 아이디", example = "1", requiredMode = Schema.RequiredMode.REQUIRED)
    private long swNum;

    @JsonProperty("releaseNote")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Schema(description = "Release Note", example = "Qorem ipsum dolor sit amet, consectetur adipiscing elit", requiredMode = Schema.RequiredMode.REQUIRED)
    private String relsNte;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Schema(description = "소프트웨어 파일")
    private FileInfoResponse softwareFileResponse;

    @JsonProperty("createUid")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Schema(description = "생성자 유저아이디", requiredMode = Schema.RequiredMode.REQUIRED)
    private String crtrUid;

    @JsonProperty("createDate")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    @Schema(description = "생성일자", requiredMode = Schema.RequiredMode.REQUIRED)
    private LocalDateTime crtDt;

    @JsonProperty("modifierUid")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Schema(description = "수정자 유저아이디")
    private String mdfrUid;

    @JsonProperty("modifyDate")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    @Schema(description = "수정일자", requiredMode = Schema.RequiredMode.REQUIRED)
    private LocalDateTime mdfDt;

    public static SoftwareReleaseDetailResponse entityToDto(TswSwRels tswSwRels) {
        return SoftwareReleaseDetailResponse.builder()
                .swRelsNum(tswSwRels.getId())
                .ver(tswSwRels.getVer())
                .swNum(tswSwRels.getTswSw().getId())
                .relsNte(tswSwRels.getRelsNte())
                .softwareFileResponse(FileInfoResponse.of(tswSwRels.getSwfile()))
                .crtrUid(tswSwRels.getCrtrUid())
                .crtDt(tswSwRels.getCrtDt())
                .mdfrUid(tswSwRels.getMdfrUid())
                .mdfDt(tswSwRels.getMdfDt())
                .build();
    }
}
