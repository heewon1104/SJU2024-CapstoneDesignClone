package org.example.capstonenewri.Service;

import org.example.capstonenewri.Dto.ResponseRecipeDto;
import org.springframework.http.ResponseEntity;

import java.time.LocalDate;
import java.util.List;

public interface RecipeService {
    public ResponseEntity<List<ResponseRecipeDto>> findRecipeByDate(String email, LocalDate date);
}
