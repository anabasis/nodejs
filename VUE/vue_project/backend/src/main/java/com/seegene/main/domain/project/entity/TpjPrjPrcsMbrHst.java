package com.seegene.main.domain.project.entity;

import com.seegene.main.domain.user.entity.BaseEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.time.LocalDateTime;

/**
 * TPJ_PRJ_PRCS_MBR_HST Entity
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
@Table(name = "TPJ_PRJ_PRCS_MBR_HST")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TpjPrjPrcsMbrHst extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "PRJ_PRCS_MBR_HST_NUM", nullable = false)
    private Long id;

    @Column(name = "PRJ_PRCS_MBR_NUM", nullable = false)
    private Long prjPrcsMbrNum;

    @Column(name = "PRJ_MBR_NUM", nullable = false)
    private Long prjMbrNum;

    @Column(name = "PRJ_PRCS_NUM", nullable = false)
    private Long prjPrcsNum;

    @Size(max = 20)
    @Column(name = "PRCS_ROL_CD", nullable = false, length = 20)
    private String prcsRolCd;

    @Size(max = 20)
    @Column(name = "HST_DVS_CD", nullable = false, length = 20)
    private String hstDvsCd;

    @Column(name = "HST_DT", nullable = false)
    private LocalDateTime hstDt;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "PRJ_MBR_HST_NUM", nullable = false)
    private TpjPrjMbrHst tpjPrjMbrHst;
    public static TpjPrjPrcsMbrHst of(TpjPrjPrcsMbr tpjPrjPrcsMbr,TpjPrjMbrHst tpjPrjMbrHst, String hstDvsCd) {
        return TpjPrjPrcsMbrHst.builder()
                .prjPrcsMbrNum(tpjPrjPrcsMbr.getId())
                .prjMbrNum(tpjPrjPrcsMbr.getTpjPrjMbr().getId())
                .prjPrcsNum(tpjPrjPrcsMbr.getTpjPrjPrcs().getId())
                .prcsRolCd(tpjPrjPrcsMbr.getPrcsRolCd())
                .tpjPrjMbrHst(tpjPrjMbrHst)
                .hstDvsCd(hstDvsCd)
                .hstDt(LocalDateTime.now())
                .build();
    }
}