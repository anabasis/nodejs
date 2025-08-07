package com.seegene.main.global.convert;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import com.seegene.main.global.util.page.PageOptions;

public class PageableConverter {

  public static final Pageable DEFAULT_PAGEABLE = PageableConverter.convert(0, 100);
  public static final Pageable LAST_ONE_PAGEABLE = PageableConverter.convert(0, 1);
  public static final Pageable CARE_MANAGE_OPEN_LIST = PageableConverter.convert(0, 2);

  private PageableConverter() {
    throw new UnsupportedOperationException();
  }

  public static Pageable convert(PageOptions pageOptions) {
    return convert(pageOptions, Sort.unsorted());
  }

  public static Pageable convert(PageOptions pageOptions, Sort sort) {
    return PageRequest.of(pageOptions.getPageNumber() - 1, pageOptions.getPageSize(), sort);
  }

  public static Pageable convert(int page, int size) {
    return PageRequest.of(page, size);
  }
}
