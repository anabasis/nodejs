package com.seegene.main.global.dto;

import java.nio.charset.StandardCharsets;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import software.amazon.awssdk.services.ses.model.Body;
import software.amazon.awssdk.services.ses.model.Content;
import software.amazon.awssdk.services.ses.model.Destination;
import software.amazon.awssdk.services.ses.model.Message;
import software.amazon.awssdk.services.ses.model.SendEmailRequest;

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
 *   1 2023-09-13        khhong        최초작성
 * </PRE>
 */
@Getter
@Setter
@Builder
public class ExternalMailSenderDto {

	@JsonIgnore
	@Schema(description = "보낸사람", example = "no-reply@sg-drdp.com")
	private String from;

	@JsonProperty("to")
	@Schema(description = "받는 사람", example = "***@domain.com")
	private String to;

	@JsonProperty("subject")
	@Schema(description = "제목", defaultValue = "메일 제목입니다.", example = "메일 제목입니다.")
	private String subject;

	@JsonProperty("content")
	@Schema(description = "본문에 필요한 정보", defaultValue = "<!DOCTYPE html><html><head><meta charset=\"UTF-8\"/></head><body>본문에 필요한 정보입니다. </body></html>", example = "<!DOCTYPE html><html><head><meta charset=\"UTF-8\"/></head><body>본문에 필요한 정보입니다. </body></html>")
	private String content;

	public SendEmailRequest toSendRequestDto() {
		Destination destination = Destination.builder().toAddresses(this.to).build();

		Message message = Message.builder()
			.subject(createSubject(this.subject))
			.body(Body.builder().html(createContext(content)).build())
			.build();

		return SendEmailRequest.builder().source(this.from).destination(destination).message(message).build();
	}

	private Content createSubject(final String subject) {
		return Content.builder().charset(StandardCharsets.UTF_8.name()).data(subject).build();
	}

	public Content createContext(final String content) {
		return Content.builder().charset(StandardCharsets.UTF_8.name()).data(content).build();
	}

}
