import React from 'react'
import styled from '@emotion/styled'
import { TooltipHover } from '@ui/index'

// 에디팅이 가능한 페이지 하단 컨텐츠 버튼 그룹
interface SvgIconProps {
  className?: string
}
const Box = styled.div`
  width: 470px;
  min-height: 348px;
  margin-top: auto;
  display: flex;
  position: relative;
  flex-direction: column;
  border-radius: 16px;
  padding: 24px;
  box-sizing: border-box;
  justify-content: space-between;
`

const Icon: { [key: string]: React.ReactElement<SvgIconProps> } = {
  ready: (
    <svg width="54" height="54" viewBox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="27" cy="27" r="27" fill="white" fillOpacity="0.25" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M39.8206 27.6053C39.7808 28.4635 38.9685 29.0352 38.1213 28.8922L35.8779 28.5137C35.1685 28.394 34.7013 27.7197 34.7013 27.0003C34.7013 26.2809 35.1685 25.6067 35.8779 25.487L38.1213 25.1084C38.9685 24.9655 39.7808 25.5372 39.8206 26.3954C39.8299 26.5959 39.8346 26.7975 39.8346 27.0003C39.8346 27.2031 39.8299 27.4048 39.8206 27.6053ZM36.4931 18.363C37.0715 18.9983 36.9009 19.977 36.2007 20.4748L34.3445 21.7942C33.7591 22.2103 32.9539 22.0634 32.446 21.5556C31.9382 21.0478 31.7913 20.2426 32.2074 19.6572L33.5269 17.8009C34.0246 17.1007 35.0033 16.9301 35.6386 17.5085C35.9366 17.7799 36.2218 18.065 36.4931 18.363ZM27.6062 14.181C28.4644 14.2208 29.0361 15.0332 28.8932 15.8803L28.5147 18.1237C28.395 18.8331 27.7207 19.3003 27.0013 19.3003C26.2819 19.3003 25.6076 18.8331 25.4879 18.1237L25.1094 15.8803C24.9665 15.0332 25.5382 14.2208 26.3964 14.181C26.5968 14.1717 26.7985 14.167 27.0013 14.167C27.2041 14.167 27.4058 14.1717 27.6062 14.181ZM18.364 17.5085C18.9993 16.9301 19.978 17.1007 20.4757 17.8009L21.7952 19.6572C22.2113 20.2425 22.0644 21.0478 21.5566 21.5556C21.0487 22.0634 20.2435 22.2103 19.6581 21.7942L17.8019 20.4748C17.1017 19.977 16.9311 18.9983 17.5095 18.363C17.7808 18.065 18.066 17.7799 18.364 17.5085ZM15.8813 25.1084C15.0341 24.9655 14.2218 25.5372 14.182 26.3954C14.1727 26.5959 14.168 26.7975 14.168 27.0003C14.168 27.2031 14.1727 27.4048 14.182 27.6053C14.2218 28.4635 15.0341 29.0352 15.8813 28.8922L18.1247 28.5137C18.8341 28.394 19.3013 27.7197 19.3013 27.0003C19.3013 26.2809 18.8341 25.6067 18.1247 25.487L15.8813 25.1084ZM17.5095 35.6376C16.9311 35.0024 17.1017 34.0236 17.8019 33.5259L19.6581 32.2065C20.2435 31.7904 21.0487 31.9372 21.5566 32.445C22.0644 32.9529 22.2113 33.7581 21.7952 34.3435L20.4757 36.1997C19.978 36.8999 18.9993 37.0705 18.364 36.4921C18.066 36.2208 17.7808 35.9356 17.5095 35.6376ZM26.3964 39.8197C25.5382 39.7798 24.9665 38.9675 25.1094 38.1204L25.4879 35.8769C25.6076 35.1675 26.2819 34.7003 27.0013 34.7003C27.7207 34.7003 28.395 35.1675 28.5147 35.8769L28.8932 38.1204C29.0361 38.9675 28.4644 39.7798 27.6062 39.8197C27.4058 39.829 27.2041 39.8337 27.0013 39.8337C26.7985 39.8337 26.5968 39.829 26.3964 39.8197ZM35.6386 36.4921C35.0033 37.0705 34.0246 36.8999 33.5269 36.1997L32.2074 34.3435C31.7913 33.7581 31.9382 32.9529 32.446 32.445C32.9539 31.9372 33.7591 31.7904 34.3445 32.2065L36.2007 33.5259C36.9009 34.0236 37.0715 35.0024 36.4931 35.6376C36.2218 35.9356 35.9366 36.2208 35.6386 36.4921Z"
        fill="white"
      />
    </svg>
  ),
  running: (
    <svg width="54" height="54" viewBox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="27" cy="27" r="27" fill="white" fillOpacity="0.25" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M28.5329 34.9948C24.3743 35.618 20.9261 33.2549 20.4214 30.2191C20.2938 29.4514 19.6977 28.8283 18.9019 28.6307C18.1061 28.4331 17.261 28.6984 16.7477 29.307L14.1811 32.3499C13.4662 33.1974 13.6134 34.4304 14.5097 35.1039C15.406 35.7774 16.7121 35.6363 17.427 34.7888L17.7593 34.3947C20.0667 37.7529 24.6062 39.5513 29.1766 38.8665C35.3545 37.9408 38.0849 33.3506 38.7548 30.4719C39.0009 29.4143 38.2927 28.37 37.173 28.1394C36.0533 27.9089 34.946 28.5794 34.6999 29.6371C34.2709 31.4803 32.5065 34.3995 28.5329 34.9948Z"
        fill="white"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M25.497 19.0007C29.64 18.3799 33.0803 20.7382 33.5847 23.7726C33.7124 24.5405 34.3089 25.1638 35.105 25.3611C35.9012 25.5585 36.7465 25.2926 37.2594 24.6835L39.8191 21.6441C40.5333 20.7961 40.3851 19.5632 39.4883 18.8904C38.5914 18.2175 37.2854 18.3596 36.5713 19.2076L36.2454 19.5945C33.9413 16.2426 29.4139 14.4457 24.8533 15.1291C18.686 16.0531 15.963 20.6412 15.2956 23.5162C15.0501 24.574 15.7588 25.6179 16.8787 25.8479C17.9986 26.0779 19.1055 25.4068 19.351 24.3491C19.7787 22.5069 21.5377 19.5939 25.497 19.0007Z"
        fill="white"
      />
    </svg>
  ),
  stopped: (
    <svg width="54" height="54" viewBox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="27" cy="27" r="27" fill="white" fillOpacity="0.25" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15 27C15 25.8954 15.814 25 16.8182 25H37.1818C38.186 25 39 25.8954 39 27C39 28.1046 38.186 29 37.1818 29H16.8182C15.814 29 15 28.1046 15 27Z"
        fill="white"
      />
    </svg>
  ),
  fail: (
    <svg width="54" height="54" viewBox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="27" cy="27" r="27" fill="white" fillOpacity="0.25" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M34.9029 15.7029C35.8402 14.7657 37.3598 14.7657 38.2971 15.7029C39.2343 16.6402 39.2343 18.1598 38.2971 19.0971L30.3941 27L38.2971 34.9029C39.2343 35.8402 39.2343 37.3598 38.2971 38.2971C37.3598 39.2343 35.8402 39.2343 34.9029 38.2971L27 30.3941L19.0971 38.2971C18.1598 39.2343 16.6402 39.2343 15.7029 38.2971C14.7657 37.3598 14.7657 35.8402 15.7029 34.9029L23.6059 27L15.7029 19.0971C14.7657 18.1598 14.7657 16.6402 15.7029 15.7029C16.6402 14.7657 18.1598 14.7657 19.0971 15.7029L27 23.6059L34.9029 15.7029Z"
        fill="white"
      />
    </svg>
  ),
  done: (
    <svg width="54" height="54" viewBox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="27" cy="27" r="27" fill="white" fillOpacity="0.25" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M38.1459 17.5584C39.1597 18.4033 39.2895 19.9016 38.4357 20.9049L26.3094 35.1548C25.8741 35.6664 25.241 35.9726 24.5656 35.9983C23.8903 36.0239 23.2353 35.7665 22.7617 35.2894L15.688 28.1645C14.7591 27.2288 14.7725 25.7251 15.718 24.8059C16.6635 23.8866 18.1831 23.8999 19.112 24.8356L24.337 30.0985L34.7642 17.8452C35.618 16.8419 37.132 16.7135 38.1459 17.5584Z"
        fill="white"
      />
    </svg>
  ),
  error: (
    <svg width="54" height="54" viewBox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="27" cy="27" r="27" fill="white" fillOpacity="0.25" />
      <path
        d="M26.8029 15C27.8316 15 28.6594 15.8507 28.6375 16.8855L28.3609 29.9473C28.3396 30.9513 27.5245 31.7541 26.5262 31.7541H26.4705C25.4736 31.7541 24.6591 30.9535 24.6359 29.9508L24.3341 16.8891C24.3102 15.8529 25.1385 15 26.1687 15H26.8029ZM24.0002 36.4426C23.984 35.0656 25.1292 33.9344 26.5162 33.918C27.8549 33.9344 29 35.0656 29 36.4426C29 37.8525 27.8549 39 26.5162 39C25.1292 39 23.984 37.8525 24.0002 36.4426Z"
        fill="white"
      />
    </svg>
  ),
  waiting: (
    <svg width="54" height="54" viewBox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="27" cy="27" r="27" fill="white" fillOpacity="0.25" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M29.9645 27.3601C29.7561 27.1705 29.7559 26.8295 29.9644 26.6399L34.5924 22.4303C37.5041 19.7818 35.5963 15 31.628 15H22.3718C18.4035 15 16.4957 19.7818 19.4074 22.4303L24.0355 26.6399C24.2439 26.8295 24.2441 27.1705 24.0356 27.36L19.4076 31.5697C16.4959 34.2182 18.4037 39 22.372 39H31.6282C35.5965 39 37.5043 34.2182 34.5926 31.5697L29.9645 27.3601ZM27.5928 24.1243C27.2582 24.4286 26.7416 24.4286 26.407 24.1243L21.779 19.9146C21.1966 19.3849 21.5782 18.4286 22.3718 18.4286L31.628 18.4286C32.4217 18.4286 32.8032 19.3849 32.2209 19.9146L27.5928 24.1243ZM26.4072 29.8757C26.7418 29.5714 27.2584 29.5714 27.593 29.8757L32.221 34.0854C32.8034 34.6151 32.4218 35.5714 31.6282 35.5714H22.372C21.5783 35.5714 21.1968 34.6151 21.7791 34.0854L26.4072 29.8757Z"
        fill="white"
      />
    </svg>
  ),
  onhold: (
    <svg width="54" height="54" viewBox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="27" cy="27" r="27" fill="white" fillOpacity="0.25" />
      <circle cx="17" cy="27" r="3" fill="white" />
      <circle cx="27" cy="27" r="3" fill="white" />
      <circle cx="37" cy="27" r="3" fill="white" />
    </svg>
  ),
}
const tootipContents: { [key: string]: string } = {
  ready: `‘Ready’ means that the module is ready to operate. You can run the module by clicking ‘Run’ button, and it can be the waiting state until the module runs.`,
  running: `‘Running’ means that the module is running. If the changes are not reflected, you can refresh the current status by clicking the 'Refresh' button. You can completely cancel the module progress by clicking 'Stop' button.`,
  stopped: `‘Stopped’ means that the module is stopping. Wait until the module stops completely. When the stop process is finished, it changes to the state before clicking the Stop button.`,
  fail: `‘AutoMSA Fail’ means that the module operation fails for a specific reason. If there is no output, you can edit it by clicking the 'Parameter' button. if the output exist, you can edit on the previous Result and Editor. After editing, it is necessary to re-run.`,
  done: `‘Done’ means that the module successfully completed. You can check the result or editor of current module. If there are changes, a red dot will be displayed on the ‘Go to Editor’ button. At this time, it is necessary to re-run.`,
  error: `‘Error’ is a situation in which a module cannot proceed because a specific error has occurred. Check the reason for the error and click the Send to Helpdesk button to inquire about the error.`,
  waiting: `‘Waiting’ means that the module is waiting for operation. The requested action will be automatically executed after a certain amount of time. If you click the Stop button, ‘Waiting’ will be canceled and the state will be changed to ‘Stopped’.`,
  onhold: `‘On hold’ means that the previous module which must be passed is not completed. Please wait for the previous module to complete.`,
}
interface BoxProps {
  children: React.ReactNode
  label?: string
  status?: string
  desc?: string
  tootipContent?: string
}

export const IscStatusBox = ({ children, ...others }: BoxProps) => {
  const { label, status = 'Ready', desc, tootipContent } = others
  //공백 대소문자 처리
  const state = status?.toLowerCase().replace(/\s/g, '')
  return (
    <Box className={`${state ? ` bg_isc_${state}` : ''}`}>
      <div>
        <div className="ps_ab top_26 rgt_26">
          <TooltipHover placements="top" iconStyle={{ width: 20, height: 20, fill: '#fff' }}>
            {tootipContent ? tootipContent : tootipContents[state]}
          </TooltipHover>
        </div>
        <>{Icon[`${state}`]}</>
        <div className="mt_20">
          <p className="headline1 white">{label}</p>
          <p className="headline1 white">{status}</p>
          <p className="body1 white mt_10">{desc}</p>
        </div>
      </div>
      <div className="mt_30">{children}</div>
    </Box>
  )
}
