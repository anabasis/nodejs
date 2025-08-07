package com.seegene.main.domain.project.repository;

import com.seegene.main.domain.corporate.entity.TusCorp;
import com.seegene.main.domain.project.entity.TpjPrj;
import com.seegene.main.domain.project.entity.TpjPrjMbr;
import com.seegene.main.domain.project.entity.TpjPrjPrcs;
import jakarta.persistence.criteria.*;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.domain.Specification;

import java.time.LocalDateTime;
import java.util.Date;

public class TpjPrjSpecification {

    public static Specification<TpjPrj> tab(String tab, Object corpId,  Object usrId) {
        return new Specification<TpjPrj>() {
            @Override
            public Predicate toPredicate(Root<TpjPrj> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
                query.distinct(true);
                if (tab.equals("my")) {
                    Join<TpjPrjMbr, TpjPrj> mbrOfTpjPrj = root.join("tpjPrjMbrList");
                    return criteriaBuilder.equal(mbrOfTpjPrj.join("tusUsr").get("id"), usrId);
                } else if (tab.equals("newCo")) {

                    Join<TusCorp, TpjPrj> corpOfTpjPrj = root.join("tusCorp");
                    if(usrId==null) {
                        return criteriaBuilder.notEqual(corpOfTpjPrj.get("id"), corpId);
                    }else{
                        Join<TpjPrjMbr, TpjPrj> mbrOfTpjPrj = root.join("tpjPrjMbrList");
                        return criteriaBuilder.and(criteriaBuilder.notEqual(corpOfTpjPrj.get("id"), corpId), criteriaBuilder.equal(mbrOfTpjPrj.join("tusUsr").get("id"), usrId));
                    }
                } else {
                    Join<TusCorp, TpjPrj> corpOfTpjPrj = root.join("tusCorp");
                    return criteriaBuilder.equal(corpOfTpjPrj.get("id"), corpId);
                }

            }
        };
    }

    public static Specification<TpjPrj> equalToDelYn(String delYn) {
        return new Specification<TpjPrj>() {
            @Override
            public Predicate toPredicate(Root<TpjPrj> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
                query.distinct(true);
                return criteriaBuilder.equal(root.get("delYn"), delYn);
            }
        };
    }

    public static Specification<TpjPrj> equalToPurposeCode(String devPupsCd) {
        return new Specification<TpjPrj>() {
            @Override
            public Predicate toPredicate(Root<TpjPrj> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
                query.distinct(true);
                return criteriaBuilder.equal(root.get("devPupsCd"), devPupsCd);
            }
        };
    }

    public static Specification<TpjPrj> equalToDiseaseCode(String dissCatCd) {
        return new Specification<TpjPrj>() {
            @Override
            public Predicate toPredicate(Root<TpjPrj> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
                query.distinct(true);
                return criteriaBuilder.equal(root.get("dissCatCd"), dissCatCd);
            }
        };
    }

    public static Specification<TpjPrj> equalToProcessCode(String processCode) {
        return new Specification<TpjPrj>() {
            @Override
            public Predicate toPredicate(Root<TpjPrj> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
                query.distinct(true);
                Join<TpjPrjPrcs, TpjPrj> prcsOfTpjPrj = root.join("tpjPrjPrcsList");
                return criteriaBuilder.equal(prcsOfTpjPrj.get("prcsStsCd"), processCode);
            }
        };
    }

    public static Specification<TpjPrj> betweenEndDateTime(LocalDateTime startDat, LocalDateTime endDat) {
        return new Specification<TpjPrj>() {
            @Override
            public Predicate toPredicate(Root<TpjPrj> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
                query.distinct(true);
                return criteriaBuilder.between(root.get("endDat"), startDat, endDat);
            }
        };
    }

    public static Specification<TpjPrj> greaterThanOrEqualToStartDate(LocalDateTime startDat) {
        return new Specification<TpjPrj>() {
            @Override
            public Predicate toPredicate(Root<TpjPrj> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
                query.distinct(true);
                return criteriaBuilder.greaterThanOrEqualTo(root.get("startDat"), startDat);
            }
        };
    }

    public static Specification<TpjPrj> lessThanOrEqualToEndDate(LocalDateTime endDat) {
        return new Specification<TpjPrj>() {
            @Override
            public Predicate toPredicate(Root<TpjPrj> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
                query.distinct(true);
                return criteriaBuilder.lessThanOrEqualTo(root.get("endDat"), endDat);
            }
        };
    }

    public static Specification<TpjPrj> likeProjectName(String keyword) {
        return new Specification<TpjPrj>() {
            @Override
            public Predicate toPredicate(Root<TpjPrj> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
                query.distinct(true);
                return criteriaBuilder.like(root.get("prjNm"), "%" + keyword + "%");
            }
        };
    }
    public static Specification<TpjPrj> likeProjectIntegratedSearch(String keyword) {
        return new Specification<TpjPrj>() {
            @Override
            public Predicate toPredicate(Root<TpjPrj> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
                Join<TpjPrjMbr, TpjPrj> mbrOfTpjPrj = root.join("tpjPrjMbrList");
                query.distinct(true);
                return criteriaBuilder.or(
                        criteriaBuilder.like(mbrOfTpjPrj.join("tusUsr").get("usrNm"), "%" + keyword + "%"),
                        criteriaBuilder.like(root.get("prjNm"), "%" + keyword + "%"),
                        criteriaBuilder.like(root.get("prdNm"), "%" + keyword + "%"),
                        criteriaBuilder.like(root.get("taskCd"), "%" + keyword + "%")
                );
            }
        };
    }

    public static Specification<TpjPrj> likeProjectId(String keyword) {
        return new Specification<TpjPrj>() {
            @Override
            public Predicate toPredicate(Root<TpjPrj> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
                query.distinct(true);
                return criteriaBuilder.like(root.get("id").as(String.class), "%" + keyword + "%");
            }
        };
    }

    public static Specification<TpjPrj> likeCorporate(String keyword) {
        return new Specification<TpjPrj>() {
            @Override
            public Predicate toPredicate(Root<TpjPrj> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
                query.distinct(true);
                Join<TusCorp, TpjPrj> corpOfTpjPrj = root.join("tusCorp");
                return criteriaBuilder.like(corpOfTpjPrj.get("corpNm"), "%" + keyword + "%");
            }
        };
    }
//    private TpjPrjSearchCriteria criteria;
//
//    @Override
//    public Predicate toPredicate(Root<TpjPrj> root, CriteriaQuery<?> query, CriteriaBuilder builder) {
//
//        if (criteria.getKey().equalsIgnoreCase("startDat")|| criteria.getKey().equalsIgnoreCase("endDat")) {
//            if(criteria.getKey().equalsIgnoreCase("startDat")){
//                return builder.lessThanOrEqualTo(root.get(criteria.getKey()), (LocalDateTime)criteria.getValue());
//            }else {
//                return builder.lessThanOrEqualTo(root.get(criteria.getKey()), (LocalDateTime)criteria.getValue());
//            }
//        }else {
//            return builder.equal(root.get(criteria.getKey()), criteria.getValue());
//        }
//    }
}
