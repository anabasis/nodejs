package com.seegene.main.domain.authority.entity;


import com.seegene.main.domain.user.entity.BaseEntity;
import com.seegene.main.domain.user.entity.TusUsr;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "TRL_ADM_ROL_APL")
public class TrlAdmRolApl extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ADM_ROL_APL_NUM", nullable = false)
    private Long id;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "USR_UID", nullable = false)
    private TusUsr tusUsr;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "ADM_ROL_NUM", nullable = false)
    private TrlAdmRol trlAdmRol;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ADM_ROL_REQ_NUM")
    private TrlAdmRolReq trlAdmRolReq;

}
