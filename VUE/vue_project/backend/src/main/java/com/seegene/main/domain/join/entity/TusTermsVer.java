package com.seegene.main.domain.join.entity;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.hibernate.annotations.DynamicUpdate;

import com.seegene.main.domain.user.entity.BaseEntity;

import jakarta.persistence.CascadeType;
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
@DynamicUpdate
@Table(name = "TUS_TERMS_VER")
public class TusTermsVer extends BaseEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "TERMS_VER_NUM", nullable = false )
	private Long id;

	@NotNull
	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "TERMS_NUM", nullable = false)
	private TusTerm tusTerm;

	@Size(max = 16)
	@NotNull
	@Column(name = "VER", nullable = false, length = 16)
	private String ver;

	@Column(name = "APL_DT")
	private LocalDateTime aplDt;

	@OneToMany(mappedBy = "tusTermsVer")
	private List<TusTermsCondit> tusTermsCondits = new ArrayList<>();

	@OneToMany(mappedBy = "tusTermsVer",cascade = CascadeType.ALL)
	private List<TusTermsAgr> tusTermsAgrs = new ArrayList<>();

}