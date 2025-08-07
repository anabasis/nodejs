package com.seegene.main.domain.dashboard.repository;

import com.seegene.main.domain.dashboard.entity.TusFav;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TusFavRepository extends JpaRepository<TusFav, Long> , TusFavRepositoryCustom{
    List<TusFav> findByTusUsr_IdAndFavTpCd(String userUid, String favTpCd);
    void deleteAllByTusUsr_IdAndFavTpCd(String userUid, String favTpCd);
}
