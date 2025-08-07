package com.seegene.main.domain.authority.entity;

import com.seegene.main.domain.user.entity.BaseEntity;
import com.seegene.main.domain.user.entity.TusUsr;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "TRL_USR_ROL_REQ")
public class TrlUsrRolReq extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "USR_ROL_REQ_NUM", nullable = false)
    private Long id;
    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "REQ_USR_UID", nullable = false)
    private TusUsr tusUsr;
    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "USR_ROL_NUM", nullable = false)
    private TrlUsrRol usrRolNum;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "APRV_USR_UID")
    private TusUsr tusUsr2;
    @Size(max = 20)
    @Column(name = "APRV_RSL_CD", length = 20)
    private String aprvRslCd;
    @Column(name = "APRV_DT")
    private LocalDateTime aprvDt;
    @Size(max = 1000)
    @Column(name = "MNGR_CMNT", length = 1000)
    private String mngrCmnt;
    @OneToMany(mappedBy = "trlUsrRolReq")
    private List<TrlUsrRolApl> trlUsrRolAplList = new ArrayList<>();
}
