'use client'

import { PopupAction } from '@type/mypage/popupAction'
/**
 * 화면: 마이페이지_회원 탈퇴_확인
 */

import { AlertType, api } from 'library'
import { useRouter } from 'next/navigation'
import { ButtonMui } from 'ui'

const SecessionConfirm = (props: PopupAction) => {
  const { open, close, setWithdrawalFlag } = props
  const router = useRouter()
  // const { alertAllClose } = useAlert()

  const handleAlertSuccessButton = () => {
    close()
    window.authKc.doLogout('/')
  }

  const modalComplete: AlertType = {
    icon: 'success',
    title: 'Withdrawal complete',
    isAllClose: true,
    // 최유희 :: 알럿 내, text title 추가
    textTitle: (
      <span>
        Withdrawal is complete.
        <br />
        Thank you for using our service.
      </span>
    ),
    content: (
      <div className="align center mt_30">
        <ButtonMui
          size="xlarge"
          onClick={() => {
            handleAlertSuccessButton()
          }}
        >
          OK
        </ButtonMui>
      </div>
    ),
  }

  const isCompleteWithdrawal = () => {
    api
      .post(`/mypage/withdrawal/modify`)
      .then((response) => {
        if (response.data.statusCode === 202108) {
          //프로젝트매니저일 경우 탈퇴불가
          const cannotWithdrawal: AlertType = {
            icon: 'warning',
            title: 'Cannot be withdrawn',
            isAllClose: true,
            textTitle: (
              <span>
                To withdraw service, you need to transfer the project
                <br />
                manager role to others.
              </span>
            ),
            content: (
              <div className="align center mt_30">
                <ButtonMui size="xlarge" type="outlined" onClick={() => router.push(`/mypage`)}>
                  Cancel
                </ButtonMui>
                <ButtonMui
                  size="xlarge"
                  onClick={() => {
                    router.push(`/project`)
                  }}
                >
                  Role Transfer
                </ButtonMui>
              </div>
            ),
          }

          open(cannotWithdrawal)
        } else {
          setWithdrawalFlag(false) //탈퇴완료 close x버튼 -> 로그인화면 이동
          open(modalComplete)
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <>
      {/* 최유희 :: 해당 텍스트 공통 규정에 맞춰서 수정했습니다.  */}
      {/* <p className="body1 typo500">탈퇴하시면, 개발 시스템에서 진행했던</p>
      <p className="body1 typo500">개발 프로젝트와 개발 문서를 확인할 수 없습니다.</p> */}
      {/* 팝업 내 버튼 공통 class 추가 */}
      <div className="align center mt_30">
        <ButtonMui size="xlarge" type="outlined" onClick={() => router.push(`/mypage`)}>
          Cancel
        </ButtonMui>
        <ButtonMui
          size="xlarge"
          onClick={() => {
            isCompleteWithdrawal()
            close()
          }}
        >
          Withdrawal
        </ButtonMui>
      </div>
    </>
  )
}

export default SecessionConfirm
