package com.seegene.main.domain.notification.entity;

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
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "TBD_NOTF_MLG")
public class TbdNotfMlg extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "NOTF_MLG_NUM", nullable = false)
    private Long id;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "NOTF_NUM", nullable = false)
    private TbdNotf notfNum;

    @Size(max = 20)
    @NotNull
    @Column(name = "LANG_CD", nullable = false, length = 20)
    private String langCd;

    @Size(max = 260)
    @NotNull
    @Column(name = "TITL", nullable = false, length = 260)
    private String titl;

    @Size(max = 2000)
    @NotNull
    @Column(name = "TXT", nullable = false, length = 2000)
    private String txt;

    public void setTbdNotf(TbdNotf tbdNotf) {
        if(this.notfNum != null) {
            this.notfNum.getTbdNotfMlgs().remove(this);
        }
        this.notfNum = tbdNotf;
        tbdNotf.getTbdNotfMlgs();
    }
}