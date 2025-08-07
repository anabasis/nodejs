package com.seegene.main.domain.menumanagement.entity;

import com.seegene.main.domain.authority.entity.TrlUsrRol;
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
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Builder
@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "TSY_DEV_MNU_PERMSN")
public class TsyDevMnuPermsn extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "DEV_MNU_PERMSN_NUM", nullable = false)
    private Long id;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "MNU_NUM", nullable = false)
    private TsyMnu tsyMnu;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "USR_ROL_NUM", nullable = false)
    private TrlUsrRol trlUsrRol;

    @Size(max = 1)
    @NotNull
    @Column(name = "RED_YN", nullable = false, length = 1)
    private String redYn;

    @Size(max = 1)
    @NotNull
    @Column(name = "CRT_YN", nullable = false, length = 1)
    private String crtYn;

    @Size(max = 1)
    @NotNull
    @Column(name = "UPT_YN", nullable = false, length = 1)
    private String uptYn;

    @Size(max = 1)
    @NotNull
    @Column(name = "DEL_YN", nullable = false, length = 1)
    private String delYn;
}