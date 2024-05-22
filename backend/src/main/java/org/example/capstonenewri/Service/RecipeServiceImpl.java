package org.example.capstonenewri.Service;

import lombok.RequiredArgsConstructor;
import org.example.capstonenewri.Dto.ResponseRecipeDto;
import org.example.capstonenewri.Entity.DayDiary;
import org.example.capstonenewri.Entity.Member;
import org.example.capstonenewri.Repository.DayDiaryRepository;
import org.example.capstonenewri.Repository.MemberRepository;
import org.example.capstonenewri.Repository.RecipeRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class RecipeServiceImpl implements RecipeService{

    private final MemberRepository memberRepository;
    private final DayDiaryRepository dayDiaryRepository;
    private final RecipeRepository recipeRepository;

    @Override
    public ResponseEntity<List<ResponseRecipeDto>> findRecipeByDate(String email, LocalDate date) {
        Optional<Member> memberOptional = memberRepository.findByEmail(email);
        if (!memberOptional.isPresent()) { // 오류처리
            List<ResponseRecipeDto> response = new ArrayList<>();
            response.add(new ResponseRecipeDto("해당 이메일을 가진 회원을 찾을 수 없습니다."));
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
        Optional<DayDiary> dayDiaryOptional = dayDiaryRepository.findByMemberAndDate(memberOptional.get(), date);
        if (!dayDiaryOptional.isPresent()) { // 오류처리
           List<ResponseRecipeDto> response = new ArrayList<>();
           response.add(new ResponseRecipeDto("No Record"));
           return ResponseEntity.status(HttpStatus.OK).body(response);
        }

        List<Long> recipes = dayDiaryOptional.get().getRecipes(); // daydiary의 레시피 필드
        System.out.println("recipes = " + recipes); // 디버깅 문구

        List<ResponseRecipeDto> responseRecipeDtoList = new ArrayList<>();
        for (Long recipeId : recipes){
            ResponseRecipeDto recipeDto = recipeRepository.findRecipeById(recipeId);
            if (recipeDto == null){
                responseRecipeDtoList.add(new ResponseRecipeDto("Recipe Not Found for ID: " + recipeId));
            }else{
                recipeDto.setMessage("Recipe Found");
                responseRecipeDtoList.add(recipeDto);
            }
        }

        if (responseRecipeDtoList.isEmpty()){
            responseRecipeDtoList.add(new ResponseRecipeDto("No Recipes Found"));
        }

        return ResponseEntity.ok(responseRecipeDtoList);
    }
}
