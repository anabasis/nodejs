package com.seegene.main.domain.project.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.seegene.main.domain.user.entity.BaseEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.sql.Timestamp;

@Entity
@Table(name = "TPJ_PRJ_TG_MAKT")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TpjPrjTgMakt extends BaseEntity {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "PRJ_TG_MAKT_NUM")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JsonBackReference
    @JoinColumn(name = "PRJ_NUM", nullable = false)
    TpjPrj tpjPrj;

    @Size(max = 20)
    @Column(name = "TG_MAKT_CNTRY_CD")
    private String tgMaktCntryCd;

}
