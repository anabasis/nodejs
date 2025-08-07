package com.seegene.main.domain.notice.entity;

import com.seegene.main.domain.user.entity.BaseEntity;
import com.seegene.main.domain.user.entity.TusUsr;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

@Entity
@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "TBD_NTC")
public class TbdNtc extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "NTC_NUM", nullable = false)
    private Long id;

    @Size(max = 20)
    @NotNull
    @Column(name = "NTC_TP_CD", nullable = false, length = 20)
    private String ntcTpCd;

    @Size(max = 20)
    @NotNull
    @Column(name = "NTC_CAT_CD", nullable = false, length = 20)
    private String ntcCatCd;
    @Size(max = 20)
    @NotNull
    @Column(name = "EXPSR_TP_CD", nullable = false, length = 20)
    private String expsrTpCd;

    @Size(max = 20)
    @NotNull
    @Column(name = "EXPSR_FRQ_CD", nullable = false, length = 20)
    private String expsrFrqCd;

    @Size(max = 20)
    @NotNull
    @Column(name = "OPEN_LVL_CD", nullable = false, length = 20)
    private String openLvlCd;

    @Size(max = 20)
    @Column(name = "EXPSR_PERD_TP_CD", length = 20)
    private String expsrPerdTpCd;

    @Column(name = "EXPSR_START_DT")
    private LocalDateTime expsrStartDt;

    @Column(name = "EXPSR_END_DT")
    private LocalDateTime expsrEndDt;

    @OneToMany(mappedBy = "tbdNtc", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<TbdNtcAtch> tbdNtcAtches = new ArrayList<>();

    @OneToMany(mappedBy = "tbdNtc", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<TbdNtcMlg> tbdNtcMlgs = new ArrayList<>();

    @OneToMany(mappedBy = "tbdNtc", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<TbdNtcPrtlyOpen> tbdNtcPrtlyOpens = new ArrayList<>();

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "USR_UID", nullable = false)
    private TusUsr tusUsr;

}
