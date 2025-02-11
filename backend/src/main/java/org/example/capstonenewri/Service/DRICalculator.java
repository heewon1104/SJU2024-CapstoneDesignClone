package org.example.capstonenewri.Service;

import java.time.LocalDate;
import java.math.BigDecimal;
import java.util.List;
import java.util.ArrayList;

import org.example.capstonenewri.Entity.Member;
import org.example.capstonenewri.Entity.Type.Gender;
import org.example.capstonenewri.Utils.CSVReader;
import org.example.capstonenewri.Entity.DRI;


public class DRICalculator {
    // Input Parameters
    LocalDate birth;
    Gender gender;
    boolean isPregnant;
    boolean isBreastfeeding;
    BigDecimal height;
    BigDecimal weight;
    int age;
    String lifeStage;
    String prefix;

    // Outputs
    BigDecimal energy=null;
    BigDecimal carbohydrate=null;
    BigDecimal fiber=null;
    BigDecimal protein=null;
    BigDecimal fat=null;
    BigDecimal water=null;
    BigDecimal ash=null;
    BigDecimal sugar=null;
    BigDecimal calcium=null;
    BigDecimal iron=null;
    BigDecimal phosphorus=null;
    BigDecimal potassium=null;
    BigDecimal sodium=null;
    BigDecimal vitamin_a=null;
    BigDecimal retinol=null;
    BigDecimal beta_carotene=null;
    BigDecimal thiamin=null;
    BigDecimal riboflavin=null;
    BigDecimal niacin=null;
    BigDecimal vitamin_c=null;
    BigDecimal vitamin_d=null;
    BigDecimal cholesterol=null;
    BigDecimal saturated_fatty_acid=null;
    BigDecimal trans_fatty_acid=null;


    // Initialize
    public DRICalculator(LocalDate birth, Gender gender, boolean isPregnant, boolean isBreastfeeding, BigDecimal height, BigDecimal weight) {
        /*
        나이 계산 및 Life Stage Group, prefix 산출
         */
        this.birth = birth;
        this.gender = gender;
        this.isPregnant = isPregnant;
        this.isBreastfeeding = isBreastfeeding;
        this.height = height.multiply(BigDecimal.valueOf(0.01));
        this.weight = weight;

        // calculate current age (만나이);
        LocalDate now = LocalDate.now();
        int age = now.minusYears(birth.getYear()).getYear();
        if (birth.plusYears(age).isAfter(now)) {
            age = age - 1;
        }
        this.age = age;

        // set Base Life Stage Group;
        if (this.age < 1) {
            this.lifeStage = "Infants 6-12 mo";
            this.prefix = "Infants";
        } else if (this.age < 4) {
            this.lifeStage = "Children 1-3 y";
            this.prefix = "Children";
        } else if (this.age < 9) {
            this.lifeStage = "Children 4-8 y";
            this.prefix = "Children";
        } else if (this.age < 14) {
            this.lifeStage = " 9-13 y";
        } else if (this.age < 19) {
            this.lifeStage = " 14-18 y";
        } else if (this.age < 31) {
            this.lifeStage = " 19-30 y";
        } else if (this.age < 51) {
            this.lifeStage = " 31-50 y";
        } else if (this.age < 70) {
            this.lifeStage = " 51-70 y";
        } else {
            this.lifeStage = " > 70 y";
        }

        // Add Prefix
        if (this.age >= 9 && this.age <= 50) {
            if (this.gender == Gender.M) {
                this.prefix = "Males";
            } else {
                if (this.isPregnant) {
                    this.prefix = "Pregnancy";
                } else if (this.isBreastfeeding) {
                    this.prefix = "Lactation";
                } else {
                    this.prefix = "Females";
                }
            }

            this.lifeStage = this.prefix + this.lifeStage;
        }
    }

