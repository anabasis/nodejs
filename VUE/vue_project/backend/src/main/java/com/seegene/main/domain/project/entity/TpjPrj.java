package com.seegene.main.domain.project.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.seegene.main.domain.corporate.entity.TusCorp;
import com.seegene.main.domain.project.dto.ProjectUpdateRequest;
import com.seegene.main.domain.user.entity.BaseEntity;
import com.seegene.main.domain.user.entity.TusUsr;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

/**
 * TPJ_PRJ Entity
 * <PRE>
 * </PRE>
 *
 * @author : khhong@mz.co.kr
 * @History <PRE>
 * No  Date           Author            Desc
 * ---- ------------ ---------------- ------------------------------------
 * 1 2023-07-11        khhong        최초작성
 * </PRE>
 */
@Entity
@Table(name = "TPJ_PRJ")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TpjPrj extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "PRJ_NUM", nullable = false)
    private Long id;

    @Size(max = 100)
    @NotNull
    @Column(name = "PRJ_NM", nullable = false, length = 100)
    private String prjNm;

    @Size(max = 20)
    @NotNull
    @Column(name = "DISS_CAT_CD", nullable = false, length = 20)
    private String dissCatCd;

    @Column(name = "START_DAT", nullable = false)
    private LocalDateTime startDat;

    @Column(name = "END_DAT", nullable = false)
    private LocalDateTime endDat;

    @Size(max = 20)
    @Column(name = "DEV_PUPS_CD", nullable = false, length = 20)
    private String devPupsCd;

    @Size(max = 20)
    @Column(name = "PRJ_STS_CD", nullable = false, length = 20)
    private String prjStsCd;

    @Size(max = 1)
    @Column(name = "DEL_YN", nullable = false, length = 1)
    private String delYn;

    @Size(max = 26)
    @Column(name = "TASK_CD", length = 26)
    private String taskCd;

    @Size(max = 100)
    @Column(name = "PRD_NM", length = 100)
    private String prdNm;

    @Size(max = 500)
    @Column(name = "PRJ_DSCRP", length = 500)
    private String prjDscrp;

    @Column(name = "ITRT_CNT", nullable = false)
    private Long itrtCnt;

    @OneToMany(mappedBy = "tpjPrj", fetch = FetchType.LAZY)
    @JsonManagedReference
    private List<TpjPrjPrcs> tpjPrjPrcsList = new ArrayList<>();

    @OneToMany(mappedBy = "tpjPrj", fetch = FetchType.LAZY)
    @JsonManagedReference
    private List<TpjPrjMbr> tpjPrjMbrList = new ArrayList<>();

    @OneToMany(mappedBy = "tpjPrj", fetch = FetchType.LAZY)
    @JsonManagedReference
    private List<TpjPrjMbshReq> tpjPrjMbshReqList = new ArrayList<>();

    @OneToMany(mappedBy = "tpjPrj", fetch = FetchType.LAZY)
    @JsonManagedReference
    private List<TpjPrjRgltrAfr> tpjPrjRgltrAfrList = new ArrayList<>();

    @OneToMany(mappedBy = "tpjPrj", fetch = FetchType.LAZY)
    @JsonManagedReference
    private List<TpjPrjTgMakt> tpjPrjTgMaktList = new ArrayList<>();

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "CORP_NUM", nullable = false)
    private TusCorp tusCorp;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "CRT_USR_UID", nullable = false)
    private TusUsr tusUsr;

    public void of(ProjectUpdateRequest request) {
        this.setPrjNm(request.getPrjNm());
        this.setStartDat(request.getStartDat());
        this.setEndDat(request.getEndDat());
        this.setDevPupsCd(request.getDevPupsCd());
        this.setTaskCd(request.getTaskCd());
        this.setPrdNm(request.getPrdNm());
        this.setPrjDscrp(request.getPrjDscrp());
        this.setItrtCnt(1L);
    }

}