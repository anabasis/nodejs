package com.seegene.main.global.dto;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.google.gson.Gson;

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
@JsonInclude(JsonInclude.Include.NON_NULL)
@Getter
public class RealmAccess {

	public List<String> roles;

	public static RealmAccess getRealmAccessData(Object realmAccess){
		Gson gson = new Gson();
		String json = gson.toJson(realmAccess);
		return gson.fromJson(json, RealmAccess.class);
	}
}
