package com.seegene.main.domain.dashboard.entity;

import com.seegene.main.domain.user.entity.BaseEntity;
import com.seegene.main.domain.user.entity.TusUsr;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "TUS_FAV")
public class TusFav extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "FAV_NUM", nullable = false)
    private Long id;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "USR_UID", nullable = false)
    private TusUsr tusUsr;

    @Size(max = 40)
    @NotNull
    @Column(name = "FAV_TP_CD", nullable = false, length = 40)
    private String favTpCd;

    @Column(name = "TOOL_NUM")
    private Long toolNum;

    @Column(name = "SITE_NM", length = 100)
    private String siteNm;

    @Column(name = "SITE_URL", length = 480)
    private String siteUrl;
}
