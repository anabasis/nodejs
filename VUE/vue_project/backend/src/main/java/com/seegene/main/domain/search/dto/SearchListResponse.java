package com.seegene.main.domain.search.dto;

import java.util.List;

import com.seegene.main.domain.project.dto.ProjectCreateRequest;
import com.seegene.main.domain.project.entity.TpjPrj;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

import static io.swagger.v3.oas.annotations.media.Schema.RequiredMode.REQUIRED;

/**
 * class 한글 설명
 * <PRE>
 * </PRE>
 *
 * @author : jskim4@seegene.com
 * @History <PRE>
 * No  Date           Author            Desc
 * ---- ------------ ---------------- ------------------------------------
 * 1 2023-07-06        jskim4        최초작성
 * </PRE>
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "통합검색 Response Dto")
public class SearchListResponse {
    @ArraySchema(arraySchema = @Schema(description = "프로젝트 검색 리스트", oneOf = {
            Project.class
    }))
    private List<Project> projects;

//    @ArraySchema(arraySchema = @Schema(description = "리퀘스트 리스트", oneOf = {
//            Request.class
//    }))
//    private List<Request> requests;


    public static SearchListResponse of(List<Project> projects) {
        return SearchListResponse.builder()
                .projects(projects)
                .build();

    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Project {

        @Schema(description = "프로젝트 아이디", example = "1")
        private Long id;
        @Schema(description = "프로젝트 이름", example = "Project Test")
        private String prjNm;

        public static Project of(TpjPrj tpjPrj) {
            return Project.builder()
                    .id(tpjPrj.getId())
                    .prjNm(tpjPrj.getPrjNm())
                    .build();
        }

    }

//    @Data
//    @Builder
//    @NoArgsConstructor
//    @AllArgsConstructor
//    public class Request {
//
//        @Schema(description = "프로젝트 아이디", example = "1")
//        private Long id;
//        @Schema(description = "프로젝트 이름", example = "Project Test")
//        private String prjNm;
//
//        public static Request of(TpjPrj tpjPrj) {
//            return Project.builder()
//                    .id(tpjPrj.getId())
//                    .prjNm(tpjPrj.getPrjNm())
//                    .build();
//        }
//
//    }

}
