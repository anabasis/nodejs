package com.seegene.main.domain.dashboard.entity;

import com.seegene.main.domain.user.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "TPJ_TOOL")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TpjTool extends BaseEntity {

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

    @OneToMany(mappedBy = "tpjTool", fetch = FetchType.LAZY)
    private List<TpjToolPrtlyOpen> tpjToolPrtlyOpens = new ArrayList<>();

}
