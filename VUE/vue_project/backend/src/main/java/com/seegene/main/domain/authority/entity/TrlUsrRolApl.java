package com.seegene.main.domain.authority.entity;

import com.seegene.main.domain.user.entity.BaseEntity;
import com.seegene.main.domain.user.entity.TusUsr;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "TRL_USR_ROL_APL")
public class TrlUsrRolApl extends BaseEntity {
    @Id
    @Size(max = 40)
    @Column(name = "USR_UID", nullable = false, length = 40)
    private String id;
    @MapsId
    @OneToOne(mappedBy = "trlUsrRolApl", fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "USR_UID", nullable = false)
    private TusUsr tusUsr;
    @NotNull
    @ManyToOne(optional = false)
    @JoinColumn(name = "USR_ROL_NUM", nullable = false)
    private TrlUsrRol trlUsrRol;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USR_ROL_REQ_NUM")
    private TrlUsrRolReq trlUsrRolReq;
}
