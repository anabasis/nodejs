package com.seegene.main.domain.demo.dto;

import static io.swagger.v3.oas.annotations.media.Schema.RequiredMode.*;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

/**
 * class 한글 설명
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
@Getter
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
@AllArgsConstructor
public class LoginValidTResponse {

	@JsonProperty("emailId")
	@Schema(description = "Email Id", example = "kk@seegene.com", requiredMode = REQUIRED)
	private String emailId;

	@JsonProperty("userUid")
	@Schema(description = "User Uid", example = "User Uid", requiredMode = REQUIRED)
	private String userUid;

	@JsonProperty("corporateNumber")
	@Schema(description = "Corporate Number", example = "Corporate Number")
	private String corporateNumber;

	@JsonProperty("corporateName")
	@Schema(description = "Corporate Name", example = "Corporate Name")
	private String corporateName;

	@JsonProperty("corporateLvlCode")
	@Schema(description = "Corporate LevelCode", example = "Corporate LevelCode")
	private String corporateLvlCode;

	@JsonProperty("userName")
	@Schema(description = "User Name", example = "User Name", requiredMode = REQUIRED)
	private String userName;

	@JsonProperty("organizationName")
	@Schema(description = "Organization Name", example = "Organization Name")
	private String organizationName;

}
