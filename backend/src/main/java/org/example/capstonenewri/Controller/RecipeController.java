package org.example.capstonenewri.Controller;

import lombok.RequiredArgsConstructor;
import org.example.capstonenewri.Dto.ResponseRecipeDto;
import org.example.capstonenewri.Service.MyPageServiceImpl;
import org.example.capstonenewri.Service.RecipeServiceImpl;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@ResponseStatus(HttpStatus.OK)
@RestController
@RequestMapping("/api/recipe")
@RequiredArgsConstructor
public class RecipeController {
    private final RecipeServiceImpl recipeServiceImpl;
    private final MyPageServiceImpl myPageServiceImpl;

    @GetMapping("/{date}")
    public ResponseEntity<List<ResponseRecipeDto>> getTodayRecipes(Authentication authentication, @PathVariable("date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)LocalDate date){
        return recipeServiceImpl.findRecipeByDate(authentication.getName(), date);
    }

    @GetMapping("/instruction")
    public Map<String, Object> getInstruction(Authentication authentication){
        String instruction = myPageServiceImpl.getInstructionByMemberEmail(authentication.getName());

        Map<String, Object> response = new HashMap<>();
        response.put("instruction", instruction);

        return response;
    }
}
