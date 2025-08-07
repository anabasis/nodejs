package com.seegene.main.domain.request.controller;


import com.seegene.main.domain.request.dto.OligoDesignRequestInfoResponse;
import com.seegene.main.domain.request.service.RequestService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.annotation.Nullable;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

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
@RestController
@RequestMapping(path = "/request")
@RequiredArgsConstructor
@Tag(name = "RequestController", description = "Oligo Design Request API")
public class RequestController {

    private final RequestService requestService;

    /**
     * Oligo Design Request 메인 list 조회
     <PRE>
        메인 Oligo Design Request list 조회 한다.
     </PRE>
     @author  : 홍길동(yongtaeyu@mz.co.kr)
      * @date  : ${date}
     @return  : Page<OligoDesignRequestInfoResponse>
     */
    @Operation(summary = "Oligo Design Request 메인 list 조회", description = "메인 Oligo Design Request list 조회 한다.")
    @GetMapping(path = "/oligo-design-request/list")
    public Page<OligoDesignRequestInfoResponse> getOligoDesignRequestList(
            @Parameter(description = "페이지 공통")
            Pageable pageable,
            @Parameter(description = "processType type", example = "all")
            @RequestParam("processType")
            String processType,
            @Parameter(description = "기간-시작")
            @RequestParam("period")
            String period1,
            @Parameter(description = "기간-끝")
            @RequestParam("period2")
            String period2,
            @Parameter(description = "상태",example = "all")
            @RequestParam("status")
            String status,
            @Parameter(description = "Tool type", example = "all")
            @RequestParam("toolType")
            String toolType,
            @Nullable
            @Parameter(description = "keyword")
            @RequestParam("keyword")
            String keyword
    ){
        return requestService.getOligoDesignRequestList(
            pageable,
            period1,
            period2,
            status,
            toolType,
            keyword,
            processType
        );
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
    @Operation(summary = "oligo Design Request 복사", description = "메인 Oligo Design Request 복사 한다.")
    @PostMapping(path = "/oligo-design-request/{requestId}/copy")
    public void copyOligoDesignRequest(
        @Parameter(description = "선택된 oligo Design 요청 아이디")
        @PathVariable(value = "requestId")
        String requestId
    ){
        requestService.copyOligoDesignRequest(requestId);
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
    @Operation(summary = "oligo Design Request 삭제", description = "메인 Oligo Design Request 삭제한다.")
    @PostMapping(path = "/oligo-design-request/{requestId}/delete")
    public void deleteOligoDesignRequest(
        @Parameter(description = "선택된 oligo Design 요청 아이디")
        @PathVariable(value = "requestId")
        String requestId
    ){
        requestService.deleteOligoDesignRequest(requestId);
    }
}
