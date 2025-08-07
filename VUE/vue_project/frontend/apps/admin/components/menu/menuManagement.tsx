'use client'
import { IBasicInfoData } from 'lib/type/menu/basicInfoData'
import { useEffect, useState } from 'react'
import { Breadcrumb, ContentBox, HeaderStepper, ButtonMui } from 'ui'
import BasicInformation from './steps/BasicInfo'
import { MenuArchiSetting } from './steps/MenuArchiSetting'
import AuthoritySetting from './steps/AuthoritySetting'
import { usePathname, useRouter } from 'next/navigation'
import { IBaisInfoStepHandler } from '@type/menu/handlers'
import { initialBasicInformation, initialMenuLocation, initialMenuManagementSteps, pageTitleList } from '@constant/menuManagement'
import { FileResType } from 'library/type/common'
import { IAuthority } from '@type/menu/menuTypes'
import { useMenuMutate } from '@store/server/useMenuQuery'
import { MenuDetailViewType, MenuPostFormat } from '@type/menu/menumanagement'
import { AlertType, useAlert } from 'library/hook'
import { currentTabSelectedAtom } from '@store/client/menu'
import { useSetAtom } from 'jotai'

interface IMenuManagementPage {
  menuType: string
  isEdit?: boolean
  menuDetail?: MenuDetailViewType
  menuId?: string
}

export interface IMenuLocation {
  menuParentNum: number
  parentIndex?: number
  menuSortNum: number
}

/*
  menuID가 Parameter로 들어올 시, 특정 메뉴 수정을 위한 데이터 request를 보내도록 한다.
  만약 menuID가 들어오지 않으면, 메뉴를 추가하기 위한 접근이라고 간주하고, Add 화면으로 보여준다.
*/

