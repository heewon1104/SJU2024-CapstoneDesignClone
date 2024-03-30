package org.example.capstonenewri.Repository;

import org.example.capstonenewri.Entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;


public interface MemberRepository extends JpaRepository<Member, Long> {

}
