package com.seegene.main.domain.user.entity;

import java.io.Serializable;
import java.time.LocalDateTime;

import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Column;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.MappedSuperclass;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
public abstract class BaseEntity implements Serializable {

    @CreatedDate
    @Column(name = "CRT_DT", updatable = false, columnDefinition = "datetime COMMENT '작성일자'")
    @JsonProperty("crtDt")
    private LocalDateTime crtDt;

    @CreatedBy
    @Column(name = "CRTR_UID", updatable = false, columnDefinition = "VARCHAR(40) COMMENT '작성자'")
    @JsonProperty("crtrUid")
    private String crtrUid;

    @LastModifiedDate
    @Column(name = "MDF_DT", columnDefinition = "datetime COMMENT '수정일자'")
    @JsonProperty("mdfDt")
    private LocalDateTime mdfDt;

    @LastModifiedBy
    @Column(name = "MDFR_UID", columnDefinition = "VARCHAR(40) COMMENT '수정자'")
    @JsonProperty("mdfrUid")
    private String mdfrUid;
}
