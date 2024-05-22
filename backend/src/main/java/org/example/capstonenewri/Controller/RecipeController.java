package org.example.capstonenewri.Controller;

import lombok.RequiredArgsConstructor;
import org.example.capstonenewri.Dto.ResponseRecipeDto;
import org.example.capstonenewri.Service.RecipeServiceImpl;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@ResponseStatus(HttpStatus.OK)
@RestController
@RequestMapping("/api/recipe")
@RequiredArgsConstructor
public class RecipeController {
    private final RecipeServiceImpl recipeServiceImpl;

    @GetMapping("/{date}")
    public ResponseEntity<List<ResponseRecipeDto>> getTodayRecipes(Authentication authentication, @PathVariable("date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)LocalDate date){
        return recipeServiceImpl.findRecipeByDate(authentication.getName(), date);
    }
}
