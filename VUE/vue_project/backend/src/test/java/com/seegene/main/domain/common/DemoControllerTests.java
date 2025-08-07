// package com.seegene.main.domain.common;
//
//
// import com.seegene.main.domain.demo.service.DemoService;
//
// import lombok.NoArgsConstructor;
//
// import org.junit.jupiter.api.Disabled;
// import org.junit.jupiter.api.DisplayName;
// import org.junit.jupiter.api.Test;
// import org.mockito.ArgumentCaptor;
// import org.mockito.BDDMockito;
// import org.mockito.Mock;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.beans.factory.annotation.Qualifier;
// import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
// import org.springframework.boot.test.context.SpringBootTest;
// import org.springframework.http.MediaType;
// import org.springframework.security.access.prepost.PreAuthorize;
// import org.springframework.security.authentication.TestingAuthenticationToken;
// import org.springframework.security.core.Authentication;
// import org.springframework.test.context.ActiveProfiles;
// import org.springframework.test.web.servlet.MockMvc;
// import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
//
//
// import java.util.ArrayList;
// import java.util.List;
//
// import static org.assertj.core.api.Assertions.assertThat;
// import static org.junit.jupiter.api.Assertions.*;
// import static org.mockito.ArgumentMatchers.any;
// import static org.mockito.Mockito.*;
// import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
// import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
// import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
//
// /*
//     TDD Sample
//     DemoController에 대한 API TDD 진행
//  */
//
//
// /*
//  TDD 샘플용
//  */
// @NoArgsConstructor
// class Member{
//     Member(Long id, String name){
//         this.id = id;
//         this.name = name;
//     }
//     private Long id;
//     private String name;
//
//     public String getName() {
//         return name;
//     }
//     public Long getId(){
//         return id;
//     }
// }
//
// /*
//  TDD 샘플용
//  */
// class MemberService{
//     public int save(List<Member> list){
//         return 1;
//     }
//     public List<Member> getList(){
//         return null;
//     }
//
//     public Member getMember(Long id){
//         return null;
//     }
//     public void save(Member member){
//     }
//     public void modify(Member member){
//     }
//     public void delete(Long id){
//     }
// }
//
// @AutoConfigureMockMvc
// @ActiveProfiles("local")
// @SpringBootTest
// public class DemoControllerTests {
//
//     @Mock
//     DemoService demoService;
//
//     @Mock
//     MemberService memberService;
//
//     @Autowired
//     private MockMvc mockMvc;
//
//
//     @DisplayName("어드민 조회 테스트")
//     @Test
//     @Disabled
//     @PreAuthorize("hasRole('ADMIN')")
//     void getAdminTest() throws Exception{
//         Authentication authentication =
//                 new TestingAuthenticationToken("admin", "2", "ROLE_ADMIN");
//         mockMvc.perform(MockMvcRequestBuilders.get("/demo/admin", authentication)
//                         .contentType(MediaType.APPLICATION_JSON)
//                 )
//                 .andExpect(status().isOk())
//                 .andDo(print());
//     }
//
//     @DisplayName("전체멤버 조회 테스트")
//     @Test
//     void getMemberList(){
//         //given
//         List<Member> list = new ArrayList<>();
//         list.add(new Member(1L,"엘리스"));
//         list.add(new Member(2L,"관리자"));
//         // when
//         when(memberService.getList()).thenReturn(list);
//
//         // then
//         assertThat(memberService.getList().size()).isEqualTo(2);
//         assertEquals("엘리스", memberService.getList().get(0).getName());
//     }
//
//     @DisplayName("멤버 조회 테스트")
//     @Test
//     void getMember(){
//         // when
//         when(memberService.getMember(any(Long.class))).thenReturn(new Member(1L, "관리자"));
//         // then
//         assertEquals("관리자", memberService.getMember(1L).getName());
//     }
//
//     @DisplayName("맴버 등록 테스트")
//     @Test
//     void insertTest(){
//         // given
//         assertNull(memberService.getMember(3L));
//         Member member = new Member(3L, "사용자추가");
//         memberService.save(member);
//         // when
//         when(memberService.getMember(any(Long.class))).thenReturn(member);
//
//         if(memberService.getMember(3L) == null)
//             fail("등록 실패");
//         // then
//         assertThat(memberService.getMember(3L)).isEqualTo(member);
//     }
//
//     @DisplayName("등록후 메일 발송")
//     @Test
//     void sandMailTest(){
//        //  EmailSenderDto emailSenderDto = EmailSenderDto.builder()
//        //      .from("test@mz.co.kr")
//        //      .to("go@mz.co.kr")
//        //      .subject("타이틀")
//        //      // .content("내용")
//        //      .build();
//        //  demoService.send(emailSenderDto);
//        //  ArgumentCaptor<EmailSenderDto> captor =
//        //          ArgumentCaptor.forClass(EmailSenderDto.class);
//        //
//        //  BDDMockito.then(demoService)
//        //          .should().send(captor.capture());
//        //
//        //  String realEmail = captor.getValue().getTo();
//        //
//        //  System.out.println("realEamil["+realEmail);
//        // //
//        //  assertEquals("test@mz.co.kr", realEmail);
//     }
//
//
//     @DisplayName("맴버명 수정 테스트")
//     @Test
//     void updateTest() {
//         memberService.save(new Member(1L, "user"));
//         // when
//         doReturn(new Member(1L, "user") ).when(memberService).getMember(1L);
//         RuntimeException result =  assertThrows(
//                 RuntimeException.class, ()-> memberService.modify(new Member(1L, "usermodify"))
//         );
//         // 의미 없다..
//
//         assertThat(result.getMessage()).isEmpty();
//         assertThat(memberService.getMember(1L).getName()).isEqualTo("usermodify");
//     }
//
//     @DisplayName("맴버 삭제 테스트")
//     @Test
//     void remove() throws Exception {
//         doNothing().when(memberService).delete(1L);
//
//         // 추후 MVC 삭제 테스트 진행
// //        this.mockMvc.perform(delete("/{id}", 1L)).
//   //              andExpect(status().isForbidden());
//         // 만약 삭제가 호출 되었다면.
//         memberService.delete(1L);
//         // 실행 확인
//         verify(memberService, times(1)).delete(1L);
//         // 삭제 확인
//         assertNull(memberService.getMember(1L));
//     }
//
//     /*
//     @Test
//     @Disabled("Academy 테이블이 구성/생성 되지 않았기 때문에 테스트 하지 않는다.")
//     @DisplayName("기본 기능 확인")
//     void query_dsl_기본기능_확인(){
//
//         Exception exception = assertThrows(Exception.class, ()->
//             academyRepository.save(new Academy("관리자", "admin@kk.co.kr"))
//         );
//
//         assertThat( exception.getMessage()).isNull();
//
//         List<Academy> result = academyRepository.findByName("관리자");
//         assertThat(result.size()).isEqualTo(1);
//         assertThat(result.get(0).getName()).isEqualTo("관리자");
//     }
//     */
//
//     /*
//     전체 회원의 정보 리스트를 리턴한다.
//     @DisplayName("전체멤버 조회 테스트")
//     @Test
//     void getMemberInfoTest(){
//         List<DemoInfoDto> result = new ArrayList();
//         result.add(DemoInfoDto.builder()
//                 .username("admin")
//                 .nickname("관리자")
//                 .password("1234")
//                 .build());
//         result.add(DemoInfoDto.builder()
//                 .username("user1")
//                 .nickname("사용자1")
//                 .password("1234")
//                 .build());
//
//         when(demoService.getDemoInfoAll()).thenReturn(result);
//         //given(demoService.getDemoInfoAll()).willCallRealMethod();
//         assertEquals(result, demoService.getDemoInfoAll());
//     }
//
//
//     전체 회원의 정보 리스트를 리턴한다.
//
//     @DisplayName("회원 아이디 조회")
//     @Test
//     void getMemberInfo(){
//         Demo demo = new Demo();
//         demo.setId(1L);
//         demo.setUsername("admin");
//         demo.setNickname("관리자");
//         demo.setPassword("1234");
//         // not null 확인
//         assertNotEquals(demoService,null);
//         when(demoService.getDemoInfoById(1L)).thenReturn(DemoInfoDto.builder().
//                 username("admin").nickname("관리자").password("1234").build());
//         when(demoRepository.findById(1L)).thenReturn(Optional.of(demo));
//         DemoInfoDto result = demoService.getDemoInfoById(1L);
//         assertEquals("admin", result.username());
//     }
//
//     @DisplayName("닉네임 변경 테스트")
//     @Test
//     void updateNickname()throws Exception{
//         // given
//         UpdateNicknameRequest updateNicknameRequest =
//                 new UpdateNicknameRequest(
//                         "사용자", "닉네임", "닉네임1"
//                 );
//         // excute
//         mockMvc.perform(MockMvcRequestBuilders.put("/{id}",
//                                         1L, updateNicknameRequest
//                                 )
//                                 .contentType(MediaType.APPLICATION_JSON)
//                                 .accept(MediaType.APPLICATION_JSON)
//                 ).andExpect(status().isOk())
//                 .andExpect(status().isForbidden()) // auth
//                 .andDo(print());
//     }
//
//     @DisplayName("삭제 테스트")
//     @Test
//     void removeTest()throws Exception{
//         // given
//         UserInfoRecord userInfoRecord = new UserInfoRecord(
//                 "123455", "user1", "사용자",
//                 "kk@seegene.co.kr", WorkCode.WORKING, "admin"
//         );
//         // when
//         demoService.createUser(userInfoRecord);
//         // excute
//         mockMvc.perform(MockMvcRequestBuilders.delete("/{id}","123455")
//                         .contentType(MediaType.APPLICATION_JSON)
//                         .accept(MediaType.APPLICATION_JSON)
//                 )
//                 .andExpect(status().isForbidden()) // auth
//                 .andExpect(status().isOk())
//                 .andDo(print());
//     }
//     */
// }
//
//
