import { Badge, BoardTable, NoData, Pagenation } from 'ui'
import { changeTimeLocal } from 'library'
import { useState } from 'react'
import { useSeegeneProjectListData } from '@store/server/useSeegeneUserQuery'
import { SeegeneUserProject } from '@type/user/user'
import { useTranslation } from 'library/i18n/client'

const rowSize = 5

interface SeegeneDetailProjectTableProps {
  uid: string
}

const SeegeneDetailProjectTable = (props: SeegeneDetailProjectTableProps) => {
  const { uid } = props
  const { t } = useTranslation('platform')
  const [currentPage, setCurrentPage] = useState(0)
  const { projectList, isSuccess } = useSeegeneProjectListData(uid, currentPage, rowSize)

  const showProjectList = (project: SeegeneUserProject, index: number) => {
    const state = project.processCode?.toLowerCase().replace(/\s/g, '')
    return (
      <tr key={index}>
        <td>{project.projectNumber}</td>
        <td>{project.diseaseCategoryName}</td>
        <td>{project.targetMarket}</td>
        <td>{project.projectPurposeCode}</td>
        <td>
          {project.projectName}
          {project.projectRoleCode === 'PJM' && <Badge className="ml_10">Project manager</Badge>}
        </td>
        <td className={state}>{project.processCode}</td>
        <td>{project.corporationName}</td>
        <td>{changeTimeLocal({ time: project.endDate, type: 'yyyy-MM-dd' })}</td>
      </tr>
    )
  }

  return (
    <>
      <div className="cont_title_box">
        <p className="title1 align start">
          {t('CSTT')}
          <Badge className="ml_10" uiType="solid" color="blue" style="count">
            {projectList?.totalElements || 0}
          </Badge>
        </p>
      </div>
      <BoardTable>
        <colgroup>
          <col style={{ width: 'auto' }} />
          <col style={{ width: '8%' }} />
          <col style={{ width: '10%' }} />
          <col style={{ width: '10%' }} />
          <col style={{ width: '34%' }} />
          <col style={{ width: '11%' }} />
          <col style={{ width: 'auto' }} />
          <col style={{ width: 'auto' }} />
        </colgroup>
        <thead>
          <tr>
            <th>{t('vBcc')}</th>
            <th>{t('JHWI')}</th>
            <th>{t('PifG')}</th>
            <th>{t('BZPK')}</th>
            <th>{t('OCkJ')}</th>
            <th>{t('RZBj')}</th>
            <th>{t('orzY')}</th>
            <th>{t('NBYI')}</th>
          </tr>
        </thead>
        <tbody>
          {isSuccess && projectList?.content?.length === 0 ? (
            <tr className="nodata">
              <td colSpan={8}>
                <NoData text="There's no project." />
              </td>
            </tr>
          ) : (
            projectList?.content?.map((item, index: number) => showProjectList(item, index))
          )}
        </tbody>
      </BoardTable>
      <Pagenation currentPage={currentPage} totalCount={projectList?.totalElements || 0} pageSize={rowSize} onPageChange={(page) => setCurrentPage(page)} />
    </>
  )
}

export default SeegeneDetailProjectTable
