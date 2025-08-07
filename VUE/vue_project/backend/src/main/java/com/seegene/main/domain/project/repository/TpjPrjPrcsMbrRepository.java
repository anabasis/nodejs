package com.seegene.main.domain.project.repository;

import com.seegene.main.domain.project.entity.TpjPrjPrcsMbr;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TpjPrjPrcsMbrRepository extends JpaRepository<TpjPrjPrcsMbr, Long> , TpjPrjPrcsMbrRepositoryCustom {
	List<TpjPrjPrcsMbr> findByTpjPrjPrcsIdInAndTpjPrjMbrId(List<Long> prjPrcsNumList, Long prjMbr);

	Optional<TpjPrjPrcsMbr> findByTpjPrjMbrIdAndTpjPrjPrcsId(Long prjMbrNum, Long prjPrcsNum);

	Boolean existsByTpjPrjPrcsIdAndTpjPrjMbrId(Long prjPrcsNum, Long prjMbrNum);

	List<TpjPrjPrcsMbr> findByTpjPrjMbrId(Long prjMbr);

	List<TpjPrjPrcsMbr> findByTpjPrjMbrTpjPrjIdAndTpjPrjPrcsId(Long id ,Long prjPrcsNumber);
	List<TpjPrjPrcsMbr> findByTpjPrjMbr_TpjPrjId(Long id);

}
