package com.seegene.main.domain.notification.entity;

import java.util.ArrayList;
import java.util.List;

import com.seegene.main.domain.user.entity.BaseEntity;
import com.seegene.main.domain.user.entity.TusUsr;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
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
@Table(name = "TBD_NOTF")
public class TbdNotf extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "NOTF_NUM", nullable = false)
    private Long id;

    @Size(max = 26)
    @NotNull
    @Column(name = "NOTF_CD", nullable = false, length = 26)
    private String notfCd;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USR_UID")
    private TusUsr usrUid;

    @Column(name = "NOTF_TP_CD", nullable = false)
    private String notfTpCd;

    @Size(max = 480)
    @NotNull
    @Column(name = "LNDG_URL", nullable = false, length = 480)
    private String lndgUrl;

    @OneToMany(mappedBy = "notfNum")
    private List<TbdNotfMlg> tbdNotfMlgs = new ArrayList<>();

    public void toTbdNotfMlgEntity(TbdNotfMlg tbdNotfMlg){
        if(tbdNotfMlgs == null){
            tbdNotfMlgs = new ArrayList<>();
        }

        tbdNotfMlgs.add(tbdNotfMlg);
        tbdNotfMlg.setTbdNotf(this);
    }

}

