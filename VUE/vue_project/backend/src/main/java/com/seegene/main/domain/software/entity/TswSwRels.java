package com.seegene.main.domain.software.entity;



import com.seegene.main.domain.common.entity.TsyFl;
import com.seegene.main.domain.user.entity.BaseEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "TSW_SW_RELS")
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TswSwRels extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "SW_RELS_NUM", nullable = false)
    private long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "SW_NUM")
    private TswSw tswSw;

    @Size(max = 16)
    @NotNull
    @Column(name = "VER", nullable = false, length = 16)
    private String ver;

    @NotNull
    @Column(name = "RELS_NTE", nullable = false)
    private String relsNte;

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "SW_FL_NUM")
    private TsyFl swfile;
}
