'use client'

import { useQueries } from '@tanstack/react-query'
import { ProjectBasicInfoType } from '@type/project/projectType'
import { ContentBox } from 'ui/layouts'
import { SelectChangeEvent } from 'ui/mui'
import { getCode } from 'library/util'
import { useCallback, useEffect, useState } from 'react'
import { useProcessStatusMutation, useProjectProcessStatusData } from '@store/server/useProjectQuery'
import ProcessStatusSelect from './processStatusSelect'

export default function Ordering({ projectInfo }: { projectInfo: ProjectBasicInfoType }) {
  const ProcessCode = 'ORDR'

  return (
    <ContentBox>
      <article>
        <div className="cont_title_box">
          <div className="align">
            <div className="lft">
              <p className="title1">Ordering</p>
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
