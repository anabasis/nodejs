package com.seegene.main.domain.notice.entity;

import com.seegene.main.domain.corporate.entity.TusCorp;
import com.seegene.main.domain.user.entity.BaseEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "TBD_NTC_PRTLY_OPEN")
@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TbdNtcPrtlyOpen extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "NTC_PRTLY_OPEN_NUM", nullable = false)
    private Long id;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "NTC_NUM", nullable = false)
    private TbdNtc tbdNtc;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "CORP_NUM", nullable = false)
    private TusCorp tusCorp;


    // @Id
    // @GeneratedValue(strategy = GenerationType.IDENTITY)
    // @Column(name = "NTC_PRTLY_OPEN_NUM", nullable = false)
    // private Long ntcPrtlyOpenNum;
    //
    // @NotNull
    // @ManyToOne(fetch = FetchType.LAZY, optional = false)
    // @JoinColumn(name = "NTC_NUM", nullable = false)
    // private TbdNtc ntcNum;
    //
    // @Column(name = "CORP_NUM")
    // private Long corpNum;

}
