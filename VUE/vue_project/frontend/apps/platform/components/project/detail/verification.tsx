'use client'

import { ProjectBasicInfoType } from '@type/project/projectType'
import { ContentBox } from 'ui/layouts'
import ProcessStatusSelect from './processStatusSelect'

export default function Verification({ projectInfo }: { projectInfo: ProjectBasicInfoType }) {
  const ProcessCode = 'VRFC'

  return (
    <ContentBox>
      <article>
        <div className="cont_title_box">
          <div className="align">
            <div className="lft">
              <p className="title1">Verification</p>
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
