package com.seegene.main.domain.project.entity;

import com.seegene.main.domain.user.entity.BaseEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

/**
 * TPJ_PRJ_MBR_HST Entity
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
@Table(name = "TPJ_PRJ_MBR_HST")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TpjPrjMbrHst extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "PRJ_MBR_HST_NUM", nullable = false)
    private Long id;

    @Column(name = "PRJ_MBR_NUM", nullable = false)
    private Long prjMbrNum;

    @Column(name = "PRJ_NUM", nullable = false)
    private Long prjNum;

    @Size(max = 40)
    @Column(name = "USR_UID", nullable = false, length = 40)
    private String usrUid;

    @Column(name = "START_DT", nullable = false)
    private LocalDateTime startDt;

    @Size(max = 20)
    @Column(name = "PRJ_ROL_CD", nullable = false, length = 20)
    private String prjRolCd;

    @Size(max = 20)
    @Column(name = "JOIN_TP_CD", nullable = false, length = 20)
    private String joinTpCd;

    @Column(name = "PRJ_MBSH_REQ_NUM")
    private Long prjMbshReqNum;

    @Size(max = 20)
    @Column(name = "HST_DVS_CD", nullable = false, length = 20)
    private String hstDvsCd;

    @Column(name = "HST_DT", nullable = false)
    private LocalDateTime hstDt;

    @OneToMany(mappedBy = "tpjPrjMbrHst", fetch = FetchType.LAZY)
    private List<TpjPrjPrcsMbrHst> tpjPrjPrcsMbrHstList = new ArrayList<>();


    public static TpjPrjMbrHst of(TpjPrjMbr tpjPrjMbr, String hstDvsCd) {
        return TpjPrjMbrHst.builder()
                .prjNum(tpjPrjMbr.getTpjPrj().getId())
                .prjMbrNum(tpjPrjMbr.getId())
                .usrUid(tpjPrjMbr.getTusUsr().getId())
                .startDt(tpjPrjMbr.getStartDt())
                .prjRolCd(tpjPrjMbr.getPrjRolCd())
                .joinTpCd(tpjPrjMbr.getJoinTpCd())
                .hstDvsCd(hstDvsCd)
                .hstDt(LocalDateTime.now())
                .build();
    }

}