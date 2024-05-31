package org.example.capstonenewri.Service;

import lombok.RequiredArgsConstructor;
import org.example.capstonenewri.Dto.ResponseRecipeDto;
import org.example.capstonenewri.Dto.ResponseRecipeRecommendationDto;
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
import java.util.stream.Collectors;

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

        List<ResponseRecipeDto> recipes = findRecipesByIds(dayDiaryOptional.get().getRecipes());
        return ResponseEntity.ok(recipes);
    }

    private List<ResponseRecipeDto> findRecipesByIds(List<ResponseRecipeRecommendationDto.RecipeDetail> recipeDetails){
        List<Long> recipeIds = recipeDetails.stream()
                .map(ResponseRecipeRecommendationDto.RecipeDetail::getRow)
                .collect(Collectors.toList());
        System.out.println("recipes = " + recipeIds.toString()); // 디버깅 문구

        List<ResponseRecipeDto> recipes = recipeRepository.findRecipesByIds(recipeIds);
        if (recipes.isEmpty()) {
            return List.of(new ResponseRecipeDto("No Recipe Found"));
        }

        // 데이터 강조 로직
        recipes.forEach(recipe -> {
            // Null 체크 및 빈 문자열 대입
            recipe.setAtt_file_no_main(Optional.ofNullable(recipe.getAtt_file_no_main()).orElse(""));
            recipe.setRcp_parts_dtls(Optional.ofNullable(recipe.getRcp_parts_dtls()).orElse(""));
            recipe.setRcp_na_tip(Optional.ofNullable(recipe.getRcp_na_tip()).orElse(""));
            recipe.setManual01(Optional.ofNullable(recipe.getManual01()).orElse(""));
            recipe.setManual02(Optional.ofNullable(recipe.getManual02()).orElse(""));
            recipe.setManual03(Optional.ofNullable(recipe.getManual03()).orElse(""));
            recipe.setManual04(Optional.ofNullable(recipe.getManual04()).orElse(""));
            recipe.setManual05(Optional.ofNullable(recipe.getManual05()).orElse(""));
            recipe.setManual06(Optional.ofNullable(recipe.getManual06()).orElse(""));
            recipe.setManual_img01(Optional.ofNullable(recipe.getManual_img01()).orElse(""));
            recipe.setManual_img02(Optional.ofNullable(recipe.getManual_img02()).orElse(""));
            recipe.setManual_img03(Optional.ofNullable(recipe.getManual_img03()).orElse(""));
            recipe.setManual_img04(Optional.ofNullable(recipe.getManual_img04()).orElse(""));
            recipe.setManual_img05(Optional.ofNullable(recipe.getManual_img05()).orElse(""));
            recipe.setManual_img06(Optional.ofNullable(recipe.getManual_img06()).orElse(""));
            recipe.setRcp_pat2(Optional.ofNullable(recipe.getRcp_pat2()).orElse(""));
            recipe.setRcp_way2(Optional.ofNullable(recipe.getRcp_way2()).orElse(""));

            recipeDetails.stream()
                    .filter(detail -> detail.getRow().equals(recipe.getId()))
                    .findFirst()
                    .ifPresent(detail ->{
                        if(!detail.getRecipe_parts_dtls().isEmpty() && !recipe.getRcp_parts_dtls().isEmpty() && recipe.getRcp_parts_dtls().contains(detail.getRecipe_parts_dtls())){
                            String emphasizedText = "==" + detail.getRecipe_parts_dtls() + "==";
                            recipe.setRcp_parts_dtls(recipe.getRcp_parts_dtls().replace(detail.getRecipe_parts_dtls(), emphasizedText));
                        }
                        if(!detail.getRecipe_na_tip().isEmpty() &&!recipe.getRcp_na_tip().isEmpty() && recipe.getRcp_na_tip().contains(detail.getRecipe_na_tip())){
                            String emphasizedText = "==" + detail.getRecipe_na_tip() + "==";
                            recipe.setRcp_na_tip(recipe.getRcp_na_tip().replace(detail.getRecipe_na_tip(), emphasizedText));
                        }
                    });
            recipe.setMessage("Recipe Found");
        });
        return recipes;
    }
}
