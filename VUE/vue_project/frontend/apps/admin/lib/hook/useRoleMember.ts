import { AdminRoleMemberType } from '@type/role/adminRole'
import { UserRoleMemberType } from '@type/role/userRole'
import { useState } from 'react'

export const useRoleMember = () => {
  const [selectedUserList, setSelectedUserList] = useState<(UserRoleMemberType | AdminRoleMemberType)[]>([]) // 선택된 멤버

  /**
   * handleList: checkbox를 클릭 or chip의 x를 클릭하면 동작하는 함수
   * - checkbox
   *    - checked: check 표시가 해제되고 chip이 제거된다
   *    - unchecked: check 표시가 되고 chip이 추가가 된다
   * @param user : 클릭에 해당되는 유저
   */
  const handleList = (user: UserRoleMemberType | AdminRoleMemberType, event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked

    if (checked) {
      setSelectedUserList((prev) => [...prev, user])
    } else {
      setSelectedUserList((prev) => prev.filter((data) => data?.usrUid !== user.usrUid))
    }
  }

  /**
   * removeList: 칩 클릭 시 동작하는 함수
   * - 칩 클릭 시 해당 유저 체크 해제
   */
  const removeList = (userUid: string) => {
    setSelectedUserList((prev) => prev.filter((check) => check?.usrUid !== userUid))
  }
  return {
    selectedUserList,
    removeList,
    handleList,
  }
}
