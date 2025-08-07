package com.seegene.main.domain.project.repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import com.seegene.main.domain.project.entity.TpjPrj;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface TpjPrjRepository extends JpaRepository<TpjPrj,Long>, JpaSpecificationExecutor<TpjPrj>, TpjPrjRepositoryCustom {
//public interface TpjPrjRepository extends JpaRepository<TpjPrj,Long>, JpaSpecificationExecutor<TpjPrj> {
	Page<TpjPrj> findByDelYn(String delYn, Pageable pageable);

	@EntityGraph( attributePaths = {"tpjPrjPrcsList"}, type = EntityGraph.EntityGraphType.LOAD)
	Optional<TpjPrj> findByIdAndDelYn(Long prjNum, String delYn);

	List<TpjPrj> findByPrjNmLikeIgnoreCaseOrDissCatCdLikeIgnoreCase(String keyword1, String keyword2);
	Page<TpjPrj> findByDelYnAndTusUsrId(String delYn, String usrId, Pageable pageable);

	Page<TpjPrj> findByDelYnAndTusUsrIdAndTpjPrjPrcsListId(String delYn, String usrId, Pageable pageable, Long id);
	List<TpjPrj> findByDelYnAndTusUsrIdAndStartDatGreaterThanEqualAndEndDatLessThanEqual(String delYn, String usrId, LocalDate startDt, LocalDate endDt);

	List<TpjPrj> findByDelYnAndPrjStsCd(String delYn, String prjStsCd);

}
