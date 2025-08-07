package com.seegene.main.domain.datastore.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

/**
 * 데이터 스토어 Request DTO
 * <PRE>
 * </PRE>
 * @author   : @mz.co.kr
 *
 * @History
 * <PRE>
 * No  Date           Author            Desc
 *---- ------------ ---------------- ------------------------------------
 *   1                 최초작성
 * </PRE>
 */
@Schema(description = "데이터 스토어 Request DTO")
@Getter
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class DataStoreRequest {

	@JsonProperty("data_store_id")
	@Schema(description = "데이터 스토어 고유 아이디,", example = "data_store-11")
	private String dataStoreId;

	@JsonProperty("data_store_folder_id")
	@Schema(description = "데이터 스토어 폴더 아이디", example = "1234")
	private String dataStoreFolderId;

	@JsonProperty("data_store_file_id")
	@Schema(description = "데이터 스토어 파일 아이디", example = "Keyword, Keyword, Keyword..")
	private String dataStoreFileId;

	@JsonProperty("data_store_file_name")
	@Schema(description = "데이터 스토어 파일 이름", example = "AutoMSA RepIN RepIN Sorting Log_230521")
	private String dataStoreFileName;
}
