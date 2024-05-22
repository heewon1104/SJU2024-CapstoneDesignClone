package org.example.capstonenewri.Repository;

import org.example.capstonenewri.Dto.ResponseRecipeDto;
import org.example.capstonenewri.Entity.Recipe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface RecipeRepository extends JpaRepository<Recipe, Long> {
    @Query("""
         select new org.example.capstonenewri.Dto.ResponseRecipeDto(r.rcp_nm, r.att_file_no_main)
         from Recipe r
         where r.id = :id
    """)
    public ResponseRecipeDto findRecipeById(@Param("id") Long id);
}
