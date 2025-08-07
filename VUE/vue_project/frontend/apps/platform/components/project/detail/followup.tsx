'use client'

import { ProjectBasicInfoType } from '@type/project/projectType'
import { ContentBox } from 'ui/layouts'
import ProcessStatusSelect from './processStatusSelect'

export default function Followup({ projectInfo }: { projectInfo: ProjectBasicInfoType }) {
  const ProcessCode = 'FOUP'

  return (
    <ContentBox>
      <article>
        <div className="cont_title_box">
          <div className="align">
            <div className="lft">
              <p className="title1">Followup</p>
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
