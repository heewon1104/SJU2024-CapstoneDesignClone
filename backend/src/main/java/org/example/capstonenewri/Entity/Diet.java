package org.example.capstonenewri.Entity;


import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;
import org.example.capstonenewri.Entity.Converter.StringListConverter;
import org.example.capstonenewri.Entity.Type.DietType;
import org.example.capstonenewri.Entity.Type.KoreanOrAll;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@Getter @Setter
public class Diet extends BaseEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "diet_id")
    private Long id;

    @Enumerated(EnumType.STRING)
    private DietType dietType;

    @Enumerated(EnumType.STRING)
    private KoreanOrAll koreanOrAll;

    private LocalDateTime intakeTime;
    private String food; // ai 서버의 결과를 받아올 것임.
    private String food_be; // ai 서버의 결과를 받아올 것임.
    @Convert(converter = StringListConverter.class)
    private List<String> ingredients; // ai 서버의 결과를 받아올 것임.
    private Integer amount; // ai 서버의 결과를 받아올 것임.

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    @JsonBackReference
    private Member member;

    @OneToOne(mappedBy = "diet", fetch = FetchType.LAZY)
    private DietDiary dietDiary;

}
