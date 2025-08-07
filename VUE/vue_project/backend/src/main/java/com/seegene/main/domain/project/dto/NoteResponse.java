package com.seegene.main.domain.project.dto;


import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class NoteResponse {

    @JsonProperty("todayList")
    @Schema(description = "오늘 노트 리스트")
    List<NoteDetailResponse> todayList;
    @JsonProperty("thisWeekList")
    @Schema(description = "이번주 노트 리스트")
    List<NoteDetailResponse> thisWeekList;
    @JsonProperty("lastWeekList")
    @Schema(description = "전주 노트 리스트")
    List<NoteDetailResponse> lastWeekList;
    @JsonProperty("oldNoteList")
    @Schema(description = "지난 노트 리스트")
    List<NoteDetailResponse> oldNoteList;
}
