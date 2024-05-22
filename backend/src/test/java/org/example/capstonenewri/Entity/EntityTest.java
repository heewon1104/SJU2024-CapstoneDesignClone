package org.example.capstonenewri.Entity;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.example.capstonenewri.Dto.ResponseRecipeDto;
import org.example.capstonenewri.Repository.DietRepository;
import org.example.capstonenewri.Repository.RecipeRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Commit;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional @Commit
class EntityTest {

    @PersistenceContext
    EntityManager em;
    @Autowired
    DietRepository dietRepository;
    @Autowired
    RecipeRepository recipeRepository;

    @Test
    void find(){


        // Given
        Long dietId = 1L;
        String expectedIngredients = "[후추, 기름, 설탕]"; // 실제 데이터베이스에 저장된 값을 기대 값으로 설정

        // When
        Optional<Diet> optionalDiet = dietRepository.findById(dietId);

        // Then
        assertTrue(optionalDiet.isPresent(), "Diet should be found with ID " + dietId);
        optionalDiet.ifPresent(diet -> {
            assertEquals(expectedIngredients, diet.getIngredients(), "Ingredients do not match expected");
        });
    }

    @Test
    void recipes(){
        ResponseRecipeDto recipeById = recipeRepository.findRecipeById(1L);
        System.out.println("recipeById = " + recipeById);
    }

}