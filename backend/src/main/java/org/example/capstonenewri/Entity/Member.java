package org.example.capstonenewri.Entity;

import jakarta.persistence.*;
import lombok.*;
import org.example.capstonenewri.Type.MemberGender;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.sound.sampled.AudioInputStream;
import java.time.LocalDateTime;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@Getter
@EntityListeners(AuditingEntityListener.class)
public class Member{

    @Id
    @GeneratedValue)
    @Column
    private Long id;

    private String name;
    private String email;
    private String password;
    private LocalDateTime birth;
    private MemberGender memberGender;


}
