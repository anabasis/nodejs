package com.seegene.main.domain.project.repository;

import com.seegene.main.domain.project.entity.TpjPrjRgltrAfr;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TpjPrjRgltrAfrRepository extends JpaRepository<TpjPrjRgltrAfr, Long> {
    void deleteByTpjPrjId(Long prjId);
}
