package com.seegene.main.global.convert;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Arrays;

public class MaskingConverter {

  private enum MaskingPattern {
    EMAIL("(?<=.{2})[^@\\n](?=[^@\\n]*?@)|(?:(?<=@.)|(?!^)\\G(?=[^@\\n]*$)).(?=.*\\.)"),
    DESTROY("(?<=.{2})[^@\\n](?=[^@\\n]*?@)");

    String regexp;

    MaskingPattern(String regexp) {
      this.regexp = regexp;
    }

    public String getRegexp() {
      return regexp;
    }
  }

  public static String maskEmail(String email) {
    return email.replaceAll(MaskingPattern.EMAIL.getRegexp(), "*");
  }

  public static String maskEmailForDestroy(final String email) {
    return email.replaceAll(MaskingPattern.DESTROY.getRegexp(), "*");
  }

  //입력값 모두 마스킹
  public static String maskString(String targetMasking) {
    char[] maskChars = new char[targetMasking.length()];

    if(maskChars.length > 10){
      return "*********";
    }else{
      Arrays.fill(maskChars, '*');
      return new String(maskChars);
    }
  }

  public static String maskLocalDateTime(LocalDateTime localDateTime) {
    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMdd");
    String format = formatter.format(localDateTime);
    return MaskingConverter.maskString(format);
  }


  public static LocalDateTime maskToLocalDateTime(LocalDateTime localDateTime) {
    DateTimeFormatter maskFormatter = DateTimeFormatter.ofPattern("yyyyMMdd");

    String format = maskFormatter.format(localDateTime);
    String maskedString = MaskingConverter.maskString(format);

    return LocalDateTime.parse(maskedString, maskFormatter);
  }
}
