package com.seegene.main.global.dto;

import java.nio.charset.StandardCharsets;
import java.util.Map;

import org.thymeleaf.context.Context;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import software.amazon.awssdk.services.ses.model.Body;
import software.amazon.awssdk.services.ses.model.Content;
import software.amazon.awssdk.services.ses.model.Destination;
import software.amazon.awssdk.services.ses.model.Message;
import software.amazon.awssdk.services.ses.model.SendEmailRequest;

/**
 * MailSenderDto
 * <PRE>
 * </PRE>
 * @author   : khhong@mz.co.kr
 *
 * @History
 * <PRE>
 * No  Date           Author            Desc
 *---- ------------ ---------------- ------------------------------------
 *   1 2023-08-07        khhong        최초작성
 * </PRE>
 */

@Getter
@Setter
@Builder
public class MailSenderDto {

	private String from; // 보낸사람
	private String to;   // 받는 사람
	private String subject; // 제목
	private Map<String, Object> data; // 본문에 필요한 정보

	public SendEmailRequest toSendRequestDto(String content) {
		Destination destination = Destination.builder().toAddresses(this.to).build();

		Message message = Message.builder()
			.subject(createSubject(this.subject))
			.body(Body.builder().html(Content.builder().data(content).build()).build())
			.build();

		return SendEmailRequest.builder().source(this.from).destination(destination).message(message).build();
	}

	private Content createSubject(final String subject) {
		return Content.builder().charset(StandardCharsets.UTF_8.name()).data(subject).build();
	}

	public Context createContext(final Map<String, Object> content) {
		Context context = new Context();
		context.setVariables(content);
		return context;
	}
}
