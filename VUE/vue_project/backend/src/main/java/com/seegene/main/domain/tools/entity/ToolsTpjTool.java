package com.seegene.main.domain.tools.entity;

import java.util.ArrayList;
import java.util.List;

import com.seegene.main.domain.user.entity.BaseEntity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "TPJ_TOOL")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ToolsTpjTool extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "TOOL_NUM", nullable = false)
    private Long id;

    @Column(name = "TOOL_NM", nullable = false, length = 100)
    private String toolNm;

    @Column(name = "OPEN_LVL_CD", nullable = false, length = 20)
    private String openLvlCd;

    @Column(name = "SORT_NUM")
    private Long sortNum;

    @Column(name = "DSCRP")
    private String dscrp;

    @Column(name = "TOOL_LNK_URL", length = 480)
    private String toolLnkUrl;

    @Column(name = "ICON_FL_NUM")
    private Long iconFlNum;

    @OneToMany(mappedBy = "tpjTool", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<ToolsTpjToolPrtlyOpen> toolsTpjToolPrtlyOpens = new ArrayList<>();

}
