package com.seegene.main.domain.authority.entity;

import com.seegene.main.domain.menumanagement.entity.TsyAdmMnuPermsn;
import com.seegene.main.domain.user.entity.BaseEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity(name = "TrlAd,Rol")
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "TRL_ADM_ROL")
public class TrlAdmRol extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ADM_ROL_NUM", nullable = false)
    private Long id;

    @Size(max = 20)
    @NotNull
    @Column(name = "ADM_ROL_CD", nullable = false, length = 20)
    private String admRolCd;
    @Size(max = 100)
    @NotNull
    @Column(name = "ADM_ROL_NM", nullable = false, length = 100)
    private String admRolNm;

    @OneToMany(mappedBy = "trlAdmRol", fetch = FetchType.LAZY)
    private List<TrlAdmRolApl> list = new ArrayList<>();

    @OneToMany(mappedBy = "trlAdmRol", fetch = FetchType.LAZY)
    private List<TsyAdmMnuPermsn> tsyAdmMnuPermsns = new ArrayList<>();

    //@OneToMany(mappedBy = "admRolNum")
    //private Set<TusUsrInvtAdmRol> tusUsrInvtAdmRols = new LinkedHashSet<>();

    //@OneToMany(mappedBy = "admRolNum")
    //private Set<TrlAdmRolReq> trlAdmRolReqs = new LinkedHashSet<>();
}
