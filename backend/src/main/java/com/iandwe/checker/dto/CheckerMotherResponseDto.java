package com.iandwe.checker.dto;

import com.iandwe.essential.domain.Essential;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@Builder
@NoArgsConstructor
public class CheckerMotherResponseDto {
    private Long essentialNum;

    private String title;

    private String description;

    private boolean complete;

    private String startTime;

    private String endTime;

    private String category;

    private String target;

    private Long babyNum;

    public static CheckerMotherResponseDto of(Essential essential, boolean isComplete, long baby){
        return CheckerMotherResponseDto.builder()
                .essentialNum(essential.getNum())
                .title(essential.getTitle())
                .description(essential.getDescription())
                .complete(isComplete)
                .startTime(essential.getStartTime())
                .endTime(essential.getEndTime())
                .category(essential.getCategory())
                .target(essential.getTarget())
                .babyNum(baby)
                .build();
    }
}
