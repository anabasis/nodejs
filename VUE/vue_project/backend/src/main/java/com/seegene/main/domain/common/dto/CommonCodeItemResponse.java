package com.seegene.main.domain.common.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.seegene.main.domain.datacodemanagement.entity.TcdCdItmMlg;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class CommonCodeItemResponse {
    @Schema(description = "아이템 코드", example = "TEST_CODE", requiredMode = Schema.RequiredMode.REQUIRED)
    private String cd;
    @Schema(description = "아이템 코드", example = "TEST_CODE", requiredMode = Schema.RequiredMode.REQUIRED)
    private String cdNm;
    @Schema(description = "정렬 순서", example = "1", requiredMode = Schema.RequiredMode.REQUIRED)
    private Long sortNum;

    public static List<CommonCodeItemResponse> of(List<TcdCdItmMlg> tcdCdItmMlgList) {
        return tcdCdItmMlgList.stream().map(tcdCdItmMlg -> {
            return CommonCodeItemResponse.builder()
                    .cd(tcdCdItmMlg.getCdItm().getCd())
                    .cdNm(tcdCdItmMlg.getCdNm())
                    .sortNum(tcdCdItmMlg.getCdItm().getSortNum())
                    .build();
        }).toList();
    }
}
