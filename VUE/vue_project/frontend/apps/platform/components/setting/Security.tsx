'use client'

import { ContentBox, BoxLinkItem, TooltipHover, Icons, BoxLinkList } from 'ui'

export default function Security() {
  return (
    <ContentBox>
      <div className="cont_title_box">
        <p className="title1">2단계 인증</p>
        <p className="body2">
          2단계 인증을 통해 개인 정보가 비공개로 안전하게 보호합니다. <br />
          Development System 계정에 로그인할 때 추가 보안 조치를 적용하여 계정을 보호하세요.
        </p>
      </div>
      <BoxLinkList>
        <BoxLinkItem
          label={
            <p className="align">
              인증OTP 앱으로 인증
              <TooltipHover>
                <span>TBD.. 디스크립션 없습니다.. </span>
              </TooltipHover>
            </p>
          }
          action={
            <button onClick={() => {}}>
              <Icons.BoxListArrowIcon />
            </button>
          }
        />
        <BoxLinkItem
          label={
            <p className="align">
              이메일 로그인 인증
              <TooltipHover>
                <span>TBD.. 디스크립션 없습니다.. </span>
              </TooltipHover>
            </p>
          }
          action={
            <button onClick={() => {}}>
              <Icons.BoxListArrowIcon />
            </button>
          }
        />
      </BoxLinkList>
    </ContentBox>
  )
}
