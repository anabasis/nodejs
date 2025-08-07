package com.seegene.main.domain.project.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Id;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "note")
@Builder
@Data
public class Note {
    @Id
    private String id;
    private String fromUsrUid;
    private String toUsrUid;
    private Long projectNum;
    private Long procNum;
    private String contents;
    private boolean checked;
    private LocalDateTime crtDt;
    private String crtrUid;
    private LocalDateTime mdfDt;
    private String mdfrUid;
}
