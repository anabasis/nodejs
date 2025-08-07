package com.seegene.main.domain.project.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.seegene.main.domain.corporate.entity.TusCorp;
import com.seegene.main.domain.project.constant.ProjectManagerYn;
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
import java.util.HashSet;
import java.util.List;
import java.util.Objects;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.Collectors;

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
@Schema(description = "프로젝트 등록 Resquest Dto")
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ProjectCreateRequest {

    private static final String PROJECT_MANAGER = "PJM";

    @Schema(description = "질병 카테고리 코드", example = "DR", requiredMode = REQUIRED)
    private String dissCatCd;

    @JsonProperty("startDat")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    @Schema(description = "시작 일자", example = "2023-07-03 00:00:00", requiredMode = Schema.RequiredMode.NOT_REQUIRED, type = "string")
    private LocalDateTime startDat;

    @JsonProperty("endDat")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    @Schema(description = "종료 일자", example = "2023-12-31 00:00:00", requiredMode = Schema.RequiredMode.NOT_REQUIRED, type = "string")
    private LocalDateTime endDat;

    @Schema(description = "프로젝트 명", example = "Project Name ABC", requiredMode = REQUIRED)
    @NotBlank
    private String prjNm;

    @Schema(description = "프로젝트 설명", example = "The result represents the positive result for E gene of Sarbecovirus in FAM channel, RdRP  gene and N gene of COVID-19 in Cal Red 610 and Quasar 670, respectively. ")
    private String prjDscrp;

    @Schema(description = "목적 코드", example = "DP01", requiredMode = REQUIRED)
    @NotBlank
    private String devPupsCd;

    @Schema(description = "제품 명", example = "anyflex assay pack")
    private String prdNm;

    @Schema(description = "과제 코드", example = "100-10000")
    private String taskCd;

    @ArraySchema(arraySchema = @Schema(description = "대상 국가 코드", example = "[\"CE\",\"FDA\",\"MFDS\",\"TGA\",\"HCANA\",\"COFPR\",\"FDA510K\",\"ETC\"]", allowableValues = {"CE","FDA","MFDS","TGA","HCANA","COFPR","FDA510K","ETC"}))
    private List<String> regulatoryAffairCodeList;

    @ArraySchema(arraySchema = @Schema(description = "대상 국가 코드", example = "[\"KR\",\"AD\",\"AE\",\"DM\",\"DK\"]", allowableValues = {"KR","AD","AE","DM","DK"}))
    private List<String> targetCountryCodeList;

    @ArraySchema(arraySchema = @Schema(description = "프로세스 코드 리스트", example = "[\"PLNG\", \"OLDS\", \"ORDR\", \"FSBT\", \"PRTP\", \"VRFC\", \"VALD\", \"FOUP\"]", allowableValues = {"PLNG", "OLDS", "ORDR", "FSBT", "PRTP", "VRFC", "VALD", "FOUP"}))
    @NotNull
    @Size(min = 1)
    private List<@Valid @NotBlank String> processCodes;

    @ArraySchema(arraySchema = @Schema(description = "프로젝트 멤버 리스트", oneOf = {
            ProjectCreateMemberRequest.class
    }))
    @NotNull
    @Size(min = 1)
    private List<@Valid @NotNull ProjectCreateMemberRequest> members;

    public TpjPrj toEntity(String delYn, TusUsr tusUsr, TusCorp tusCorp ,String prjStsCd) {
        return TpjPrj.builder()
                .prjNm(this.prjNm)
                .tusCorp(tusCorp)
                .tusUsr(tusUsr)
                .dissCatCd(this.dissCatCd)
                .startDat(this.startDat)
                .endDat(this.endDat)
                .devPupsCd(this.devPupsCd)
                .prdNm(this.prdNm)
                .prjStsCd(prjStsCd)
                .taskCd(this.taskCd)
                .prjDscrp(this.prjDscrp)
                .itrtCnt(0L)
                .delYn(delYn)
                .build();
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

    public List<TpjPrjPrcs> toTpjPrjPrcsEntitys(TpjPrj tpjPrj, String notInProgressCd, String inProgressCd) {
        AtomicInteger index = new AtomicInteger();
        return this.processCodes.stream().map(s -> {
                            int idx = index.getAndIncrement();
                            return TpjPrjPrcs.builder()
                                    .tpjPrj(tpjPrj)
                                    .prcsCd(s)
                                    .prcsStsCd(idx > 0 ? notInProgressCd : inProgressCd)
                                    .build();
                        }
                )

                .toList();
    }

    public List<TpjPrjPrcsSts> toTpjPrjPrcsStsEntitys(List<TpjPrjPrcs> tpjPrjPrcsList, String inProgressCd) {
        return tpjPrjPrcsList.stream().filter(tpjPrjPrcs -> tpjPrjPrcs.getPrcsCd().equals("PLNG")).map(tpjPrjPrcs -> {
                    return TpjPrjPrcsSts.builder()
                            .tpjPrjPrcs(tpjPrjPrcs)
                            .prcsStsCd(tpjPrjPrcs.getPrcsStsCd())
                            .stsDt(LocalDateTime.now())
                            .prcsStsCd(inProgressCd)
                            .itrtCnt(0L)
                            .build();
                })
                .toList();
    }

    public void isValidate(TusUsr createUser) {

        //생성자 무조건 포함되어야 한다.
        ProjectCreateMemberRequest adminReq = this.members.stream()
                .filter(projectMemberRequest -> Objects.equals(projectMemberRequest.getMemberId(), createUser.getId()))
                .findAny()
                .orElseThrow(() -> new InvalidValueException("Create user must be included.!!"));

        //생성자는 무조건 프로젝트 관리자여야 한다.
        if (!Objects.equals(adminReq.getProjectManagerYn(), ProjectManagerYn.Y)) {
            throw new InvalidValueException("Create user must be Project manager!!");
        }

        this.members.forEach(member -> {
            //프로젝트 매니저일 경우 프로젝트 멤버의 프로세스 역할 미입력
//            if (Objects.equals(member.getProjectManagerYn(), ProjectManagerYn.Y) && !CollectionUtils.isEmpty(member.getMemberProcess())) {
//                throw new InvalidValueException("If member is a project manager, process should be empty.");
//            }

            //프로젝트 매니저 아닐 경우 프로젝트 멤버의 프로세스 역할 입력
            if (Objects.equals(member.getProjectManagerYn(), ProjectManagerYn.N) && CollectionUtils.isEmpty(member.getMemberProcess())) {
                throw new InvalidValueException("If member is not a project manager, process must not be empty.");
            }

            //사용자의 프로세스는 프로젝트에 포함된 프로세스를 선택해야 한다.
            if (!CollectionUtils.isEmpty(member.getMemberProcess())) {
                member.getMemberProcess().forEach(memberProcess -> {
                    if (!new HashSet<>(this.processCodes).containsAll(memberProcess.getProcessCodes())) {
                        throw new InvalidValueException("The member's process must be selected as the project's process.");
                    }
                });
            }
        });


    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    @Schema(description = "프로젝트 멤버 등록 Resquest Dto")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    public static class ProjectCreateMemberRequest {

        @Schema(description = "프로젝트 멤버 ID", example = "F59301A1304511EEBF4902D5D06DD9EE", requiredMode = REQUIRED)
        @NotBlank
        private String memberId;

        @Schema(description = "프로젝트 관리자 여부", example = "Y", requiredMode = REQUIRED)
        @NotNull
        private ProjectManagerYn projectManagerYn;

        @ArraySchema(arraySchema = @Schema(description = "프로젝트 멤버 프로세스 리스트", oneOf = {
                ProjectCreateMemberProcessRequest.class
        }))
        private List<@Valid @NotNull ProjectCreateMemberProcessRequest> memberProcess;

        public TpjPrjMbr toTpjPrjMbrEntity(TpjPrj tpjPrj, TusUsr tusUsr, String joinTpCd) {
            return TpjPrjMbr.builder()
                    .tpjPrj(tpjPrj)
                    .startDt(LocalDateTime.now())
                    .tusUsr(tusUsr)
                    .prjRolCd(this.projectManagerYn.getCode())
                    .joinTpCd(joinTpCd)
                    .tpjPrjMbshReq(null)
                    .build();
        }

        @Data
        @Builder
        @NoArgsConstructor
        @AllArgsConstructor
        @Schema(description = "프로젝트 멤버 프로세스 등록 Resquest Dto")
        @JsonInclude(JsonInclude.Include.NON_NULL)
        public static class ProjectCreateMemberProcessRequest {

            @Schema(description = "프로세스 권한 유형 코드", example = "MGMT", allowableValues = {"MGMT", "EDIT", "VIEW"} ,requiredMode = REQUIRED)
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
