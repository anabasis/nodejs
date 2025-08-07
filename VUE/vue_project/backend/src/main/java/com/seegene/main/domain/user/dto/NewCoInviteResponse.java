package com.seegene.main.domain.user.dto;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Schema(description = "NewCo Invite User Response")
@Builder
@Getter
@AllArgsConstructor
public class NewCoInviteResponse {

	@JsonProperty("userInvtUid")
	@Schema(description = "초대 아이디", example = "1860187D771643A5AB3776A0B63FE252")
	private String userInvtUid;

	@JsonProperty("nation")
	@Schema(description = "국가", example = "KOR")
	private String nation;

	@JsonProperty("corporationName")
	@Schema(description = "소속기업", example = "inition")
	private String corporationName;

	@JsonProperty("emailId")
	@Schema(description = "이메일주소", example = "test@test.com")
	private String emailId;

	@JsonProperty("userRolName")
	@Schema(description = "사용자 역할", example = "개발자")
	private String userRolName;

	@JsonProperty("createDate")
	@Schema(description = "가입일시", example = "2023-01-01")
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
	private LocalDateTime createDate;

	@JsonProperty("userUid")
	@Schema(description = "멤버아이디", example = "1")
	private String userUid;

	@JsonProperty("inviteExpirationYn")
	@Schema(description = "초대메일 만료여부", example = "Y")
	private String inviteExpirationYn;

	@JsonProperty("inviteRejectYn")
	@Schema(description = "초대메일 취소여부", example = "Y")
	private String inviteRejectYn;

	public NewCoInviteResponse(String userInvtUid,String nation, String corporationName, String emailId, String userRolName, LocalDateTime createDate, String inviteExpirationYn) {
		this.userInvtUid = userInvtUid;
		this.nation = nation;
		this.corporationName = corporationName;
		this.emailId = emailId;
		this.userRolName = userRolName;
		this.createDate = createDate;
		this.inviteExpirationYn = inviteExpirationYn;
	}
}
