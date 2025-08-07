package com.seegene.main.domain.join.entity;

import java.util.LinkedHashSet;
import java.util.Set;

import com.seegene.main.domain.user.entity.BaseEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
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
@Table(name = "TUS_TERMS_CAT")
public class TusTermsCat extends BaseEntity {
	@Id
	@Column(name = "TERMS_CAT_CD", nullable = false)
	private String id;

	@Size(max = 1)
	@NotNull
	@Column(name = "ESS_YN", nullable = false, length = 1)
	private String essYn;

	@OneToMany(mappedBy = "tusTermsCat")
	private Set<TusTerm> tusTerms = new LinkedHashSet<>();

}