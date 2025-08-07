package com.seegene.main.domain.project.dto;

import static io.swagger.v3.oas.annotations.media.Schema.RequiredMode.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonInclude;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.seegene.main.domain.datacodemanagement.entity.TcdCdItmMlg;
import com.seegene.main.domain.project.constant.ProjectManagerYn;
import com.seegene.main.domain.project.entity.TpjPrj;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * ProjectInfoResponse
 * <PRE>
 * </PRE>
 *
 * @author : jskim4@seegene.com
 * @History <PRE>
 * No  Date           Author            Desc
 * ---- ------------ ---------------- ------------------------------------
 * 1 2023-07-10        jskim        최초작성
 * </PRE>
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "프로젝트 정보 Response Dto")
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ProjectInfoResponse {
    @Schema(description = "프로젝트 ID", example = "1", requiredMode = REQUIRED)
    private Long id;

    @Schema(description = "질병 카테고리 코드", example = "RP", requiredMode = REQUIRED)
    private String dissCatCd;

    @Schema(description = "질병 카테고리", example = "RP", requiredMode = REQUIRED)
    private String dissCat;

    @Schema(description = "목적 코드", example = "100", requiredMode = REQUIRED)
    private String devPupsCd;

    @Schema(description = "목적", example = "New Product Development", requiredMode = REQUIRED)
    private String devPups;

    @JsonProperty("startDat")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    @Schema(description = "시작 일자", example = "2023-06-30 00:00:00", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
    private LocalDateTime startDat;

    @JsonProperty("endDat")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    @Schema(description = "종료 일자", example = "2023-06-30 00:00:00", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
    private LocalDateTime endDat;

    @Schema(description = "프로젝트 명", example = "Project Name ABC", requiredMode = REQUIRED)
    private String prjNm;

    @Schema(description = "프로젝트 메모", example = "The result represents the positive result for E gene of Sarbecovirus in FAM channel, RdRP  gene and N gene of COVID-19 in Cal Red 610 and Quasar 670, respectively. ")
    private String prjDscrp;

    @Schema(description = "프로젝트 상태 코드", example = "PCNG")
    private String prjStsCd;

    @Schema(description = "프로젝트 상태 이름", example = "진행중")
    private String prjStsNm;

    @Schema(description = "프로젝트 역할 코드", example = "PJM", requiredMode = REQUIRED)
    private String projectRoleCode;

    @ArraySchema(arraySchema = @Schema(description = "사용자 역할 코드", oneOf = {
            ProjectProcessRole.class
    }))
    private List<ProjectProcessRole> projectProcessRole;


    @ArraySchema(arraySchema = @Schema(description = "프로젝트 멤버 정보", oneOf = {
            MemberInfo.class
    }))
    private List<MemberInfo> memberInfoList;

    public static ProjectInfoResponse of(TpjPrj tpjPrj, List<MemberInfo> memberInfoList, String diseaseCategory, String purpose, String projectStatus, List<ProjectProcessRole> projectProcessRole, String projectRoleCode) {

        return ProjectInfoResponse.builder()
                .id(tpjPrj.getId())
                .dissCatCd(tpjPrj.getDissCatCd())
                .dissCat(diseaseCategory)
                .devPupsCd(tpjPrj.getDevPupsCd())
                .devPups(purpose)
                .prjStsCd(tpjPrj.getPrjStsCd())
                .prjStsNm(projectStatus)
                .startDat(tpjPrj.getStartDat())
                .endDat(tpjPrj.getEndDat())
                .prjNm(tpjPrj.getPrjNm())
                .prjDscrp(tpjPrj.getPrjDscrp())
                .projectProcessRole(projectProcessRole)
                .memberInfoList(memberInfoList)
                .projectRoleCode(projectRoleCode)
                .build();

    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ProjectProcessRole {

        @Schema(description = "프로세스 권한 유형 코드", example = "MGMT", allowableValues = {"MGMT", "EDIT", "VIEW"}, requiredMode = REQUIRED)
        @NotBlank
        private String processRoleCode;

        @ArraySchema(arraySchema = @Schema(description = "프로세스 코드 리스트", example = "[\"PLNG\", \"OLDS\", \"ORDR\", \"FSBT\", \"PRTP\", \"VRFC\", \"VALD\", \"FOUP\"]", allowableValues = {"PLNG", "OLDS", "ORDR", "FSBT", "PRTP", "VRFC", "VALD", "FOUP"}))
        @Size(min = 1)
        private List<@Valid @NotBlank String> processCodes;

        public static ProjectProcessRole of(String processRoleCode, List<String> processCodes) {
            return ProjectProcessRole.builder()
                    .processRoleCode(processRoleCode)
                    .processCodes(processCodes)
                    .build();
        }
    }


    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class MemberInfo {

        @Schema(description = "파일 경로", example = "MEMBER/")
        private String filePath;

        @Schema(description = "멤버 이름", example = "홍길동")
        private String memberName;

        public static MemberInfo of(String filePath, String memberName) {

            return MemberInfo.builder()
                    .filePath(filePath)
                    .memberName(memberName)
                    .build();

        }
    }
}
