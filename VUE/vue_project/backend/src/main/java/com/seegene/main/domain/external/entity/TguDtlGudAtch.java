package com.seegene.main.domain.external.entity;


import com.seegene.main.domain.common.entity.TsyFl;
import com.seegene.main.domain.user.entity.BaseEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "TGU_DTL_GUD_ATCH")
public class TguDtlGudAtch extends BaseEntity {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "DTL_GUD_ATCH_NUM", nullable = false)
    private Long id;


    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "FL_NUM")
    private TsyFl tsyFl;


    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "DTL_GUD_NUM", nullable = false)
    private TguDtlGud tguDtlGud;

    public void setGuideEntity(TguDtlGud guideEntity){
        if(this.tguDtlGud != null){
            this.tguDtlGud.getTguDtlGudAtches().remove(this);
        }
        this.tguDtlGud = guideEntity;
        guideEntity.getTguDtlGudAtches();
    }

}
