package com.seegene.main.domain.board.entity;


import com.seegene.main.domain.user.entity.BaseEntity;
import com.seegene.main.domain.user.entity.TusUsr;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.util.*;

@NamedEntityGraph(
		name = "TbdQna",
		attributeNodes = {
				@NamedAttributeNode(value = "tbdQnaAtches", subgraph = "qna-ataches"),
				@NamedAttributeNode(value = "tusUsr")
		},
		subgraphs = {@NamedSubgraph(
				name = "qna-ataches",
				attributeNodes = {
						@NamedAttributeNode("qnaAttach")
				}
		)}
)


@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "TBD_QNA")
public class TbdQna extends BaseEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "QNA_NUM", nullable = false)
	private Long id;

	@Size(max = 20)
	@NotNull
	@Column(name = "QNA_TP_CD", nullable = false, length = 20)
	private String qnaTpCd;

	@Size(max = 20)
	@NotNull
	@Column(name = "QNA_CAT_CD", nullable = false, length = 20)
	private String qnaCatCd;

	@Size(max = 20)
	@NotNull
	@Column(name = "MDL_TP_CD", nullable = false, length = 20)
	private String mdlTpCd;

	@Size(max = 20)
	@NotNull
	@Column(name = "OPEN_LVL_CD", nullable = false, length = 20)
	private String openLvlCd;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "INQR_USR_UID")
	private TusUsr tusUsr;

	@Size(max = 260)
	@NotNull
	@Column(name = "INQR_TITL", nullable = false, length = 260)
	private String inqrTitl;

	@NotNull
	@Column(name = "INQR_CONT", nullable = false, columnDefinition = "LONGTEXT")
	private String inqrCont;

	@Size(max = 40)
	@Column(name = "MNGR_USR_UID", length = 40)
	private String mngrUsrUid;

	@Size(max = 20)
	@NotNull
	@Column(name = "QNA_STS_CD", nullable = false, length = 20)
	private String qnaStsCd;

	@OneToMany(mappedBy = "tbdQna" ,cascade = CascadeType.ALL)
	private List<TbdQnaCmnt> tbdQnaCmnts = new ArrayList<>();

	@OneToMany(mappedBy = "tbdQna",cascade = CascadeType.ALL)
	private List<TbdQnaAnsw> tbdQnaAnsws = new ArrayList<>();

	@OneToMany(mappedBy = "tbdQna", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
	private Set<TbdQnaAtch> tbdQnaAtches = new LinkedHashSet<>();

	@OneToMany(mappedBy = "tbdQna",cascade = CascadeType.ALL)
	private List<TbdQnaPrtlyOpen> tbdQnaPrtlyOpens = new ArrayList<>();

	public void insertQnaAttach(TbdQnaAtch qnaAttach) {
		if(qnaAttach.getId() != null) {
			tbdQnaAtches.add(qnaAttach);
			qnaAttach.setQnaEntity(this);
		}
	}
	public void insertPrtlyUser(TbdQnaPrtlyOpen prtlyUser){
		if(tbdQnaPrtlyOpens == null) {
			tbdQnaPrtlyOpens = new ArrayList<>();
		}
		if(prtlyUser.getTusUsr().getId() != null) {
			tbdQnaPrtlyOpens.add(prtlyUser);
			prtlyUser.setQnaEntity(this);
		}
	}
	public void updateQna(String type, String category, String module, String openLvlCd, String title, String contents){
		this.qnaTpCd = type;
		this.qnaCatCd = category;
		this.mdlTpCd = module;
		this.openLvlCd = openLvlCd;
		this.inqrTitl = title;
		this.inqrCont = contents;
	}
}