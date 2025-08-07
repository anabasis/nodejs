package com.seegene.main.domain.project.repository;

import com.seegene.main.domain.project.entity.TpjPrjPrcs;
import com.seegene.main.domain.project.entity.TpjPrjPrcsSts;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TpjPrjPrcsStsRepository extends JpaRepository<TpjPrjPrcsSts, Long> {
//	@EntityGraph(attributePaths = {"tpjPrjPrcs"})
//	void deleteByTpjPrjPrcsId(Long prjPrcsNum);
	Optional<TpjPrjPrcsSts> deleteByTpjPrjPrcsId(Long prjPrcsNum);

	Optional<TpjPrjPrcsSts> findTopByTpjPrjPrcsIdInOrderByStsDtDesc(List<Long> prjPrcsNumList);
	List<TpjPrjPrcsSts> findByTpjPrjPrcsIdInOrderByStsDtDesc(List<Long> prjPrcsNumList);

	List<TpjPrjPrcsSts> findByTpjPrjPrcsIdAndPrcsStsCd(Long prjPrcsNum, String prcsStsCd);
	List<TpjPrjPrcsSts> findByTpjPrjPrcsId(Long prjPrcsNum);

	boolean existsByTpjPrjPrcsIdAndPrcsStsCd(Long prjPrcsNum, String prcsStsCd);
}