    // Calculate EER
    public void calEssentialNutrients() {
        /*
        에너지, 탄수화물, 단백질, 지방, 식이섬유, 물 계산
         */
        if (this.lifeStage.equals("Infants 6-12 mo")) {
            // energy
            this.energy = this.weight.multiply(BigDecimal.valueOf(89)).subtract(BigDecimal.valueOf(100))
                    .add(BigDecimal.valueOf(22));
            // protein
            this.protein = this.weight.multiply(BigDecimal.valueOf(0.66/0.7+0.46)).multiply(BigDecimal.valueOf(1.25));
        }

        else if (this.lifeStage.equals("Children 1-3 y")) {
            // energy
            this.energy = this.weight.multiply(BigDecimal.valueOf(89)).subtract(BigDecimal.valueOf(100))
                    .add(BigDecimal.valueOf(20));
            // protein
            this.protein = this.weight.multiply(BigDecimal.valueOf(0.66/0.7+0.19)).multiply(BigDecimal.valueOf(1.25));
        }

        else if (this.lifeStage.equals("Children 4-8 y")) {
            if (this.gender == Gender.M) {
                // energy
                this.energy = (this.weight.multiply(BigDecimal.valueOf(26.7)).add(this.height.multiply(BigDecimal.valueOf(903))))
                        .multiply(BigDecimal.valueOf(1.13)).add(BigDecimal.valueOf(88.5 - 61.9 * this.age));
                // protein
                this.protein = this.weight.multiply(BigDecimal.valueOf(0.66/0.7+0.08)).multiply(BigDecimal.valueOf(1.25));
            }
            else {
                // energy
                this.energy = (this.weight.multiply(BigDecimal.valueOf(10.0)).add(this.height.multiply(BigDecimal.valueOf(934))))
                        .multiply(BigDecimal.valueOf(1.16)).add(BigDecimal.valueOf(135.3 - 30.8 * this.age));
                // protein
                this.protein = this.weight.multiply(BigDecimal.valueOf(0.66/0.7+0.08)).multiply(BigDecimal.valueOf(1.25));
            }
            // 생애단계별 추가필요량
            this.energy = this.energy.add(BigDecimal.valueOf(20));
        }

        else if (this.lifeStage.equals("Males 9-13 y")) {
            // energy
            this.energy = (this.weight.multiply(BigDecimal.valueOf(26.7)).add(this.height.multiply(BigDecimal.valueOf(903))))
                    .multiply(BigDecimal.valueOf(1.13)).add(BigDecimal.valueOf(88.5 - 61.9 * this.age));
            // protein
            this.protein = this.weight.multiply(BigDecimal.valueOf(0.66/0.73+0.09)).multiply(BigDecimal.valueOf(1.25));
            // 생애단계별 추가필요량
            this.energy = this.energy.add(BigDecimal.valueOf(25));
        }

        else if (this.lifeStage.equals("Females 9-13 y")) {
            // energy
            this.energy = (this.weight.multiply(BigDecimal.valueOf(10.0)).add(this.height.multiply(BigDecimal.valueOf(934))))
                    .multiply(BigDecimal.valueOf(1.16)).add(BigDecimal.valueOf(135.3 - 30.8 * this.age));
            // protein
            this.protein = this.weight.multiply(BigDecimal.valueOf(0.66/0.73+0.08)).multiply(BigDecimal.valueOf(1.25));
            // 생애단계별 추가필요량
            this.energy = this.energy.add(BigDecimal.valueOf(25));
        }

        else if (this.lifeStage.equals("Males 14-18 y")) {
            // energy
            this.energy = (this.weight.multiply(BigDecimal.valueOf(26.7)).add(this.height.multiply(BigDecimal.valueOf(903))))
                    .multiply(BigDecimal.valueOf(1.13)).add(BigDecimal.valueOf(88.5 - 61.9 * this.age));
            // protein
            this.protein = this.weight.multiply(BigDecimal.valueOf(0.66/0.86+0.05)).multiply(BigDecimal.valueOf(1.25));
            // 생애단계별 추가필요량
            this.energy = this.energy.add(BigDecimal.valueOf(25));
        }

        else if (this.lifeStage.equals("Females 14-18 y")) {
            // energy
            this.energy = (this.weight.multiply(BigDecimal.valueOf(10.0)).add(this.height.multiply(BigDecimal.valueOf(934))))
                    .multiply(BigDecimal.valueOf(1.16)).add(BigDecimal.valueOf(135.3 - 30.8 * this.age));
            // protein
            this.protein = this.weight.multiply(BigDecimal.valueOf(0.66/0.86+0.02)).multiply(BigDecimal.valueOf(1.25));
            // 생애단계별 추가필요량
            this.energy = this.energy.add(BigDecimal.valueOf(25));
        }

        else {
            if (this.prefix.equals("Males")) {
                // energy
                this.energy = this.weight.multiply(BigDecimal.valueOf(15.91)).add(this.height.multiply(BigDecimal.valueOf(539.6)))
                        .multiply(BigDecimal.valueOf(1.11)).add(BigDecimal.valueOf(662 - 9.53 * this.age));
                // protein
                this.protein = this.weight.multiply(BigDecimal.valueOf(0.66/0.9)).multiply(BigDecimal.valueOf(1.25));
            }

            else {
                //energy
                this.energy = this.weight.multiply(BigDecimal.valueOf(9.36)).add(this.height.multiply(BigDecimal.valueOf(726)))
                        .multiply(BigDecimal.valueOf(1.12)).add(BigDecimal.valueOf(354 - 6.91 * this.age));
                // protein
                this.protein = this.weight.multiply(BigDecimal.valueOf(0.66/0.9)).multiply(BigDecimal.valueOf(1.25));
                // 생애단계별 추가필요량
                if (this.prefix.equals("Pregnancy")) {
                    // 임신 중기 기준. 초기: 0, 중기: 340, 말기: 450
                    // energy
                    this.energy = this.energy.add(BigDecimal.valueOf(340));
                    // protein
                    this.protein = this.protein.add(BigDecimal.valueOf(30));
                } else if (this.prefix.equals("Lactation")) {
                    // energy
                    this.energy = this.energy.add(BigDecimal.valueOf(340));
                    // protein
                    this.protein = this.protein.add(BigDecimal.valueOf(25));

                }
            }
        }

        // carbohydrates
        this.carbohydrate = this.energy.multiply(BigDecimal.valueOf(0.55/4));
        // fats
        this.fat = this.energy.multiply(BigDecimal.valueOf(0.25/9));
        // waters
        this.water = this.energy;
        // fibers
        this.fiber = this.energy.multiply(BigDecimal.valueOf(0.012));


    }


