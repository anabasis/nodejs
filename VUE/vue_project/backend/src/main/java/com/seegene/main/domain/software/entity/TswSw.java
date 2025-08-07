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

import java.util.List;


@NamedEntityGraph(
        name = "SoftwareEntity",
        attributeNodes = {
                @NamedAttributeNode(value = "tswSwRelsEntities", subgraph = "software-files"),
                @NamedAttributeNode(value = "iconFile")
        },
        subgraphs = {@NamedSubgraph(
                name = "software-files",
                attributeNodes = {
                        @NamedAttributeNode("swfile")
                }
        )}
)


@Entity
@Table(name = "TSW_SW")
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TswSw extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "SW_NUM", nullable = false)
    private long id;

    @Size(max = 100)
    @NotNull
    @Column(name = "SW_NM", nullable = false, length = 100)
    private String swNm;

    @Size(max = 20)
    @Column(name = "IVRU_DVS_CD", length = 20)
    private String ivruDvsCd;

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "ICON_FL_NUM")
    private TsyFl iconFile;

    @NotNull
    @Column(name = "DSCRP", nullable = false)
    private String dscrp;

    @OneToMany(mappedBy = "tswSw", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<TswSwRels> tswSwRelsEntities;
}
