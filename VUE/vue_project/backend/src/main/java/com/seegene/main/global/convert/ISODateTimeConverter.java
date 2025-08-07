package com.seegene.main.global.convert;

import java.time.LocalDate;

public class ISODateTimeConverter {

  private ISODateTimeConverter() {

  }

  public static LocalDate convertDate(String date) {
      if (date == null || date.isEmpty()) {
          return null;
      }
    return LocalDate.parse(date, DefaultDateTimeFormat.DATE_TIME_TIMEZONE_FORMAT);
  }

  public static String convertDate(LocalDate localDate) {
      if (localDate == null) {
          return null;
      }
    return localDate.format(DefaultDateTimeFormat.DATE_TIME_TIMEZONE_FORMAT);
  }
}
