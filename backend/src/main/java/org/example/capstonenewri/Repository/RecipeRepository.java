package org.example.capstonenewri.Repository;

import org.example.capstonenewri.Dto.ResponseRecipeDto;
import org.example.capstonenewri.Entity.Recipe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RecipeRepository extends JpaRepository<Recipe, Long> {
    @Query("""
         select new org.example.capstonenewri.Dto.ResponseRecipeDto(r.id, r.rcp_nm, r.att_file_no_main, r.rcp_parts_dtls, r.rcp_na_tip,
         r.manual01, r.manual02, r.manual03, r.manual04, r.manual05, r.manual06,
         r.manual_img01, r.manual_img02, r.manual_img03, r.manual_img04, r.manual_img05, r.manual_img06,
         r.rcp_pat2, r.rcp_way2)
         from Recipe r
         where r.id IN :ids
    """)
    public List<ResponseRecipeDto> findRecipesByIds(@Param("ids") List<Long> ids);
}
