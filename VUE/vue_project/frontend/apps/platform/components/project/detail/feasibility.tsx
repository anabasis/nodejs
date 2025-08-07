'use client'

import { ProjectBasicInfoType } from '@type/project/projectType'
import { ContentBox } from 'ui/layouts'
import ProcessStatusSelect from './processStatusSelect'

export default function Feasibility({ projectInfo }: { projectInfo: ProjectBasicInfoType }) {
  const ProcessCode = 'FSBT'

  return (
    <ContentBox>
      <article>
        <div className="cont_title_box">
          <div className="align">
            <div className="lft">
              <p className="title1">Feasibility</p>
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