    public List<BigDecimal> DRICSVParse(String lifeStage, String path){
        /*
        path의 CSV파일 불러와서 user의 lifeStage에 맞는 Row 추출 후 otherDRI Return
         */
        CSVReader DRIReader = new CSVReader();
        DRIReader.setFilepath(path);
        List<List<String>> DRIList = DRIReader.readCSV();

        List<BigDecimal> otherDRI = new ArrayList<BigDecimal>();

        // User Life Stage 에 맞는 Row 찾기
        /*
        Columns
        Life Stage Group,Vitamin A (μg/d),Vitamin C (mg/d),Vitamin D (μg/d),Thiamin (mg/d),Riboflavin (mg/d),Niacin (mg/d),Calcium (mg/d),Iron (mg/d),Phosphorus (mg/d),Potassium (mg/d),Sodium (mg/d)
         */
        for (int i = 0; i < DRIList.size(); i++){
            if (DRIList.get(i).get(0).equals(lifeStage)){
                for (int j=1; j< DRIList.get(i).size(); j++){
                    BigDecimal BigDecimalDRI = new BigDecimal(DRIList.get(i).get(j));
                    otherDRI.add(BigDecimalDRI);
                }
            }
        }
        this.vitamin_a = otherDRI.get(0);
        this.vitamin_c = otherDRI.get(1);
        this.vitamin_d = otherDRI.get(2);
        this.thiamin = otherDRI.get(3);
        this.riboflavin = otherDRI.get(4);
        this.niacin = otherDRI.get(5);
        this.calcium = otherDRI.get(6);
        this.iron = otherDRI.get(7);
        this.phosphorus = otherDRI.get(8);
        this.potassium = otherDRI.get(9);
        this.sodium = otherDRI.get(10);

        return otherDRI;
    }


    public DRI DRICalc(Member member) {
        /*
        계산된 필수영양소 DRI와 다른 영양소 DRI를 테이블로 합쳐 DRI 객체 생성
        */

        // 필수영양소 외 다른 영양소는 테이블 참고
        calEssentialNutrients();
        List<BigDecimal> DRIList = DRICSVParse(this.lifeStage, "src/main/java/org/example/capstonenewri/Service/resources/Nutritional_Requirements_synced_table.csv");

        // TODO: Set DRI 작업 필요 -> DRI Class는 ERD DRI Table 형식을 따름
        DRI userDRI = DRI.builder().
                energy_kcal(this.energy).
                water_gram(this.water).
                protein_gram(this.protein).
                fat_gram(this.fat).
                ashcontent_gram(this.ash).
                carbohydrate_gram(this.carbohydrate).
                sugars_gram(this.sugar).
                dietary_fiber_gram(this.fiber).
                calcium_miligram(this.calcium).
                iron_miligram(this.iron).
                phosphorus_miligram(this.phosphorus).
                potassium_miligram(this.potassium).
                sodium_miligram(this.sodium).
                vitaminA_microgram(this.vitamin_a).
                retinol_microgram(this.retinol).
                betaCarotene_microgram(this.beta_carotene).
                thiamin_miligram(this.thiamin).
                riboflavin_miligram(this.riboflavin).
                niacin_miligram(this.niacin).
                vitaminC_miligram(this.vitamin_c).
                vitaminD_microgram(this.vitamin_d).
                cholesterol_miligram(this.cholesterol).
                saturated_fatty_acids_gram(this.saturated_fatty_acid).
                trans_fatty_acids_gram(this.trans_fatty_acid).
                member(member).build();
        return userDRI;
    }
}