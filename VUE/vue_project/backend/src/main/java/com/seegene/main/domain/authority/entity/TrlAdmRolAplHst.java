package com.seegene.main.domain.authority.entity;

import com.seegene.main.domain.user.entity.BaseEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "TRL_ADM_ROL_APL_HST")
public class TrlAdmRolAplHst extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ADM_ROL_APL_HST_NUM", nullable = false)
    private Long id;
    @Size(max = 40)
    @NotNull
    @Column(name = "USR_UID", nullable = false, length = 40)
    private String usrUid;
    @NotNull
    @Column(name = "ADM_ROL_NUM", nullable = false)
    private Long admRolNum;
    @NotNull
    @Column(name = "HST_DT", nullable = false)
    private LocalDateTime hstDt;
    @Size(max = 20)
    @NotNull
    @Column(name = "HST_DVS_CD", nullable = false, length = 20)
    private String hstDvsCd;
    @Column(name = "ADM_ROL_REQ_NUM")
    private Long admRolReqNum;
}