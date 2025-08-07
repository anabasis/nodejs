package com.seegene.main.domain.request.service;


import com.seegene.main.domain.request.dto.OligoDesignRequestInfoResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;


/**
 * Project controller
 * <PRE>
 * </PRE>
 * @author   : khhong@mz.co.kr
 *
 * @History
 * <PRE>
 * No  Date           Author            Desc
 *---- ------------ ---------------- ------------------------------------
 *   1 2023-06-29        khhong        최초작성
 * </PRE>
 */
@Service
public class RequestService {

    /**
     * Oligo Design Request 메인 list 조회
     <PRE>
     메인 Oligo Design Request list 조회 한다.
     </PRE>
     @author  : 홍길동(yongtaeyu@mz.co.kr)
      * @date  : ${date}
     @return  : Page<OligoDesignRequestInfoResponse>
     */
    public Page<OligoDesignRequestInfoResponse> getOligoDesignRequestList(Pageable pageable, String period1, String period2, String status, String toolType, String keyword, String processType) {
        return Page.empty(pageable);
    }

    /**
     * oligo Design Request 복사
     <PRE>
     Oligo Design Request 복사 한다.
     </PRE>
     @author  : 유용태(yongtaeyu@mz.co.kr)
      * @date  : ${date}
     @return  : Page<ProjectPlaningFileResponse>
     */
    public void copyOligoDesignRequest(String requestId) {
    }

    /**
     * oligo Design Request 삭제
     <PRE>
     oligo Design Request 삭제
     </PRE>
     @author  : 유용태(yongtaeyu@mz.co.kr)
      * @date  : ${date}
     @return  : Page<ProjectPlaningFileResponse>
     */
    public void deleteOligoDesignRequest(String requestId) {
    }
}
