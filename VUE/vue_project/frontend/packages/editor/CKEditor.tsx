/*
    author: 김찬영
    description: 공통 CKEDIOTR5

    1. Create : 사용하고자 하는 곳에서
    =>  const CKEditor = useMemo(() => dynamic(() => import('editor/CKEditor'), { ssr: false }), []) 정의
    => <CKEditor isEditorReady={isEditorReady} /> 컴포넌트화 시킴

    2. Custom : 아직정의되지않아서 커스텀은 추후예정, config에서 커스텀 예정
    3. File Upload : File s3 upload 기반으로 커스텀 하였음, 추후 url 던져서 사용하도록 수정할것
    4. Image Test Key

    */

import { CKEditor as Editor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from 'ckeditor5-custom-build/build/ckeditor'
import { apiUploadFiles } from '../library/util'
import { Editor as EditorType } from '@ckeditor/ckeditor5-core'
import { api } from '../library/util/axios'

declare module '@ckeditor/ckeditor5-core' {
  interface EditorType extends EditorWithOnPlugins {}
}
interface EditorProps {
  data?: string
  onEditorChange: (data: string) => void
  url?: string
  tableName?: string
  placeholder?: string
}

interface EditorWithOnPlugins {
  plugins: {
    get: (arg0: string) => {
      on: any
    }
  }
}

const CKEditor = ({ data, onEditorChange, tableName, placeholder }: EditorProps) => {
  function attrPlugin(editor: EditorWithOnPlugins & EditorType) {
    // 이미지 업로드가 완료되었을 때의 event 를 감지

    editor.plugins.get('ImageUploadEditing').on('uploadComplete', (_evt: any, { data: { key }, imageElement }: any) => {
      editor.model.change((writer) => {
        writer.setAttribute('dataKey', key, imageElement)
      })

      editor.model.schema.extend('imageBlock', { allowAttributes: 'dataKey' })
      // 추가
      editor.model.schema.extend('imageInline', {
        allowAttributes: 'dataKey',
      })

      editor.conversion.for('upcast').attributeToAttribute({
        view: 'data-key',
        model: 'dataKey',
      })

      // ✅ imageInline 속성을 위한 추가
      editor.conversion.for('dataDowncast').attributeToAttribute({
        model: 'dataKey',
        view: 'data-key',
      })

      // ✅ imageInline 속성을 위한 추가
      editor.conversion.for('editingDowncast').add((dispatcher) => {
        dispatcher.on('attribute:dataKey:imageInline', (evt, data, { writer, consumable, mapper }) => {
          if (!consumable.consume(data.item, evt.name)) {
            return
          }
          const imageContainer = mapper.toViewElement(data.item)
          const imageElement = imageContainer.getChild(0)
          if (data.attributeNewValue !== null) {
            writer.setAttribute('data-key', data.attributeNewValue, imageElement)
          } else {
            writer.removeAttribute('data-key', imageElement)
          }
        })
      })

      editor.conversion.for('downcast').add((dispatcher) => {
        dispatcher.on('attribute:dataKey:imageBlock', (evt, data, conversionApi) => {
          if (!conversionApi.consumable.consume(data.item, evt.name)) {
            return
          }
          const viewWriter = conversionApi.writer
          const figure = conversionApi.mapper.toViewElement(data.item)
          const img = figure.getChild(0)

          if (data.attributeNewValue !== null) {
            viewWriter.setAttribute('data-key', data.attributeNewValue, img)
          } else {
            viewWriter.removeAttribute('data-key', img)
          }
        })
      })
    })
  }

  const uploadAdapter = (loader: any) => {
    return {
      upload: async () => {
        return new Promise(async (resolve, reject) => {
          loader.file.then(async (file: File) => {
            if (!tableName) return
            const fileList = [file] as File[]
            try {
              const response = await apiUploadFiles(fileList, { tableName })
              if (!response) return
              const { key } = response[0]
              const exTime = 86400
              const { data: src } = await api.get(`/common/s3/prv/get-url?key=${key ?? ''}&expireSecondTime=${exTime}`)

              resolve({
                default: src,
                key,
              })
            } catch (error) {
              reject(error)
            }
          })
        })
      },
    }
  }

  function uploadPlugin(editor: any) {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader: any) => {
      return uploadAdapter(loader)
    }
  }

  return (
    <Editor
      onChange={(event: any, editor: any) => {
        const data = editor?.getData()
        onEditorChange(data)
      }}
      /* 커스텀마이징 할 곳 */
      config={{
        toolbar: {
          items: [
            'heading',
            '|',
            'bold',
            'italic',
            'link',
            'bulletedList',
            'numberedList',
            '|',
            'outdent',
            'indent',
            '|',
            'imageUpload',
            'blockQuote',
            'insertTable',
            'undo',
            'redo',
            'fontBackgroundColor',
            'fontColor',
            'fontFamily',
            'fontSize',
            'horizontalLine',
          ],
        },
        // fontFamily: {
        //   options: ['default', 'Arial', '궁서체', '바탕', '돋움'],
        //   supportAllValues: true,
        // },
        // fontSize: {
        //   options: [10, 12, 14, 'default', 16],
        // },
        extraPlugins: [uploadPlugin, attrPlugin],
        placeholder: placeholder,
      }}
      data={data || ''}
      editor={ClassicEditor}
    />
  )
}

export default CKEditor
