package com.seegene.main.domain.software.repository;


import com.seegene.main.domain.software.dto.SoftwareListResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.time.LocalDateTime;



public interface TswSwRepositoryCustom {

    Page<SoftwareListResponse> findAllSoftwareManagement(String keywordName,
                                                         String keyword,
                                                         String type,
                                                         LocalDateTime startDt,
                                                         LocalDateTime endDt,
                                                         Pageable pageable
    );
}
