import { useSoftwareMutation } from '@store/server/useSoftwareQuery'
import { useAlert } from 'library/hook/useAlert'
import { useRouter } from 'next/navigation'
import { ButtonMui } from 'ui/mui'

const Delete = ({ deleteId, isHistory }) => {
  const router = useRouter()
  const { alertClose } = useAlert()
  const { deleteSoftwareMutation, deleteVersionMutation } = useSoftwareMutation()
  const handleClickDeleteCode = async () => {
    // isHistory : true => Version History 리스트 중 하나 삭제
    // isHistory : false => Apps 삭제
    if (isHistory) {
      deleteVersionMutation({ deleteId })
    } else {
      deleteSoftwareMutation({ deleteId })
    }
  }

  return (
    <>
      <div className="align center mt_30">
        {/* 팝업의 버튼은 xlarge 사이즈 입니다.  */}
        <ButtonMui type="outlined" size="xlarge" onClick={() => alertClose()}>
          Cancel
        </ButtonMui>
        <ButtonMui
          size="xlarge"
          onClick={() => {
            handleClickDeleteCode()
          }}
        >
          Delete
        </ButtonMui>
      </div>
    </>
  )
}

export default Delete
