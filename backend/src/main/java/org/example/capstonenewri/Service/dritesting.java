package org.example.capstonenewri.Service;//TIP To <b>Run</b> code, press <shortcut actionId="Run"/> or
// click the <icon src="AllIcons.Actions.Execute"/> icon in the gutter.
import org.example.capstonenewri.Service.DRICalculator;
import org.example.capstonenewri.Entity.DRI;

import java.time.LocalDate;
import java.math.BigDecimal;


public class dritesting {
    public static void main(String[] args) {
        // Test Data
        LocalDate birth = LocalDate.of(2001,12,21);
        char gender = 'M';
        boolean isPregnant = true;
        boolean isBreastfeeding = false;
        BigDecimal height = BigDecimal.valueOf(178);
        BigDecimal weight = BigDecimal.valueOf(68);

        // DRI 산출 모듈 생성
        DRICalculator test = new DRICalculator(birth, gender, isPregnant, isBreastfeeding, height, weight);
        // DRI 산출
        DRI userDRI = test.DRICalc();
    }
}