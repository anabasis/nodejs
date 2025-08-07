package com.seegene.main.domain.account.constant;


public enum NotfRolCode {
	/*
        PFM057	Notification Type Code(User)
        PFM058	Notification Type Code(Admin : Service)
        PFM059	Notification Type Code(Admin : Platform)
        PFM060	Notification Type Code(Admin : Operation/IT)
     */

	// 유저
	USER("User", "PFM057"),
	// 어드민 - Service 약관목록
	SERVICE("A-SV", "PFM058"),
	// 어드민 - Platform 약관 목록
	PLATFORM("A-PF", "PFM059"),
	// 어드민 - Operation 약관 목록
	OPERATION("A-OP", "PFM060"),
	// 어드민 - IT 약관 목록
	IT("A-IT", "PFM060");

	private final String name;
	private final String code;

	NotfRolCode(String name, String code) {
		this.name = name;
		this.code = code;
	}

	public String getName() {
		return name;
	}

	public String getCode() {
		return code;
	}

}
