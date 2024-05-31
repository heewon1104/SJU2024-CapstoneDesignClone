package org.example.capstonenewri.Entity.Converter;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.example.capstonenewri.Dto.ResponseRecipeRecommendationDto;

import java.util.List;
import java.io.IOException;

@Converter
public class RecipeListConverter implements AttributeConverter<List<ResponseRecipeRecommendationDto.RecipeDetail>, String> {

    private final static ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public String convertToDatabaseColumn(List<ResponseRecipeRecommendationDto.RecipeDetail> attribute) {
        try {
            return objectMapper.writeValueAsString(attribute);
        } catch (IOException e) {
            throw new RuntimeException("JSON writing error", e);
        }
    }

    @Override
    public List<ResponseRecipeRecommendationDto.RecipeDetail> convertToEntityAttribute(String dbData) {
        try {
            return objectMapper.readValue(dbData, new TypeReference<List<ResponseRecipeRecommendationDto.RecipeDetail>>(){});
        } catch (IOException e) {
            throw new RuntimeException("JSON reading error", e);
        }
    }
}
