package com.seegene.main.domain.project.dto;


import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class NoteCountResponse {
    @JsonProperty("usrUid")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Schema(description = "해당 사용자 uid", requiredMode = Schema.RequiredMode.REQUIRED)
    public String usrUid;
    @JsonProperty("noteCount")
    @Schema(description = "new note count")
    public Long noteCount;
}