export default function MenuManagementPage({ menuType, isEdit, menuDetail, menuId }: IMenuManagementPage) {
  const router = useRouter()
  const menuTypeFromPathname = usePathname().includes('admin') ? 'admin' : 'user'
  const isAdmin = menuType === 'admin' || menuTypeFromPathname === 'admin'
  const [basicInformation, setBasicInformation] = useState<IBasicInfoData>(initialBasicInformation)
  const { addMenuMutate, modifyMenuMutate, isAddLoading, isModifyLoading } = useMenuMutate(menuTypeFromPathname, basicInformation?.navigationLocation)

  const [currentStep, setCurrentStep] = useState<number>(0)
  const [isNextBtnDisabled, setNextBtnDisabled] = useState<boolean>(false)
  const [menuManageStepper, setMenuManageStepper] = useState(initialMenuManagementSteps)
  const [authoritySetting, setAuthoritySetting] = useState<IAuthority[]>([])
  const [menuLocation, setMenuLocation] = useState<IMenuLocation>(initialMenuLocation)
  const { alertOpen, alertClose } = useAlert()
  const setCurrentTab = useSetAtom(currentTabSelectedAtom)

  const handleOkButtonClick = () => {
    setCurrentTab(basicInformation.navigationLocation.toUpperCase())
    alertClose()
    if (isAdmin) {
      router.push('/menu/admin/')
    } else {
      router.push('/menu/user/')
    }
  }

  const alertState: AlertType = {
    InfoType: 'cancel',
    content: (
      // 버튼 센터 정렬 및 마진 class 입니다.
      <div className="align center mt_30">
        {/* 팝업의 버튼은 xlarge 사이즈 입니다.  */}
        <ButtonMui type="outlined" size="xlarge" onClick={() => alertClose()}>
          Cancel
        </ButtonMui>
        <ButtonMui size="xlarge" onClick={handleOkButtonClick}>
          OK
        </ButtonMui>
      </div>
    ),
  }

  const basicInformationOnchangeFunctions: IBaisInfoStepHandler = {
    handleNavigationLocationChange: (event: React.ChangeEvent<HTMLInputElement>) => {
      setBasicInformation((prev) => ({
        ...prev,
        navigationLocation: event.target.value,
        menuDepth: event.target.value === 'GNB' && prev.menuDepth !== '1' ? '1' : prev.menuDepth,
      }))
    },
    handleMenuDepthChange: (event: React.ChangeEvent<HTMLInputElement>) => {
      setBasicInformation((prev) => ({
        ...prev,
        menuDepth: event.target.value,
      }))
    },
    handleSelectBoxChange: (event: React.ChangeEvent<HTMLInputElement>) => {
      setBasicInformation((prev) => ({
        ...prev,
        system: event.target.value,
      }))
    },
    handleMenuNameChange: (event: React.ChangeEvent<HTMLInputElement>) => {
      setBasicInformation((prev) => ({
        ...prev,
        menuName: event.target.value,
      }))
    },
    handleMenuURLChange: (event: React.ChangeEvent<HTMLInputElement>) => {
      setBasicInformation((prev) => ({
        ...prev,
        menuURL: event.target.value,
      }))
    },
    handleFileChange: (iconType: string, file: FileResType) => {
      iconType === 'Default' &&
        setBasicInformation((prev) => ({
          ...prev,
          icon: {
            ...prev.icon,
            default: file,
          },
        }))

      iconType === 'Active' &&
        setBasicInformation((prev) => ({
          ...prev,
          icon: {
            ...prev.icon,
            active: file,
          },
        }))

      iconType === 'Hover' &&
        setBasicInformation((prev) => ({
          ...prev,
          icon: {
            ...prev.icon,
            hover: file,
          },
        }))
    },
  }

  const handleNextBtnClick = () => {
    let stepListToModify = [...menuManageStepper]
    stepListToModify[currentStep] = {
      ...stepListToModify[currentStep],
      active: false,
      completed: true,
    }
    stepListToModify[currentStep + 1].active = true

    setCurrentStep((prev) => prev + 1)
    setMenuManageStepper(stepListToModify)
  }

  const handlePrevBtnClick = () => {
    let stepListToModify = [...menuManageStepper]
    stepListToModify[currentStep] = {
      ...stepListToModify[currentStep],
      active: false,
      completed: false,
    }

    stepListToModify[currentStep - 1] = {
      ...stepListToModify[currentStep - 1],
      active: true,
      completed: false,
    }

    if (currentStep == 1) {
      setMenuLocation(initialMenuLocation)
    }
    if (currentStep == 2) {
      setAuthoritySetting([])
    }

    setCurrentStep((prev) => prev - 1)
    setMenuManageStepper(stepListToModify)
  }

  const isSubmitBtnDisabled = () => {
    return authoritySetting.length == 0
  }

  const handleSubmitButtonClick = () => {
    const { menuDepth, navigationLocation, system, menuURL, menuName, icon } = basicInformation

    const menuPostData: MenuPostFormat = {
      menuParentNum: menuLocation.menuParentNum,
      menuDepth: parseInt(menuDepth),
      menuSortNum: menuLocation.menuSortNum + 1,
      menuTypeCode: isAdmin ? 'MAD' : 'MDV',
      menuLocationCode: navigationLocation,
      menuSystemCode: system === '' || isAdmin ? null : system,
      menuUrl: menuURL,
      menuMlgInfoDtoRequests: [
        {
          menuLanguageCode: 'en',
          menuName: menuName,
        },
      ],
      menuRoleInfoDtoRequest: authoritySetting,
      menuIconDefaultNum: menuDepth === '1' ? icon.default.fileNumber : null,
      menuIconActiveNum: menuDepth === '1' ? icon.active.fileNumber : null,
      menuIconHoverNum: menuDepth === '1' ? icon.hover.fileNumber : null,
    }

    if (isEdit) {
      modifyMenuMutate({ menuNum: parseInt(menuId), newMenu: menuPostData })
    } else {
      addMenuMutate(menuPostData)
    }
  }

  const getCurrentStepComponent = () => {
    switch (currentStep) {
      case 0:
        return (
          <BasicInformation
            isAdd={!isEdit}
            basicInformation={basicInformation}
            setBasicInformation={setBasicInformation}
            handlers={basicInformationOnchangeFunctions}
            setNextBtnDisabled={setNextBtnDisabled}
            menuType={menuType ? menuType : menuTypeFromPathname}
          />
        )
      case 1:
        return (
          <MenuArchiSetting
            isAdd={!isEdit}
            isAdmin={isAdmin}
            menuDetail={menuDetail}
            basicInformation={basicInformation}
            menuLocation={menuLocation}
            setMenuLocation={setMenuLocation}
          />
        )
      case 2:
        return <AuthoritySetting isAdd={!isEdit} isAdmin={isAdmin} authoritySetting={authoritySetting} setAuthoritySetting={setAuthoritySetting} />
    }
  }

  const getCurrentStepButtons = () => {
    if (currentStep == 0) {
      return (
        <div className="align end">
          <ButtonMui
            type="outlined"
            size="xlarge"
            onClick={() => {
              alertOpen(alertState)
            }}
          >
            Cancel
          </ButtonMui>
          <ButtonMui disabled={isNextBtnDisabled} type="contained" size="xlarge" onClick={handleNextBtnClick}>
            Next
          </ButtonMui>
        </div>
      )
    }
    return (
      <div className="align">
        <div className="left">
          <ButtonMui type="outlined" size="xlarge" onClick={handlePrevBtnClick}>
            Previous
          </ButtonMui>
        </div>
        <div className="right">
          <ButtonMui
            type="outlined"
            size="xlarge"
            onClick={() => {
              alertOpen(alertState)
            }}
          >
            Cancel
          </ButtonMui>

          {currentStep == 1 ? (
            <ButtonMui disabled={isNextBtnDisabled} type="contained" size="xlarge" onClick={handleNextBtnClick}>
              Next
            </ButtonMui>
          ) : (
            <ButtonMui
              type="contained"
              size="xlarge"
              onClick={handleSubmitButtonClick}
              disabled={isSubmitBtnDisabled()}
              isLoading={isEdit ? isModifyLoading : isAddLoading}
            >
              {isEdit ? `Save` : `Add`}
            </ButtonMui>
          )}
        </div>
      </div>
    )
  }

  const initEdit = () => {
    const { basicInfoRes, roleInfoRes } = menuDetail
    setBasicInformation({
      navigationLocation: basicInfoRes.menuLocationCode,
      system: basicInfoRes.menuSystemCode,
      menuDepth: basicInfoRes.menuDepth.toString(),
      menuName: basicInfoRes.tsyMnuMlg.find((menuNm) => menuNm.langCd === 'en').mnuNm,
      menuURL: basicInfoRes.menuUrl,
      icon: {
        default: basicInfoRes.menuIconDefaultFileInfoResponse,
        hover: basicInfoRes.menuIconHoverFileInfoResponse,
        active: basicInfoRes.menuIconActiveFileInfoResponse,
      },
    })
    setAuthoritySetting(roleInfoRes)
  }

  useEffect(() => {
    if (isEdit && !!menuDetail) {
      initEdit()
    }
  }, [menuDetail])

  return (
    <>
      {/* 헤더 */}
      <div className="sticky_wrap">
        {/* 페이지 상단 박스 케이스 */}
        <ContentBox type="top_content">
          {/* lft/rgt 가 좌우로 정렬됩니다.  */}
          <div className="lft">
            {isEdit && <Breadcrumb pageTitleList={menuType === 'admin' ? pageTitleList.edit.admin : pageTitleList.edit.user} />}
            {!isEdit && <Breadcrumb pageTitleList={menuType === 'admin' ? pageTitleList.add.admin : pageTitleList.add.user} />}
            <h1 className="headline1">
              {isEdit ? `${menuDetail?.basicInfoRes.tsyMnuMlg.find((menuNm) => menuNm.langCd === 'en').mnuNm}` : isAdmin ? `Admin Menu` : `User Menu`}
            </h1>
          </div>
          <div className="rgt pt_8">
            <HeaderStepper color="primary" data={menuManageStepper} />
          </div>
        </ContentBox>
      </div>
      <ContentBox>
        {getCurrentStepComponent()}
        <div className="cont_bottom_box">{getCurrentStepButtons()}</div>
      </ContentBox>
    </>
  )
}
