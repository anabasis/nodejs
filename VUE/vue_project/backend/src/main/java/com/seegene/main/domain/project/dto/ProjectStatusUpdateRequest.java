package com.seegene.main.domain.project.dto;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import static io.swagger.v3.oas.annotations.media.Schema.RequiredMode.REQUIRED;

/**
 * ProjectCreateRequest
 * <PRE>
 * </PRE>
 *
 * @author : jyjung1@seegene.com
 * @History <PRE>
 * No  Date           Author            Desc
 * ---- ------------ ---------------- ------------------------------------
 * 1 2023-09-12        jyjung1        최초작성
 * </PRE>
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "프로젝트 상태코드 수정 Resquest Dto")
public class ProjectStatusUpdateRequest {

    @Schema(description = "프로젝트 상태 코드", example = "ONG",  allowableValues = {"ONG", "ABR", "CMP"}, requiredMode = REQUIRED)
    @NotBlank
    private String prjStsCd;

}
