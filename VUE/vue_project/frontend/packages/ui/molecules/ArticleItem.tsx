import React from 'react'
import { InputGroup } from '@ui/components/form/InputGroup'
import { InputLabel } from '@ui/components/form/InputLabel'
import { DetailTable } from '..'

interface ArticleItemProps {
  children: React.ReactNode
  title: string
  colsWidthArr: string[]
}

export const ArticleItem = ({ children, ...others }: ArticleItemProps) => {
  const { title, colsWidthArr } = others
  return (
    <article>
      <div className="cont_box_title">
        <p className="title1">{title}</p>
      </div>
      <DetailTable
        colgroup={
          <colgroup>
            {colsWidthArr.map((col, i) => (
              <col key={i} width={col} />
            ))}
          </colgroup>
        }
      >
        {children}
      </DetailTable>
    </article>
  )
}

export default ArticleItem
