package com.seegene.main.domain.databox.entity;

import com.seegene.main.domain.user.entity.BaseEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Table(name = "TBD_LIBR_ATCH")
@Builder
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class TbdLibrAtch extends BaseEntity {
	@Id
	@Column(name = "FL_NUM", nullable = false)
	private Long id;

	@ManyToOne(optional = false)
	@JoinColumn(name = "LIBR_NUM", nullable = false)
	private TbdLibr tbdLibr;

}