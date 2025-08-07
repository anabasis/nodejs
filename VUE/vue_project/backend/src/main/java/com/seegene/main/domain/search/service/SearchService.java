package com.seegene.main.domain.search.service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import com.seegene.main.domain.datacodemanagement.repository.TcdCdItmRepository;
import com.seegene.main.domain.datacodemanagement.repository.TcdCntryRepository;
import com.seegene.main.domain.project.entity.TpjPrj;
import com.seegene.main.domain.project.repository.TcdPrcsRepository;
import com.seegene.main.domain.project.repository.TpjPrjPrcsStsRepository;
import com.seegene.main.domain.project.repository.TpjPrjRepository;
import com.seegene.main.domain.project.repository.TpjPrjSpecification;
import com.seegene.main.domain.user.repository.TusUsrRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.seegene.main.domain.search.dto.SearchDto;
import com.seegene.main.domain.search.dto.SearchListResponse;

import lombok.extern.slf4j.Slf4j;

/**
 * class 한글 설명
 * <PRE>
 * </PRE>
 *
 * @author : mistersoh@naver.com
 * @History <PRE>
 * No  Date           Author            Desc
 * ---- ------------ ---------------- ------------------------------------
 * 1 2023-06-29        mistersoh        최초작성
 * </PRE>
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class SearchService {

    private final TpjPrjRepository tpjPrjRepository;
    private static final String DEL_N = "N";

    public SearchListResponse getAllKeyWordSearchList(String keyword) {


        Specification<TpjPrj> spec = getSpecificationTpjPrjIntegratedSearch(keyword);

        List<SearchListResponse.Project> projects = tpjPrjRepository.findAll(spec).stream().map(tpjPrj -> {
            return SearchListResponse.Project.of(tpjPrj);
        }).collect(Collectors.toList());

        //        keyword = "%" + keyword + "%";
//		List<SearchListResponse.Project> projects = tpjPrjRepository.findByPrjNmLikeIgnoreCaseOrDissCatCdLikeIgnoreCase(keyword, keyword).stream().map(tpjPrj -> {
//			return SearchListResponse.Project.of(tpjPrj);
//		}).collect(Collectors.toList());

        return SearchListResponse.of(projects);
    }

    public Specification<TpjPrj> getSpecificationTpjPrjIntegratedSearch(String keyword) {

        Specification<TpjPrj> spec = Specification.where(TpjPrjSpecification.equalToDelYn(DEL_N));

        if (keyword != null) {
            spec = spec.and(TpjPrjSpecification.likeProjectIntegratedSearch(keyword));
        }

        return spec;
    }



    public List<SearchDto> getAllKeyWordSearchProjectTypeList(String keyword) {
        List<SearchDto> searchDtoProjectTypeList = new ArrayList<>();
        for (int i = 0; i < 5; i++) {
            SearchDto searchDto = SearchDto.builder().projectName("project" + i).build();
            searchDtoProjectTypeList.add(searchDto);
        }
        return searchDtoProjectTypeList;
    }

    public List<SearchDto> getAllKeyWordSearchRequestTypeList(String keyword) {
        List<SearchDto> searchDtoRequestTypeList = new ArrayList<>();
        for (int i = 0; i < 5; i++) {
            SearchDto searchDto = SearchDto.builder().requestName("request" + i).build();
            searchDtoRequestTypeList.add(searchDto);
        }
        return searchDtoRequestTypeList;
    }
}
