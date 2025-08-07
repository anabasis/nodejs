package com.seegene.main.domain.datastore.controller;

import java.util.List;

import com.seegene.main.domain.datastore.dto.*;
import io.swagger.v3.oas.annotations.Parameter;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;
import com.seegene.main.domain.datastore.service.DataStoreService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

/**
 * class 한글 설명
 * <PRE>
 * </PRE>
 * @author   : khhong@mz.co.kr
 *
 * @History
 * <PRE>
 * No  Date           Author            Desc
 *---- ------------ ---------------- ------------------------------------
 *   1 2023-07-05        khhong        최초작성
 * </PRE>
 */
@Tag(name="datastore", description = "데이터 저장소 API")
@RequestMapping("/datastore")
@RequiredArgsConstructor
@RestController
public class DataStoreController {

	private final DataStoreService dataStoreService;

	/**
	 * [IFM098] 데이터 저장소 전체 목록 조회
	 <PRE>
	 데이터 저장소 전체 목록 조회 한다.
	 </PRE>
	 @author  : 홍길동(yongtaeyu@mz.co.kr)
	  * @date  : ${date}
	 @return  : Page<DataStoreResponse>
	 */
	@Operation(summary = "[IFM098] 데이터 저장소 전체 목록 조회", description = "데이터 저장소 전체 목록 조회 한다.")
	@GetMapping("/detail-folder/list")
	public Page<DataStoreResponse> getDataStoreList(
		@RequestParam
		String period_start,
		@RequestParam
		String period_end,
		@RequestParam
		String diseaseCategory,
		@RequestParam
		String purpose,
		@RequestParam
		String process,
		@RequestParam
		String keyword,
		@Parameter(description = "페이지-공통")
		Pageable pageable
	){
		return dataStoreService.getDataStoreList(
			period_start,
			period_end,
			diseaseCategory,
			purpose,
			process,
			keyword,
			pageable
		);
	}
	@Operation(summary = "[IFM099] 데이터 저장소 상세 정보조회(header)", description = "데이터 저장소 상세 정보조회(header) 한다.")
	@GetMapping("/detail-folder/detail")
	public DateStoreDetailResponse getDataStoreDetail(){
		return null;
	}

	@Operation(summary = "[IFM100] 데이터 저장소 데이터 폴더 조회", description = "데이터 저장소 상세 폴더 조회한다.")
	@GetMapping("/detail-folder-file")
	public List<DataStoreFolderResponse> getDataStoreFolderList(
		@Parameter(description = "프로잭트아이디")
		@RequestParam String projectId,
		@Parameter(description = "파일아이디/폴더아이디")
		@RequestBody DataStoreFileRequest dataStoreFileRequest
	) {
		return null;
	}

	@Operation(summary = "[IFM101] 데이터 저장소 데이터 폴더 파일 조회", description = "데이터 저장소 상세 폴더 파일 조회한다.")
	@GetMapping("/detail-folder")
	public List<DataStoreFolderFileResponse> getDataStoreFileList(
		@Parameter(description = "프로잭트아이디")
		@RequestParam String projectId,
		@Parameter(description = "파일아이디/폴더아이디")
		@RequestBody DataStoreFileRequest dataStoreFileRequest
	) {
		return null;
	}
	@Operation(summary = "[IFM102] 데이터 저장소 데이터 다운로드", description = "데이터 다운로드 한다.")
	@GetMapping("/detail-folder/download")
	public List<DataStoreFolderFileResponse> exportFiles(
		@Parameter(description = "프로잭트아이디")
		@RequestParam
		String projectId,
		@Parameter(description = "파일아이디/폴더아이디")
		@RequestBody DataStoreFileRequest dataStoreFileRequest
	) {
		return dataStoreService.getDataStoreFileDownload(dataStoreFileRequest);
	}

	@Operation(summary = "[IFM103] 데이터 저장소 데이터 상세 삭제", description = "데이터 저장소 데이터 상세 파일을 삭제한다.")
	@PostMapping("/detail-folder-file/delete")
	public void deleteDataStoreDetail(@RequestBody DataStoreRequest dataStoreRequest) {
		dataStoreService.deleteDataStoreDetail(dataStoreRequest);
	}
	@Operation(summary = "[IFM104] 데이터 저장소 데이터 상세 잠금 등록", description = "데이터 저장소 데이터 상세 잠금 등록 한다.")
	@PostMapping("/detail-folder-file/lock")
	public void updateLockDataStoreDetail(@RequestBody DataStoreRequest dataStoreRequest) {
		dataStoreService.updateLockDataStoreDetail(dataStoreRequest);
	}

	@Operation(summary = "[IFM105] 데이터 저장소 데이터 상세 잠금해제 등록", description = "데이터 저장소 데이터 상세 파일을 잠금해제 등록한다.")
	@PostMapping("/detail-folder-file/unlock")
	public void updateUnlockDataStoreDetail(@RequestBody DataStoreRequest dataStoreRequest) {
		dataStoreService.updateUnlockDataStoreDetail(dataStoreRequest);
	}
}
