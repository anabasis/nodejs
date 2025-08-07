package com.seegene.main.global.util.ses;

import org.springframework.stereotype.Component;
import org.thymeleaf.TemplateEngine;

import com.seegene.main.global.dto.ExternalMailSenderDto;
import com.seegene.main.global.dto.MailSenderDto;
import com.seegene.main.global.util.props.AwsProperties;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import software.amazon.awssdk.services.ses.SesClient;
import software.amazon.awssdk.services.ses.model.SendEmailResponse;

/**
 * Email Utils
 * <PRE>
 * </PRE>
 * @author   : khhong@mz.co.kr
 *
 * @History
 * <PRE>
 * No  Date           Author            Desc
 *---- ------------ ---------------- ------------------------------------
 *   1 2023-07-24        khhong        최초작성
 * </PRE>
 */
@Slf4j
@Component
@RequiredArgsConstructor
public class MailUtils {

	private final SesClient sesClient;
	private final AwsProperties awsProperties;
	private final TemplateEngine templateEngine;

	public void sendMessage(String templateName, MailSenderDto emailSenderDto) {
		emailSenderDto.setFrom(awsProperties.getFromEmail());
		sendingResultMustSuccess(sesClient.sendEmail(emailSenderDto.toSendRequestDto(templateEngine.process(templateName, emailSenderDto.createContext(emailSenderDto.getData())))));
	}

	public void sendMessageForExternal(ExternalMailSenderDto externalMailSenderDto) {
		externalMailSenderDto.setFrom(awsProperties.getFromEmail());
		sendingResultMustSuccess(sesClient.sendEmail(externalMailSenderDto.toSendRequestDto()));
	}

	private void sendingResultMustSuccess(final SendEmailResponse sendEmailResponse) {
		if (sendEmailResponse.sdkHttpResponse().statusCode() != 200) {
			log.error("sendingResultMustSuccess : {}", sendEmailResponse.responseMetadata().toString());
		}
	}
}
