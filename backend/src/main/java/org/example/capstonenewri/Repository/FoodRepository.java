package org.example.capstonenewri.Repository;

import org.example.capstonenewri.Dto.FoodNutritionDto;
import org.example.capstonenewri.Entity.Food;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface FoodRepository extends JpaRepository<Food, Long> {

    @Query("""
            select
                new org.example.capstonenewri.Dto.FoodNutritionDto(f.energy_kcal, f.water_gram, f.protein_gram, f.fat_gram,
                f.ashcontent_gram, f.carbohydrate_gram, f.sugars_gram, f.dietary_fiber_gram, f.calcium_miligram, f.iron_miligram,
                f.phosphorus_miligram, f.potassium_miligram, f.sodium_miligram, f.vitaminA_microgram, f.retinol_microgram,
                f.betaCarotene_microgram, f.thiamin_miligram, f.riboflavin_miligram, f.niacin_miligram, f.vitaminC_miligram, 
                f.vitaminD_microgram, f.cholesterol_miligram, f.saturated_fatty_acids_gram,
                f.trans_fatty_acids_gram)
            from Food f
            where f.food_name = :foodName  
    """)
    FoodNutritionDto findFoodByName(@Param("foodName") String foodName);

}
