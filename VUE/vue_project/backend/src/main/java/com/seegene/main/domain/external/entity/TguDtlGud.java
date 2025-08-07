package com.seegene.main.domain.external.entity;


import com.seegene.main.domain.user.entity.BaseEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@NamedEntityGraph(
        name = "TguDtlGud",
        attributeNodes = {
                @NamedAttributeNode(value = "tguDtlGudAtches", subgraph = "dtlGudAtches-files"),
        },
        subgraphs = {@NamedSubgraph(
                name = "dtlGudAtches-files",
                attributeNodes = {
                        @NamedAttributeNode("tsyFl")
                }
        )}
)

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "TGU_DTL_GUD")
public class TguDtlGud extends BaseEntity {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        @Column(name = "DTL_GUD_NUM", nullable = false)
        private Long id;

        @Size(max = 260)
        @NotNull
        @Column(name = "TITL", nullable = false, length = 260)
        private String titl;

        @Size(max = 500)
        @NotNull
        @Column(name = "PARM_VAL", nullable = false, length = 500)
        private String parmVal;

        @OneToMany(mappedBy = "tguDtlGud", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
        private List<TguDtlGudAtch> tguDtlGudAtches = new ArrayList<>();

        public void insertGuideAttach(TguDtlGudAtch guideAttach) {
                if (guideAttach.getId() != null) {
                        tguDtlGudAtches.add(guideAttach);
                        guideAttach.setGuideEntity(this);
                }
        }

        public void updateGuide(String titl, String parmVal) {
                this.titl = titl;
                this.parmVal = parmVal;
        }

}
