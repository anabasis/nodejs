'use client'
import { useMemo, useState } from 'react'
import { ButtonMui, SelectMui, InputLabel } from 'ui'
import dynamic from 'next/dynamic'
import { useTermsEditor } from '@hook/useTermsEditor'

type AddLanguageEditorType = {
  id: number
  editor: any
}

const AddLanguageEditor = ({ id, editor }: AddLanguageEditorType) => {
  const { langOptionData, setEditorList, removeEditorForm } = useTermsEditor()
  const CKEditor = useMemo(() => dynamic(() => import('editor/CKEditor'), { ssr: false }), [])

  return (
    <>
      <hr className="mt_30 mb_30" />
      <div className="linecont bg_second100">
        <div className="align mb_20">
          <div className="lft">
            <div className="item">
              <span className="body3 typo900">Language</span>
            </div>

            <div className="item pl_10">
              <SelectMui
                size="medium"
                placeholder="Select"
                value={editor.langCode || ''}
                options={langOptionData}
                onChange={(event) => {
                  setEditorList((prev) => prev.map((item) => (item.id === id ? { ...item, langCode: event.target.value } : item)))
                }}
              />
            </div>
          </div>
          <div className="rgt">
            <ButtonMui
              color="black"
              icon="DeleteIcon"
              iconStyle={{ fill: '#354165' }}
              size="xsmall"
              type="text"
              onClick={() => removeEditorForm(id)}
            ></ButtonMui>
          </div>
        </div>

        <div className="editor" style={{ background: '#fff' }}>
          <CKEditor
            tableName="TUS_TERMS"
            placeholder="Please enter content."
            key={id}
            data={editor.content || ''}
            onEditorChange={(data: string) => setEditorList((prev) => prev.map((item) => (item.id === id ? { ...item, content: data } : item)))}
          />
        </div>
      </div>
    </>
  )
}

export default AddLanguageEditor
