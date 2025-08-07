// 작업자: 최유희
// 수정자: 김수연
import { useAddNoteMutation, useNoteListData } from '@store/server/useProjectQuery'
import React, { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { Icons, PopoverMui, TextArea, ButtonMui } from 'ui'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { hasGuideFloatingAtom } from 'library/store/client/guideState'
export default function CommentArea({ projectId, processNum }: { projectId: string; processNum: number }) {
  const [open, setOpen] = useState(false)
  const [checkGuideButton, setCheckGuideButton] = useState(false)
  const [hasGuideFloating, setHasGuideFloating] = useAtom(hasGuideFloatingAtom)
  const [anchorEl, setAnchorEl] = useState(null)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
    setOpen(true)
  }
  const handleClose = () => {
    setAnchorEl(null)
    setOpen(false)
  }

  useEffect(() => {
    if (hasGuideFloating) {
      setCheckGuideButton(true)
      setHasGuideFloating(false)
    }
  }, [hasGuideFloating])

  return (
    <>
      {/*  */}
      <button className="btn floating" onClick={handleClick} style={{ bottom: checkGuideButton ? '120px' : '' }}>
        <Icons.FloatingCommentIcon width={20} height={20} />
      </button>
      <PopoverMui
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        open={open}
        shadows="0px 4px 20px 0px #35416533"
        margin="0 0 0 -20px"
        handleClose={handleClose}
      >
        <CommentPop onClick={handleClose} projectId={projectId} processNum={processNum} />
      </PopoverMui>
    </>
  )
}

const CommentPop = ({ onClick, projectId, processNum }: { onClick: () => void; projectId: string; processNum: number }) => {
  const [noteInfo, setNoteInfo] = useState({ cmtCnt: '', prjNum: parseInt(projectId, 10), procNum: processNum })

  const { refetch: fetchNoteList } = useNoteListData(projectId, true)
  const addMutation = useAddNoteMutation()

  const handleNoteChange = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    setNoteInfo((prev) => {
      return { ...prev, cmtCnt: e.target.value }
    })
  }, [])

  const handleAddClick = useCallback(() => {
    addMutation.mutate(noteInfo, {
      onSuccess(data, variables, context) {
        fetchNoteList()
        onClick()
      },
      onError(error, variables, context) {},
    })
  }, [addMutation, noteInfo, onClick, fetchNoteList])

  return (
    <div className="floating_pop">
      <div className="floating_pop_header">
        <p className="title1">Add notes</p>
        <button onClick={onClick} className="close_btn">
          <Icons.XIcon width={24} height={24} fill={'#C6CDDA'} />
        </button>
      </div>
      <div className="mt_20">
        <TextArea height={177} placeholder="Please enter notes." maxLength={500} value={noteInfo.cmtCnt} onChange={handleNoteChange} />
      </div>
      <div className="align center mt_20">
        <ButtonMui
          type="contained"
          color="primary"
          size="large"
          disabled={noteInfo.cmtCnt.length === 0}
          onClick={handleAddClick}
          iconStyle={{ fill: '#fff' }}
          isLoading={addMutation.isLoading}
        >
          Add
        </ButtonMui>
      </div>
    </div>
  )
}
