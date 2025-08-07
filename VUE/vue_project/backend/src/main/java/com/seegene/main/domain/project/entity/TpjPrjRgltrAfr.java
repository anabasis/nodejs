package com.seegene.main.domain.project.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.seegene.main.domain.user.entity.BaseEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.sql.Timestamp;

@Entity
@Table(name = "TPJ_PRJ_RGLTR_AFR")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TpjPrjRgltrAfr extends BaseEntity {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "PRJ_RGLTR_AFR_NUM")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JsonBackReference
    @JoinColumn(name = "PRJ_NUM",  nullable = false)
    TpjPrj tpjPrj;

    @Size(max = 20)
    @Column(name = "RGLTR_AFR_CD")
    private String rgltrAfrCd;

}
