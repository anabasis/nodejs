package com.seegene.main.domain.datastore.service;

import java.util.ArrayList;
import java.util.List;

import com.seegene.main.domain.datastore.dto.DataStoreFileRequest;
import com.seegene.main.domain.datastore.dto.DataStoreFolderFileResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.seegene.main.domain.datastore.dto.DataStoreRequest;
import com.seegene.main.domain.datastore.dto.DataStoreResponse;

import lombok.extern.slf4j.Slf4j;

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
@Slf4j
@Service
public class DataStoreService {

	public Page<DataStoreResponse> getDataStoreList(String periodStart, String periodEnd, String diseaseCategory, String purpose, String process, String keyword, Pageable pageable) {
		return Page.empty(pageable);
	}

	public void deleteDataStoreDetail(DataStoreRequest dataStoreRequest) {
	}

	public void updateLockDataStoreDetail(DataStoreRequest dataStoreRequest) {
	}

	public void updateUnlockDataStoreDetail(DataStoreRequest dataStoreRequest) {
	}

    public List<DataStoreFolderFileResponse> getDataStoreFileDownload(DataStoreFileRequest dataStoreFileRequest) {
		return null;
    }
}
