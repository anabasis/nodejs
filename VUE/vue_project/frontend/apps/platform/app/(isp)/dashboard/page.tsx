'use client'

import { useCallback, useEffect, useState } from 'react'

/**
 * 화면: DB.1 개발자 대시보드
 * 경로: /dashboard
 * 기능:
 * 1. 업데이트 소식 (carousel)
 * 2. 최근 방문한 페이지 리스트
 * 3. 즐겨찾기 툴/웹 CRUD (+ 팝업)
 * 4. Footer (컴포넌트로 기본 layout에 들어갈 예정)
 */

export default function Dashboard() {
  const [noticeList, setNoticeList] = useState()
  const [visitedPages, setVisitedPages] = useState()

  const getRecentVisits = () => {
    /* Get (최근 본 페이지)
    - parameter: userid
    - response: {projectTitle, breadcrumb string, accessTime, projectId or LinkURL}
    */
    // setVisitedPages();
  }

  const getNoticeList = () => {
    /* Get (공지사항)
    Conditions
      - 최대 5개 게시글 및 게시 일자 노출
    Paramter: none
    Response: 노출될 recent 공지 data (status, title text, date, 공지 글 id OR link) 
  */
  }

  const handleNoticeRolling = () => {
    // 몇초에 한번씩 노출될 공지사항 변경
  }

  /* 
    몇분전, 몇시간전, 몇일전, 몇주전.. 계산은 hook function으로 뺄 예정
  */

  return (
    <>
      <>
        {/* 프로젝트 새 소식 BLOCK*/}

        {/* 즐겨찾기 BLOCK*/}

        {/* 공지사항 BLOCK */}
        <>
          <>
            <>
              <>{/* status */}</>
              <>{/* 공지 title */}</>
            </>

            <>{/* 날짜 */}</>
          </>
        </>
      </>
      <>
        {/* 최근 본 페이지 BLOCK */}

        <>
          <>
            <>{/* image */}</>
            <>
              <>{/* 몇분전, 몇시간전, 몇일전,... etc. */}</>
              <>{/* project title */}</>
            </>
          </>
        </>
      </>
    </>
  )
}

function MyUpdates() {
  const [updates, setUpdates] = useState()

  /* 
    - ??? 데이터가 없을 때 카테고리와 데이터가 존재할 때의 카테고리가 달라서, description이 확실해 지는대로 수정 예정
    ***  예전 comment  ***
    카테고리 버튼 텍스트는 업데이트 소식이 존재하는 카테고리만 보여주는 것 같다. 
    어떤 카테고리가 존재하는지는 API를 통해 전달 받거나, 
    아니면 프론트단에서 소식리스트안 소식 type을 훑어서 어떤 카테고리가 존재하는지 확인 후 보여주는 쪽으로 가야할 것 같다. 
  */

  const isCardOverFour = false // or true
  /*
    카드 플립 버튼 & 카드 페이지네이션
    - 카드가 4개 이상일 때 보이도록 한다. 
    - 카드 페이지네이션을 클릭했을 때도 페이지 이동이 가능해야한다. 
  */

  const getMyUpdates = (category?) => {
    /* Get Request (새 소식)
    - parameter: userid, category?
    - response: 내 소식 data (프로젝트 및 리퀘스트 title + contents + 해당페이지로 갈수있는 URL? id?, 소식 category?)
    */
    // setUpdates()
  }

  const handleCategoryButtonClick = (event) => {
    /* 
      선택한 category에 해당하는 업데이트 소식을 가져온다.
    */
  }

  return (
    <>
      <>{/* 프로젝트 새소식 Label + 프로젝트 소식 갯수 badge */}</>

      <>
        <>{/* MyUpdate category buttons: All, Project, Request, Member */}</>
        <>
          {/* isCardOverFour && */}
          {/* show carousel page navigator < > */}
        </>
      </>

      <>
        {/* 최신 소식 카드 Carousel*/}
        <>
          {/* <Link> 카드 구조 
          - static image
          - notice 종류? 코드에 따라 달라지는 image
          - project title
          - 소식 내용
          - update issue date & (몇분전, 몇시간전, 몇일전 ..) 
        */}
        </>
      </>
    </>
  )
}

function MyFavorite() {
  const getMyFavorite = () => {
    /* Get (내 즐겨찾기)
    - parameter: userid
    - response: 내 즐겨찾기 tool (이름 & 링크) & 웹사이트 링크 (이름 & 링크)
    */
  }

  const handleAddButtonClick = (event) => {
    // event.value는 tool의 추가 버튼인지 web의 추가 버튼인지 판별값
    // popup open시 어떤 탭을 열어야할지 판단하는 값으로 넘길 예정
  }

  return (
    <>
      {/* Favorite 'TOOLS' Block */}
      <>
        <>{/* Label */}</>

        <>
          {/* Tools List (<Link>) */}
          {/* add button */}
        </>
      </>

      {/* Favorite 'WEB' Block 
          - 새탭에 사용자가 클릭한 즐겨찾기 웹 열기
      */}
      <>
        <>{/* Label */}</>

        <>
          {/* WebLink List */}
          {/* add button */}
        </>
      </>

      {/* more button Block*/}
      <>{/* more button */}</>
    </>
  )
}
