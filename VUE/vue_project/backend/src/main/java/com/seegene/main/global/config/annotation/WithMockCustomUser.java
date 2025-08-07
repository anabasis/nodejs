package com.seegene.main.global.config.annotation;

import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;

import org.springframework.security.test.context.support.WithSecurityContext;

import com.seegene.main.global.config.WithMockCustomUserSecurityContextFactory;

/**
 class 한글 설명(요약)
 <PRE>
 한글 설명(상세)
 </PRE>
 @author   : 오윤복(메가존)(megazone.yboh@seegene.com)
 @History
 <PRE>
  * No  Date           Author            Desc
  *---- ------------ ---------------- ------------------------------------
  *   1 2023/09/05   오윤복(메가존)   최초작성
 </PRE>
 */
@Retention(RetentionPolicy.RUNTIME)
@WithSecurityContext(factory = WithMockCustomUserSecurityContextFactory.class)
public @interface WithMockCustomUser {
	String username() default "username";
	String name() default "name";
	String usrUid() default "tester";
	String role() default "TEST_ROLE";
}
