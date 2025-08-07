package com.seegene.main.domain.tools.entity;

import com.seegene.main.domain.corporate.entity.TusCorp;
import com.seegene.main.domain.dashboard.entity.TpjTool;
import com.seegene.main.domain.user.entity.BaseEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Getter
@Setter
@Entity
@Builder
@Table(name = "TPJ_TOOL_PRTLY_OPEN")
@NoArgsConstructor
@AllArgsConstructor
public class ToolsTpjToolPrtlyOpen extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "TOOL_PRTLY_OPEN_NUM", nullable = false)
    private Long id;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "TOOL_NUM", nullable = false)
    private com.seegene.main.domain.dashboard.entity.TpjTool tpjTool;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "CORP_NUM", nullable = false)
    private TusCorp tusCorp;

    public static ToolsTpjToolPrtlyOpen toEntity(TpjTool tpjTool, TusCorp tusCorp) {

        return ToolsTpjToolPrtlyOpen.builder()
                .tpjTool(tpjTool)
                .tusCorp(tusCorp)
                .build();
    }

}