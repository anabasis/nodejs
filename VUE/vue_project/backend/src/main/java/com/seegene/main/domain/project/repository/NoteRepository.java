package com.seegene.main.domain.project.repository;

import com.seegene.main.domain.project.entity.Note;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface NoteRepository extends MongoRepository<Note, String>{
    List<Note> findByProjectNumAndToUsrUidAndCrtDtBetweenOrderByCrtDtDesc(Long prjNum, String usrUid, LocalDateTime convertStartLocalDateTime, LocalDateTime convertEndLocalDateTime);
}
