package com.seegene.main.domain.authority.entity;


import com.seegene.main.domain.menumanagement.entity.TsyDevMnuPermsn;
import com.seegene.main.domain.user.entity.BaseEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "TRL_USR_ROL")
public class TrlUsrRol extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "USR_ROL_NUM", nullable = false)
    private Long id;

    @NotNull
    @Column(name = "USR_ROL_CD", length = 20)
    private String usrRolCd;

    @Size(max = 100)
    @NotNull
    @Column(name = "USR_ROL_NM", nullable = false, length = 100)
    private String usrRolNm;
    @Size(max = 20)
    @NotNull
    @Column(name = "CORP_LVL_CD", nullable = false, length = 20)
    private String corpLvlCd;
    @Size(max = 20)
    @NotNull
    @Column(name = "ROL_LVL_CD", nullable = false, length = 20)
    private String rolLvlCd;
    @OneToMany(mappedBy = "trlUsrRol", fetch = FetchType.LAZY)
    private List<TrlUsrRolApl> list = new ArrayList<>();
    @OneToMany(mappedBy = "trlUsrRol", fetch = FetchType.LAZY)
    private List<TsyDevMnuPermsn> tsyDevMnuPermsns = new ArrayList<>();

    /*
    @OneToMany(mappedBy = "usrRolNum")
    private Set<TrlUsrRolApl> trlUsrRolApls = new LinkedHashSet<>();

    @OneToMany(mappedBy = "usrRolNum")
    private Set<TusUsrInvt> tusUsrInvts = new LinkedHashSet<>();

    @OneToMany(mappedBy = "usrRolNum")
    private Set<TsyDevMnuPermsn> tsyDevMnuPermsns = new LinkedHashSet<>();

    @OneToMany(mappedBy = "usrRolNum")
    private Set<TbdLibrPrtlyOpen> tbdLibrPrtlyOpens = new LinkedHashSet<>();

    @OneToMany(mappedBy = "usrRolNum")
    private Set<TrlRolReq> trlRolReqs = new LinkedHashSet<>();
    */
}
