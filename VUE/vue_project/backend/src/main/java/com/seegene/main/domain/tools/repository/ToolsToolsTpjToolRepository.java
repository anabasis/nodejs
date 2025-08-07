package com.seegene.main.domain.tools.repository;

import com.seegene.main.domain.tools.entity.ToolsTpjTool;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ToolsToolsTpjToolRepository extends JpaRepository<ToolsTpjTool, Long>, ToolsTpjToolRepositoryCustom {

}

