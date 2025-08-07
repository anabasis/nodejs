'use client'

import { useNoteListData } from '@store/server/useProjectQuery'
import { NoteType, ProjectBasicInfoType } from '@type/project/projectType'
import { AvatarMui, ContentBox, EllipsisTypo, Icons, NoData } from 'ui'
import { changeTimeLocal, getCdnFileUrl } from 'library/util'
import { format, differenceInMinutes, differenceInDays } from 'date-fns'

export default function CommentBar({ projectId, projectInfo }: { projectId: string; projectInfo?: ProjectBasicInfoType }) {
  const { data: noteList } = useNoteListData(projectId, projectInfo?.projectRoleCode !== '')

  const formatNotiTime = (dateTime: string): string => {
    const date = new Date(changeTimeLocal({ time: dateTime }))
    const now = new Date()

    const agoMinute = differenceInMinutes(date, now)

    if (agoMinute < -6 * 24 * 60) {
      return format(date, 'yyyy-MM-dd')
    } else if (agoMinute < -24 * 60) {
      return `${Math.ceil(-agoMinute / 60 / 24)} days ago`
    } else if (agoMinute < -60) {
      // const hours = Math.floor(-agoMinute / 60)
      // const minutes = -agoMinute % 60
      // return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
      // return format(date, 'HH:mm')
      return `${Math.floor(-agoMinute / 60)} hour ago`
    } else {
      return `${-agoMinute} min ago`
    }
  }

  const commentBox = (comment: NoteType) => {
    return (
      <div className="comment_box" key={comment.id}>
        <div className="comment_box_header">
          <div className="align start">
            {/* {!comment.checked && <i className="bullet" />} */}
            <AvatarMui type="circular" data={[{ src: comment.fileInfoPrvResponse?.preSignedUrl ?? null, alt: comment.usrNm }]} />
            <EllipsisTypo className="body3 ml_8">{comment.usrNm}</EllipsisTypo>
          </div>
        </div>
        <div className="comment_box_body">
          <p className="body2 typo800">{comment.cmtCnt}</p>
          <div className="align end mt_10">
            {/* {isReply && (
              <>
                <p className="caption typo700">
                  <Icons.ReplyIcon width={20} height={20} />
                  <span>5 Reply</span>
                </p>
              </>
            )} */}
            <p className="caption navy200">{formatNotiTime(comment.crtDt)}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <ContentBox className="sticky comment_wrap">
      <aside className="comment_area">
        {noteList?.todayList.length > 0 && (
          <div className="comment_group">
            <p className="title1">Today</p>
            {noteList?.todayList.map((item) => commentBox(item))}
          </div>
        )}
        {noteList?.thisWeekList.length > 0 && (
          <div className="comment_group">
            <p className="title1">This Week</p>
            {noteList?.thisWeekList.map((item) => commentBox(item))}
          </div>
        )}
        {noteList?.lastWeekList.length > 0 && (
          <div className="comment_group">
            <p className="title1">Last Week</p>
            {noteList?.lastWeekList.map((item) => commentBox(item))}
          </div>
        )}
        {noteList?.oldNoteList.length > 0 && (
          <div className="comment_group">
            <p className="title1">Old Comment</p>
            {noteList?.oldNoteList.map((item) => commentBox(item))}
          </div>
        )}
        {noteList?.todayList.length === 0 &&
          noteList?.thisWeekList.length === 0 &&
          noteList?.lastWeekList.length === 0 &&
          noteList?.oldNoteList.length === 0 && (
            // <div className="nodata_group">
            //   <Icons.NoData width={100} height={100} />
            //   <p>There are no notes to display</p>
            // </div>
            <div className="align center min_vh83">
              <NoData size="sm" text="There are no notes to display." />
            </div>
          )}
      </aside>
    </ContentBox>
  )
}
