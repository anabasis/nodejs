package com.seegene.main.domain.project.entity;

import com.seegene.main.domain.user.entity.BaseEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.time.LocalDateTime;

/**
 * TPJ_PRJ_PRCS_STS Entity
 * <PRE>
 * </PRE>
 *
 * @author : jskim4@seegene.com
 * @History <PRE>
 * No  Date           Author            Desc
 * ---- ------------ ---------------- ------------------------------------
 * 1 2023-07-27        jskim4        최초작성
 * </PRE>
 */
@Entity
@Table(name = "TPJ_PRJ_PRCS_STS")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TpjPrjPrcsSts extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "PRJ_PRCS_STS_NUM", nullable = false)
    private Long id;

    @Column(name = "STS_DT", nullable = false)
    private LocalDateTime stsDt;

    @Size(max = 20)
    @Column(name = "PRCS_STS_CD", nullable = false, length = 20)
    private String prcsStsCd;

    @Column(name = "ITRT_CNT" , nullable = false)
    private Long itrtCnt;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "PRJ_PRCS_NUM", nullable = false)
    private TpjPrjPrcs tpjPrjPrcs;

    public static TpjPrjPrcsSts of(TpjPrjPrcs tpjPrjPrcs, Long currentProcessIterationNum) {
        return TpjPrjPrcsSts.builder()
                .tpjPrjPrcs(tpjPrjPrcs)
                .stsDt(LocalDateTime.now())
                .prcsStsCd(tpjPrjPrcs.getPrcsStsCd())
                .itrtCnt(currentProcessIterationNum)
                .build();
    }
}