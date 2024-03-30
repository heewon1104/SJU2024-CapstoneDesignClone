package org.example.capstonenewri.Entity;


import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;
import org.example.capstonenewri.Entity.Type.DietType;
import org.example.capstonenewri.Entity.Type.KoreanOrAll;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@Getter
public class Diet extends BaseEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "diet_id")
    private Long id;
    private String photoUrl; // 이렇게 하면 되나? - 파일 업로드

    @Enumerated(EnumType.STRING)
    private DietType diettype;

    @Enumerated(EnumType.STRING)
    private KoreanOrAll koreanOrAll;

    private String food;
    private String ingredients;

    @ManyToOne
    @JoinColumn(name = "member_id")
    @JsonBackReference
    private Member member;

    @OneToOne(mappedBy = "diet")
    private DietDiary dietDiary;

}
