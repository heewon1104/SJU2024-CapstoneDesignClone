package org.example.capstonenewri.Dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.example.capstonenewri.Entity.Type.DietType;
import org.example.capstonenewri.Entity.Type.KoreanOrAll;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class RequestSaveRecordDto {
    private DietType dietType;
    private KoreanOrAll koreanOrAll;
    private LocalDateTime intakeTime;
    private String food;
    private List<String> ingredients;
    private Integer amount;
    private String email; // 이메일을 이용해 select 해서 Member entity와 연결시킬 것임.

    @Builder
    public RequestSaveRecordDto(DietType dietType, KoreanOrAll koreanOrAll, LocalDateTime intakeTime,
                               String food, List<String> ingredients, Integer amount, String email){
        this.dietType = dietType;
        this.koreanOrAll = koreanOrAll;
        this.intakeTime = intakeTime;
        this.food = food;
        this.ingredients = ingredients;
        this.amount = amount;
        this.email = email;
    }
}
