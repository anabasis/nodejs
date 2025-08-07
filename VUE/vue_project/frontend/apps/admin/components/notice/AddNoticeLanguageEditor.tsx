'use client'
import { useMemo, useState } from 'react'
import dynamic from 'next/dynamic'
import { ButtonMui, BaseInput, SelectMui, DetailTable } from 'ui'
import { useNoticeEditor } from '@hook/useNoticeEditor'
import { NewNoticeEditorType } from '@type/notice'

type AddNoticeLanguageEditorType = {
  id: number
  editor: NewNoticeEditorType
}

const AddNoticeLanguageEditor = ({ id, editor }: AddNoticeLanguageEditorType) => {
  const { langOptionData, setEditorList, removeEditorForm } = useNoticeEditor()
  const CKEditor = useMemo(() => dynamic(() => import('editor/CKEditor'), { ssr: false }), [])

  return (
    <>
      <hr className="mtb_30" />
      <div className="linecont bg_second100">
        <DetailTable
          colgroup={
            <colgroup>
              <col width="100px" />
              <col width="auto" />
            </colgroup>
          }
        >
          <tr>
            <th>
              <span className="required">Language</span>
            </th>
            <td className="pr_0">
              <div className="align">
                <SelectMui
                  size="medium"
                  placeholder="Select"
                  value={editor?.languageCode || ''}
                  options={langOptionData}
                  onChange={(event) => setEditorList((prev) => prev.map((item) => (item.id === id ? { ...item, languageCode: event.target.value } : item)))}
                />
                <ButtonMui color="black" icon="DeleteIcon" iconStyle={{ fill: '#354165' }} size="xsmall" type="text" onClick={() => removeEditorForm(id)} />
              </div>
            </td>
          </tr>
          <tr>
            <td colSpan={2}>
              <BaseInput
                onChange={(event) => setEditorList((prev) => prev.map((item) => (item.id === id ? { ...item, title: event.target.value } : item)))}
                value={editor?.title || ''}
                placeholder="Please enter title."
              />
            </td>
          </tr>
        </DetailTable>
        <div className="editor" style={{ background: '#fff' }}>
          <CKEditor
            key={id}
            tableName="TBD_NTC_ATCH"
            placeholder="Please enter content."
            data={editor.content || ''}
            onEditorChange={(data: string) => setEditorList((prev) => prev.map((item) => (item.id === id ? { ...item, content: data } : item)))}
          />
        </div>
      </div>
    </>
  )
}

export default AddNoticeLanguageEditor
