package com.seegene.main.domain.authority.entity;

import com.seegene.main.domain.user.entity.BaseEntity;
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
@Table(name = "TRL_ADM_ROL_REQ_TG")
public class TrlAdmRolReqTg extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ADM_ROL_REQ_TG_NUM", nullable = false)
    private Long id;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "ADM_ROL_REQ_NUM", nullable = false)
    private TrlAdmRolReq trlAdmRolReq;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "ADM_ROL_NUM", nullable = false)
    private TrlAdmRol trlAdmRol;

    @Size(max = 50)
    @Column(name = "USR_UID", nullable = false, length = 50)
    private String usrUid;

}
