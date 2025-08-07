import { IconFileUpload } from '@components/menu/fileUpload'
import InputItem from '@components/menu/inputItem'
import { RadioButton } from '@components/menu/radioButton'
import { IBasicInfoData } from 'lib/type/menu/basicInfoData'
import { IBaisInfoStepHandler } from 'lib/type/menu/handlers'
import { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react'
import { BaseInput, DetailTable, SelectMui, InputDec } from 'ui'
import { initialBasicInformation } from '@constant/menuManagement'
import { isEqual } from 'lodash-es'

interface IBasicInformationPageProps {
  isAdd: boolean
  menuType: string
  basicInformation: IBasicInfoData
  setBasicInformation: Dispatch<SetStateAction<IBasicInfoData>>
  handlers: IBaisInfoStepHandler
  setNextBtnDisabled: Dispatch<SetStateAction<boolean>>
}

export default function BasicInformation({ isAdd, menuType, basicInformation, setBasicInformation, handlers, setNextBtnDisabled }: IBasicInformationPageProps) {
  const [isGnb, setIsGnb] = useState(basicInformation.navigationLocation === 'GNB')
  const { handleNavigationLocationChange, handleMenuDepthChange, handleSelectBoxChange, handleMenuNameChange, handleMenuURLChange, handleFileChange } = handlers

  const validateData = () => {
    const { navigationLocation, icon, menuDepth, system, menuName } = basicInformation

    if ((menuType === 'user' && system !== '' && menuName !== '') || (menuType === 'admin' && menuName !== '')) {
      if (menuDepth === '1' && icon.default && icon.active && icon.hover) {
        setNextBtnDisabled(false)
      } else {
        if (navigationLocation !== 'GNB' && menuDepth === '2') {
          setNextBtnDisabled(false)
        } else {
          setNextBtnDisabled(true)
        }
      }
    } else {
      setNextBtnDisabled(true)
    }
  }

  useEffect(() => {
    setIsGnb(basicInformation.navigationLocation === 'GNB')
    validateData()
  }, [basicInformation])

  useEffect(() => {
    if (isEqual(initialBasicInformation, basicInformation)) {
      setBasicInformation((prev) => ({
        ...prev,
        navigationLocation: 'GNB',
        menuDepth: '1',
      }))
    }
  }, [])

  return (
    <>
      <article>
        <div className="cont_title_box">
          <p className="title1">Basic Information</p>
        </div>
        <DetailTable
          colgroup={
            <colgroup>
              <col style={{ width: '15%' }} />
              <col style={{ width: '35%' }} />
              <col style={{ width: '15%' }} />
              <col style={{ width: '35%' }} />
            </colgroup>
          }
        >
          <tr>
            <InputItem labelText={'Navigation location'} required={true}>
              <div className="radiogroup align start">
                <RadioButton
                  selectedValue={basicInformation?.navigationLocation}
                  itemValue={'GNB'}
                  itemLabel={'GNB'}
                  tooltipMsg={'Abbreviation of Global Navigation Bar.\n This menu is located at the top of Seegene OneSystem.'}
                  handleClick={handleNavigationLocationChange}
                  disabled={!isAdd}
                />
                <RadioButton
                  selectedValue={basicInformation?.navigationLocation}
                  itemValue={'LNB'}
                  itemLabel={'LNB'}
                  tooltipMsg={'Abbreviation of Local Navigation Bar.\n This menu is located at the left side of Seegene OneSystem.'}
                  handleClick={handleNavigationLocationChange}
                  disabled={!isAdd}
                />
              </div>
            </InputItem>
            {menuType === 'user' && (
              <InputItem labelText={'System'} required={true}>
                <div className="grid6">
                  <SelectMui
                    size="full"
                    options={[{ name: 'ISP', value: 'ISP' }]}
                    placeholder="Please select system."
                    value={basicInformation?.system || ''}
                    onChange={handleSelectBoxChange}
                  />
                </div>
              </InputItem>
            )}
          </tr>
          <tr>
            <InputItem
              labelText={'Menu depth'}
              required={true}
              tooltipMessage={`If you select the 1st, icon image attachment is required.\n If you select the 2nd, icon image cannot be attached.`}
            >
              <div className="radiogroup align start">
                <RadioButton
                  selectedValue={basicInformation?.menuDepth}
                  itemValue={'1'}
                  itemLabel={'1st'}
                  handleClick={handleMenuDepthChange}
                  disabled={isGnb || !isAdd}
                />
                <RadioButton
                  selectedValue={basicInformation?.menuDepth}
                  itemValue={'2'}
                  itemLabel={'2nd'}
                  handleClick={handleMenuDepthChange}
                  disabled={isGnb || !isAdd}
                />
              </div>
            </InputItem>
            <th className="va_top pt_28">
              <span className="required">Menu name</span>
            </th>
            <td className="va_top pt_19">
              <div className="grid6">
                <BaseInput placeholder="Please enter menu name." onChange={handleMenuNameChange} value={basicInformation?.menuName || ''} maxLength={100} />
                <InputDec msg="When the LNB menu name exceeds 20 characters, display as (...)." />
              </div>
            </td>
            {/* <InputItem labelText={''} required={true}>
              <BaseInput placeholder="Please enter menu name." onChange={handleMenuNameChange} value={basicInformation?.menuName || ''} />
              <InputDec msg="When the LNB menu name exceeds 20 characters, display as (...)." />
            </InputItem> */}
          </tr>
          <tr>
            <InputItem labelText={'Menu URL'} colSpan={3} tooltipMessage={`URL is optional but must input the 1st \nand bottom menus's URL.`}>
              <BaseInput placeholder="Please enter the menu URL." onChange={handleMenuURLChange} value={basicInformation?.menuURL || ''} />
            </InputItem>
          </tr>
        </DetailTable>
      </article>
      <article>
        <div className="cont_title_box">
          <p className="title1">Icon Setting</p>
          <p className="body2" style={{ whiteSpace: 'pre-wrap' }}>
            {`If you upload the icon of the menu to be registered, you can preview it in [Preview]. If the menu depth is a 2nd menu, preview is not provided.`}
          </p>
        </div>
        <DetailTable
          colgroup={
            <colgroup>
              <col style={{ width: '15%' }} />
              <col style={{ width: '35%' }} />
              <col style={{ width: '15%' }} />
              <col style={{ width: '35%' }} />
            </colgroup>
          }
        >
          <IconFileUpload
            isAdd={isAdd}
            isGnb={isGnb}
            handleFileChange={handleFileChange}
            iconType={'Default'}
            tooltipMessage={`Means the default status,\n please upload file size in LNB 20X20 GNB 30X30.`}
            disabled={basicInformation.menuDepth === '2'}
            menuName={basicInformation.menuName}
            required={basicInformation.menuDepth !== '2'}
            prevFile={basicInformation.icon.default}
          />
          <IconFileUpload
            isAdd={isAdd}
            isGnb={isGnb}
            handleFileChange={handleFileChange}
            iconType={'Hover'}
            tooltipMessage={`Means that convert when the mouse pointer is raised,\n please upload file size in LNB 20X20 GNB 30X30.`}
            disabled={basicInformation.menuDepth === '2'}
            menuName={basicInformation.menuName}
            required={basicInformation.menuDepth !== '2'}
            prevFile={basicInformation.icon.hover}
          />
          <IconFileUpload
            isAdd={isAdd}
            isGnb={isGnb}
            handleFileChange={handleFileChange}
            iconType={'Active'}
            tooltipMessage={`Means when selected,\n please upload file size in LNB 20X20 GNB 30X30.`}
            disabled={basicInformation.menuDepth === '2'}
            menuName={basicInformation.menuName}
            required={basicInformation.menuDepth !== '2'}
            prevFile={basicInformation.icon.active}
          />
        </DetailTable>
      </article>
    </>
  )
}
