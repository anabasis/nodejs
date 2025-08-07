package com.seegene.main.domain.project.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.seegene.main.domain.project.constant.ProcessOperation;
import com.seegene.main.domain.project.constant.ProjectManagerYn;
import com.seegene.main.domain.project.constant.ProjectMemberOperation;
import com.seegene.main.domain.project.entity.*;
import com.seegene.main.domain.user.entity.TusUsr;
import com.seegene.main.global.exception.InvalidValueException;
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
import org.springframework.util.CollectionUtils;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

import static io.swagger.v3.oas.annotations.media.Schema.RequiredMode.REQUIRED;

/**
 * ProjectCreateRequest
 * <PRE>
 * </PRE>
 *
 * @author : jskim4@seegene.com
 * @History <PRE>
 * No  Date           Author            Desc
 * ---- ------------ ---------------- ------------------------------------
 * 1 2023-07-07        jskim        최초작성
 * </PRE>
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "프로젝트 수정 Resquest Dto")
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ProjectUpdateRequest {
    @Schema(description = "시작 일자", example = "2023-07-03 00:00:00", requiredMode = Schema.RequiredMode.NOT_REQUIRED, type = "string")
    @JsonProperty("startDat")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime startDat;

    @Schema(description = "종료 일자", example = "2023-12-31 00:00:00", requiredMode = Schema.RequiredMode.NOT_REQUIRED, type = "string")
    @JsonProperty("endDat")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime endDat;

    @Schema(description = "프로젝트 명", example = "Update Project Name ABC", requiredMode = REQUIRED)
    @NotBlank
    private String prjNm;

    @Schema(description = "프로젝트 설명", example = "Update The result represents the positive result for E gene of Sarbecovirus in FAM channel, RdRP  gene and N gene of COVID-19 in Cal Red 610 and Quasar 670, respectively. ")
    private String prjDscrp;

    @Schema(description = "목적 코드", example = "DP02", requiredMode = REQUIRED, allowableValues = {"DP01", "DP02"})
    @NotBlank
    private String devPupsCd;

    @Schema(description = "제품 명", example = "Update anyflex assay pack")
    private String prdNm;

    @Schema(description = "과제 코드", example = "Update SG2142-VB-A")
    private String taskCd;

    @ArraySchema(arraySchema = @Schema(description = "인허가 코드", example = "[\"CE\",\"FDA\",\"MFDS\",\"TGA\",\"HCANA\", \"COFPR\",\"FDA510K\",\"ETC\"]", allowableValues = {"CE", "FDA", "MFDS", "TGA", "HCANA", "COFPR", "FDA510K", "ETC"}))
    private List<String> regulatoryAffairCodeList;

    @ArraySchema(arraySchema = @Schema(description = "대상 국가 코드", example = "[\"KR\",\"EN\"]", allowableValues = {"KR", "EN"}))
    private List<String> targetCountryCodeList;

    @ArraySchema(arraySchema = @Schema(description = "프로세스 코드 리스트", oneOf = {
            ProjectUpdateProcessRequest.class
    }))
    private List<@Valid @NotNull ProjectUpdateProcessRequest> processCodes;

    @ArraySchema(arraySchema = @Schema(description = "프로젝트 멤버 리스트", oneOf = {
            ProjectUpdateMemberRequest.class
    }))
    private List<@Valid @NotNull ProjectUpdateMemberRequest> members;

    public void validate() {
        if (!CollectionUtils.isEmpty(this.members)) {
            this.members.forEach(memberRequest -> {
                if (Objects.equals(memberRequest.getProjectMemberOperation(), ProjectMemberOperation.ADD) || Objects.equals(memberRequest.getProjectMemberOperation(), ProjectMemberOperation.UPDATE)) {
                    //프로젝트 매니저일 경우 프로젝트 멤버의 프로세스 역할 미입력
//                    if (Objects.equals(memberRequest.getProjectManagerYn(), ProjectManagerYn.Y) && !CollectionUtils.isEmpty(memberRequest.getMemberProcess())) {
//                        throw new InvalidValueException("If member is a project manager, process should be empty.");
//                        //프로젝트 매니저 아닐 경우 프로젝트 멤버의 프로세스 역할 입력
//                    } else
                    if (Objects.equals(memberRequest.getProjectManagerYn(), ProjectManagerYn.N) && CollectionUtils.isEmpty(memberRequest.getMemberProcess())) {
                        throw new InvalidValueException("If member is not a project manager, process must not be empty.");
                    }
                } else {
                    if (!CollectionUtils.isEmpty(memberRequest.getMemberProcess())) {
                        throw new InvalidValueException("If a member is deleted, process must not be empty.");
                    }
                }
            });
        }
    }

    public List<TpjPrjRgltrAfr> toTpjPrjRgltrAfrEntitys(TpjPrj tpjPrj) {
        return this.regulatoryAffairCodeList.stream().map(rgltAfrCd -> TpjPrjRgltrAfr.builder()
                .tpjPrj(tpjPrj)
                .rgltrAfrCd(rgltAfrCd)
                .build()
        ).toList();
    }

    public List<TpjPrjTgMakt> toTpjPrjTgMaktEntitys(TpjPrj tpjPrj) {

        return this.targetCountryCodeList.stream().map(tgMaktCntryCd -> TpjPrjTgMakt.builder()
                .tpjPrj(tpjPrj)
                .tgMaktCntryCd(tgMaktCntryCd)
                .build()
        ).toList();

    }


    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    @Schema(description = "프로젝트 프로세스 수정 Resquest DTO")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    public static class ProjectUpdateProcessRequest {
        @Schema(description = "작업 FLAG", example = "ADD", requiredMode = REQUIRED, allowableValues = {"ADD", "DELETE"})
        private ProcessOperation processOperation;
        @Schema(description = "프로세스 코드", example = "PLNG", requiredMode = REQUIRED, allowableValues = {"PLNG", "OLDS", "ORDR", "FSBT", "PRTP", "VRFC", "VALD", "FOUP"})
        private String processCode;

        public TpjPrjPrcs toTpjPrjPrcsEntity(TpjPrj tpjPrj, String prcsStsCd) {
            return TpjPrjPrcs.builder()
                    .tpjPrj(tpjPrj)
                    .prcsCd(this.processCode)
                    .prcsStsCd(prcsStsCd)
                    .build();
        }
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    @Schema(description = "프로젝트 멤버 수정 Resquest Dto")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    public static class ProjectUpdateMemberRequest {
        @Schema(description = "작업 FLAG", example = "ADD", requiredMode = REQUIRED)
        private ProjectMemberOperation projectMemberOperation;
        @Schema(description = "프로젝트 멤버 ID", example = "F59301A1304511EEBF4902D5D06DD9EE", requiredMode = REQUIRED)
        @NotBlank
        private String memberId;
        @Schema(description = "프로젝트 관리자 여부", example = "Y", requiredMode = REQUIRED, allowableValues = {"Y", "N"})
        private ProjectManagerYn projectManagerYn;
        @ArraySchema(arraySchema = @Schema(description = "프로젝트 멤버 프로세스 리스트", oneOf = {
                ProjectUpdateMemberProcessRequest.class
        }))
        private List<@Valid @NotNull ProjectUpdateMemberProcessRequest> memberProcess;

        public TpjPrjMbr toTpjPrjMbrEntity(TpjPrj tpjPrj, TusUsr tusUsr, String joinTpCd) {
            return TpjPrjMbr.builder()
                    .tpjPrj(tpjPrj)
                    .tusUsr(tusUsr)
                    .startDt(LocalDateTime.now())
                    .prjRolCd(this.projectManagerYn.getCode())
                    .joinTpCd(joinTpCd)
                    .build();
        }

        @Data
        @Builder
        @NoArgsConstructor
        @AllArgsConstructor
        @Schema(description = "프로젝트 멤버 프로세스 수정 Resquest Dto")
        @JsonInclude(JsonInclude.Include.NON_NULL)
        public static class ProjectUpdateMemberProcessRequest {
            @Schema(description = "프로세스 권한 유형 코드", example = "[\"PJM\",\"PJB\"]", requiredMode = REQUIRED, allowableValues = {"PJM", "PJB"})
            @NotBlank
            private String processRoleCode;
            @ArraySchema(arraySchema = @Schema(description = "프로세스 코드 리스트", example = "[\"PLNG\", \"OLDS\", \"ORDR\", \"FSBT\", \"PRTP\", \"VRFC\", \"VALD\", \"FOUP\"]", allowableValues = {"PLNG", "OLDS", "ORDR", "FSBT", "PRTP", "VRFC", "VALD", "FOUP"}))
            @NotNull
            @Size(min = 1)
            private List<@Valid @NotBlank String> processCodes;

            public List<TpjPrjPrcsMbr> toTpjPrjPrcsMbrEntitys(List<TpjPrjPrcs> tpjPrjPrcsList, TpjPrjMbr tpjPrjMbr) {
                return tpjPrjPrcsList.stream().map(tbjPrjPrcs -> TpjPrjPrcsMbr.builder()
                        .tpjPrjPrcs(tbjPrjPrcs)
                        .tpjPrjMbr(tpjPrjMbr)
                        .prcsRolCd(this.processRoleCode)
                        .build()
                ).toList();
            }
        }
    }
}
