package com.seegene.main.global.config.annotation;


import com.seegene.main.global.constant.ErrorCode;
import com.seegene.main.global.exception.BusinessException;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import java.util.Objects;


public class EnumValidator implements ConstraintValidator<ValidEnum, String> {
    private ValidEnum annotation;

    @Override
    public void initialize(ValidEnum constraintAnnotation) {
        this.annotation = constraintAnnotation;
    }

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        boolean validCheck = false;
        Object[] enumValues = this.annotation.enumClass().getEnumConstants();
        if (enumValues != null) {
            for (Object enumValue : enumValues) {
                if (Objects.equals(value, enumValue.toString())) {
                    validCheck = true;
                    break;
                }
            }
        }
        if(!validCheck) {
            throw new BusinessException(ErrorCode.ENUM_VALUE_ERROR);
        }
        return true;
    }
}
