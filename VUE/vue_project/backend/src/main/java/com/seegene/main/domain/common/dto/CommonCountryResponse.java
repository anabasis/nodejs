package com.seegene.main.domain.common.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.seegene.main.domain.datacodemanagement.entity.TcdCntry;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class CommonCountryResponse {
    @Schema(description = "국가 코드", requiredMode = Schema.RequiredMode.REQUIRED)
    private String countryCd;
    @Schema(description = "국가명(한글)")
    private String korCountryNm;
    @Schema(description = "국가명(영어)")
    private String engCountryNm;
    @Schema(description = "국가명(원어)")
    private String nativeCountryNm;

    public static CommonCountryResponse of(TcdCntry cntry){
        return CommonCountryResponse.builder()
            .countryCd(cntry.getId())
            .korCountryNm(cntry.getKorCntryNm())
            .engCountryNm(cntry.getEngCntryNm())
            .nativeCountryNm(cntry.getMothrCntryNm())
            .build();
    }
}
