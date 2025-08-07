package com.seegene.main.domain.software.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.querydsl.core.annotations.QueryProjection;
import com.seegene.main.domain.common.dto.FileInfoResponse;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class SoftwareListResponse {
    @JsonProperty("softwareNumber")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Schema(description = "소프트웨어 고유 아이디", example = "1", requiredMode = Schema.RequiredMode.REQUIRED)
    private long swNum;

    @JsonProperty("softwareName")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Schema(description = "소프트웨어 이름", example = "software name", requiredMode = Schema.RequiredMode.REQUIRED)
    private String swNm;

    @JsonProperty("softwareRelease")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private SoftwareListReleaseResponse softwareRelease;

    @JsonProperty("description")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Schema(description = "설명", example = "Qorem ipsum dolor sit amet, consectetur adipiscing elit", requiredMode = Schema.RequiredMode.REQUIRED)
    private String dscrp;

    @JsonProperty("iconFile")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Schema(description = "소프트웨어 아이콘 파일 번호")
    private FileInfoResponse iconFile;

    @JsonProperty("ivdRuoCode")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Schema(description = "All/IVD/RUO", example = "All")
    private String ivruDvsCd;

    @JsonProperty("createDateTime")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    @Schema(description = "생성 일자", example = "2023-12-31 12:00:00", requiredMode = Schema.RequiredMode.REQUIRED)
    private LocalDateTime crtDt;

    @JsonProperty("creatorUid")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Schema(description = "작성자 유저 아이디", example = "DA", requiredMode = Schema.RequiredMode.REQUIRED)
    private String crtrUid;

    @JsonProperty("modifyDateTime")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    @Schema(description = "수정 일자", example = "2024-12-31 12:00:00", requiredMode = Schema.RequiredMode.REQUIRED)
    private LocalDateTime mdfDt;

    @JsonProperty("modifierUid")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Schema(description = "수정자 유저 아이디", example = "DA")
    private String mdfrUid;

    @QueryProjection
    public SoftwareListResponse(long swNum,
                                String swNm,
                                SoftwareListReleaseResponse softwareRelease,
                                String dscrp,
                                FileInfoResponse iconFile,
                                String ivruDvsCd,
                                LocalDateTime crtDt,
                                String crtrUid,
                                LocalDateTime mdfDt,
                                String mdfrUid
    ) {
        this.swNum = swNum;
        this.swNm = swNm;
        this.softwareRelease = softwareRelease;
        this.dscrp = dscrp;
        this.iconFile = iconFile;
        this.ivruDvsCd = ivruDvsCd;
        this.crtDt = crtDt;
        this.crtrUid = crtrUid;
        this.mdfDt = mdfDt;
        this.mdfrUid = mdfrUid;
    }
}
