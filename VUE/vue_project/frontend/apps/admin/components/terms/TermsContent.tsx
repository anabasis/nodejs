'use client'
import { useMemo } from 'react'
import { ButtonMui, SelectMui } from 'ui'
import dynamic from 'next/dynamic'
import AddLanguageEditor from '@components/terms/AddLanguageEditor'
import { TermsAddParamsType } from '@type/terms'
import { AlertType, useAlert, useParamsData } from 'library'
import { useTermsEditor } from '@hook/useTermsEditor'
import { useRouter } from 'next/navigation'
import TermsUpdateTable from './TermsUpdateTable'
import TermsAddTable from './TermsAddTable'

const TermsContent = () => {
  const CKEditor = useMemo(() => dynamic(() => import('editor/CKEditor'), { ssr: false }), [])
  const { alertOpen, alertClose } = useAlert()
  const router = useRouter()

  const { params, setChangeParams } = useParamsData<TermsAddParamsType>()
  const { isUpdate, editorList, addLanguageEditor, getDisabled, saveTerms, selectData, isSaveLoading } = useTermsEditor()

  const cancelTerms = () => {
    const alertState: AlertType = {
      InfoType: 'cancel',
      content: (
        <div className="align center mt_30">
          <ButtonMui type="outlined" size="xlarge" onClick={() => alertClose()}>
            Cancel
          </ButtonMui>
          <ButtonMui size="xlarge" onClick={() => router.replace('/terms')}>
            OK
          </ButtonMui>
        </div>
      ),
    }
    alertOpen(alertState)
  }

  return (
    <>
      <article>
        {/* 컨텐츠 간 간격은 article 로 묶습니다. */}
        <div className="cont_title_box">
          <p className="title1">Terms & Conditions Information</p>
          <p className="body2">Please enter basic terms and conditions information.</p>
        </div>
        {isUpdate ? <TermsUpdateTable selectData={selectData} /> : <TermsAddTable selectData={selectData} />}
      </article>
      <article>
        <div className="cont_title_box">
          <p className="title1">Terms & Conditions Detail</p>
          <p className="body2">Please enter terms & conditions.</p>
        </div>
        <div>
          <div className="align mb_20">
            <div className="lft">
              <div className="item">
                <span className="body3 typo900">Language</span>
              </div>
              <div className="item ml_30">
                <SelectMui size="medium" disabled value={params?.conditionsDetail?.[0]?.langCode || 'en'} options={selectData?.langCode} />
              </div>
            </div>
            <div className="rgt">
              <ButtonMui icon="PlusIcon" type="contained" size="medium" color="black" onClick={addLanguageEditor}>
                Add Language
              </ButtonMui>
            </div>
          </div>

          <div className="editor">
            <CKEditor
              tableName="TUS_TERMS"
              placeholder="Please enter content."
              onEditorChange={(data) =>
                setChangeParams({
                  conditionsDetail: [
                    {
                      content: data,
                      langCode: params?.conditionsDetail?.[0]?.langCode,
                    },
                  ],
                })
              }
              data={params?.conditionsDetail?.[0]?.content || ''}
            />
          </div>
        </div>

        {editorList.length > 0 && editorList?.map((editor) => <AddLanguageEditor key={editor.id} id={editor.id} editor={editor} />)}
      </article>
      <article>
        <div className="cont_bottom_box">
          <div className="align end">
            <ButtonMui type="outlined" size="xlarge" onClick={cancelTerms}>
              Cancel
            </ButtonMui>
            <ButtonMui isLoading={isSaveLoading} type="contained" size="xlarge" disabled={getDisabled()} onClick={saveTerms}>
              {isUpdate ? 'Save' : 'Add'}
            </ButtonMui>
          </div>
        </div>
      </article>
    </>
  )
}

export default TermsContent
