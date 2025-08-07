package com.seegene.main.domain.account.entity;


import com.seegene.main.domain.user.entity.BaseEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Table(name = "TUS_USR_NOTF_SETG")
@Builder
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class TusUsrNotfSetg extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "USR_NOTF_SETG_NUM", nullable = false)
    private Long id;

    @NotNull
    @Column(name = "USR_UID", nullable = false, length = 40)
    private String usrUid;

    @NotNull
    @Column(name = "NOTF_TP_CD", nullable = false, length = 20)
    private String notfTpCd;

    @NotNull
    @Column(name = "RECV_YN", nullable = false, length = 1)
    private String recvYn;

    public void updateRecvYn(String recvYn) {
        this.recvYn = recvYn;
    }
}
