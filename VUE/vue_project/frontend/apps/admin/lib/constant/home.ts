export const initData = {
  hqInfo: {
    inviteUserCount: 0,
    requestUserCount: 0,
  },
  newcoInfo: {
    inviteUserCount: 0,
    requestUserCount: 0,
  },
  qnaInquiryInfo: 0,
  qnaCommentInfo: 0,
  getNewcoCorporateInfo: { activeCorporateCount: 0 },
}

export const progerssInfo = {
  signupProgerss: {
    title: 'Sign-up in progress',
    imageSrc: 'joinus',
    desc: 'Users require sign-up approval',
    value: 'sign',
  },
  invitationProgress: {
    title: 'Invitation in progress',
    imageSrc: 'invite',
    desc: 'Users invited by the admin but unregistered',
    value: 'invite',
  },
  corporateProgress: {
    title: 'Corporate',
    imageSrc: 'corporate',
    desc: 'Number of corporate currently active',
    value: 'corporate',
  },
  qnaInquiryProgres: {
    title: 'QnA inquiry',
    imageSrc: 'qna',
    desc: 'QnA waiting to be answered',
    value: 'qna',
  },
  qnaCommentProgress: {
    title: 'QnA comment',
    imageSrc: 'qnacomment',
    desc: 'Comments on answered QnA inquiry',
    value: 'qnaComment',
  },
}

export const roleCodeArr = ['A-SV', 'A-PF', 'A-SY', 'A-IT']
