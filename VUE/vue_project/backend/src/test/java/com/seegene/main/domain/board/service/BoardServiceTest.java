// package com.seegene.main.domain.board.service;
//
// import com.seegene.main.domain.board.repository.TbdQnaRepository;
// import com.seegene.main.domain.user.repository.TusUsrRepository;
// import com.seegene.main.global.auth.PlatformUserDetails;
// import org.junit.jupiter.api.BeforeEach;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
// import org.springframework.boot.test.context.SpringBootTest;
// import org.springframework.test.context.ActiveProfiles;
//
// @SpringBootTest
// @AutoConfigureMockMvc
// @ActiveProfiles("local")
// class BoardServiceTest {
//     @Autowired
//     private BoardService boardService;
//
//     @Autowired
//     TusUsrRepository tusUsrRepository;
//
//     PlatformUserDetails userDetails;
//     @Autowired
//     private TbdQnaRepository tbdQnaRepository;
//
//     @BeforeEach
//     void setup(){
// //        userDetails = new PlatformUserDetails(tusUsrRepository.findByEmlId("seegene1@seegene.com")
// //                .map(
// //                        TusUsr::getUsrUid).orElseGet(()->null));
// //        SecurityContextHolder.getContext().setAuthentication(new UsernamePasswordAuthenticationToken(userDetails, null, null));
//     }
// //    @DisplayName("[IFM023]Qna를 등록")
// //    @Transactional
// //    @Test
// //    void createQna() {
// //        QnaRequest request = QnaRequest.builder()
// //                .type("QT1")
// //                .category("Service Main")
// //                .module("Account")
// //                .status("WFR")
// //                .title("등록 테스트")
// //                .content("등록 내용 테스트")
// //                .openLevel("PRV")
// //                .qnaAttachmentRequests(new ArrayList<>())
// //                .build();
// //
// //        boardService.createQna(userDetails, request);
// //        TbdQna byTitle = boardService.findByTitle(request.getTitle());
// //
// //        assertEquals(byTitle.getInqrTitl(), request.getTitle());
// //
// //
// //    }
// }