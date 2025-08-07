'use client'

import { ProjectBasicInfoType } from '@type/project/projectType'
import { ContentBox } from 'ui/layouts'
import ProcessStatusSelect from './processStatusSelect'

export default function Prototype({ projectInfo }: { projectInfo: ProjectBasicInfoType }) {
  const ProcessCode = 'PRTP'

  return (
    <ContentBox>
      <article>
        <div className="cont_title_box">
          <div className="align">
            <div className="lft">
              <p className="title1">Prototype</p>
            </div>
            <div className="rgt">
              <ProcessStatusSelect projectInfo={projectInfo} processCode={ProcessCode} />
            </div>
          </div>
        </div>
      </article>
    </ContentBox>
  )
}
