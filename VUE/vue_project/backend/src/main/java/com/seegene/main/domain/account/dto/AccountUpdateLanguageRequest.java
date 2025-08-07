package com.seegene.main.domain.account.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Schema(description = "통합설정 언어 정보 Request DTO")
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class AccountUpdateLanguageRequest {
    @JsonProperty("languageCode")
    @Schema(description = "언어", example = "ko", requiredMode = Schema.RequiredMode.REQUIRED)
    private String languageCode;
}
