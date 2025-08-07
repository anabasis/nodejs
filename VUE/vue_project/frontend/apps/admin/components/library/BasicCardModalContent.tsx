import { ButtonMui } from 'ui'
import { useModal, useToastPopup } from 'library'
import { cloneDeep } from 'lodash-es'
import { useLibCard } from '@hook/useLibCard'
import BasicIconItem from '@components/library/BasicIconItem'
import { useCallback, useEffect, useState } from 'react'
import { Icons } from 'ui'
import uuid from 'react-uuid'
import { LibraryManualContentType } from '@type/library'

const iconNames = ['NoIcon', 'Project', 'CommonCode', 'Tools', 'License', 'AdminUser', 'Manual', 'Algorithm', 'Qna', 'Terms']

const createIconComponents = (iconNameList, manualsImageFileName) => {
  return iconNameList.map((iconName: string) => ({
    id: uuid(),
    name: iconName,
    component: Icons[`Lib${iconName}Icon`] || Icons.NoImg,
    active: manualsImageFileName !== '' && iconName.includes(manualsImageFileName),
  }))
}

const BasicCardModalContent = ({ manual }: { manual: LibraryManualContentType }) => {
  const isReigster = !manual
  const { toastOpen, getToastState } = useToastPopup()
  const { modalClose } = useModal()
  const [selectedIconName, setSelectedIconName] = useState('')

  const { setSelectedIcon, selectedIcon } = useLibCard()
  const saveIconName = isReigster ? selectedIcon?.[0]?.name : selectedIcon?.filter((item) => item?.librCatNum === manual?.librCatNum)?.[0]?.name
  const [iconList, setIconList] = useState(createIconComponents(iconNames, saveIconName || manual?.imageFileName || selectedIconName))

  const cloneIcons = cloneDeep(iconList)
  const [topComponents, bottomComponents] = [cloneIcons.splice(0, 5), cloneIcons]

  const changeIcon = (id) => {
    setIconList((prev) =>
      prev.map((icon) => {
        return {
          ...icon,
          active: icon.id === id,
        }
      })
    )
    setSelectedIconName(iconList.filter((icon) => icon.id === id)[0].name)
  }
  const checkDisabled = () => !selectedIconName || manual?.imageFileName === selectedIconName

  const save = () => {
    const params = isReigster ? { name: selectedIconName } : { librCatNum: manual.librCatNum, name: selectedIconName }
    setSelectedIcon((prev) => {
      const index = prev.findIndex((item) => item.librCatNum === params.librCatNum)
      const newIcons = [...prev]
      if (index !== -1) {
        newIcons[index] = { ...params }
      } else {
        newIcons.push({ ...params })
      }
      return newIcons
    })
    toastOpen(getToastState({ content: 'Successfully saved.', icon: 'success' }))
    modalClose()
  }

  return (
    <>
      <div>
        <div className="align start top">
          {topComponents.map((icon, index) => (
            <BasicIconItem key={index} componenet={icon.component} changeIcon={changeIcon} {...icon} />
          ))}
        </div>
        <div className="align start top mt_20">
          {bottomComponents.map((icon, index) => (
            <BasicIconItem key={index} componenet={icon.component} changeIcon={changeIcon} {...icon} />
          ))}
        </div>
      </div>

      {/* 하단 버튼 예제 */}
      <div className="align center mt_30">
        <ButtonMui type="outlined" size="xlarge" onClick={() => modalClose()}>
          Cancel
        </ButtonMui>
        <ButtonMui size="xlarge" disabled={checkDisabled()} onClick={save}>
          Save
        </ButtonMui>
      </div>
    </>
  )
}

export default BasicCardModalContent
