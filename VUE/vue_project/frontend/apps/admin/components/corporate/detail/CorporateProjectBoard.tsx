import { useQuery } from '@tanstack/react-query'
import { CorporateProject } from 'lib/type/corporate/corporateType'
import { apiAdmin, changeTimeLocal } from 'library/util'
import { Badge, BoardTable, NoData } from 'ui'

const CorporateProjectBoard = ({ id }: { id: string }) => {
  //2.Corporate 프로젝트 API
  const getCorporateProject = async () => {
    const response = await apiAdmin.get(`/corporate/${id}/project/detail?page=0`)
    return response.data
  }

  const { data: projects } = useQuery(['projects', id], () => getCorporateProject())

  return (
    <>
      <p className="align start title1">
        Corporate Project
        <Badge uiType="solid" color="blue" style="count" size="md" className="ml_10">
          {projects?.content.length}
        </Badge>
      </p>
      <BoardTable>
        {/* <colgroup>
          <col style={{ width: 'auto' }} />
        </colgroup> */}
        <thead>
          <tr>
            <th>ID</th>
            <th>Product Category</th>
            <th>Target Market</th>
            <th>Purpose</th>
            <th>Project Name</th>
            <th>Process</th>
            <th>Corporate</th>
            <th>Due Date</th>
          </tr>
        </thead>
        <tbody>
          {projects?.content.length > 0 ? (
            projects?.content.map((corp: CorporateProject, index: number) => {
              return (
                <tr key={index}>
                  <td>{corp.projectNum}</td>
                  <td>{corp.diseaseCategoryName}</td>
                  <td>{corp.targetMarket}</td>
                  <td>{corp.projectPurposeCode}</td>
                  <td>{corp.projectName}</td>
                  <td>{corp.processCodeName}</td>
                  <td>{corp.corporationName}</td>
                  <td>{changeTimeLocal({ time: corp.endDate, type: 'yyyy-MM-dd' })}</td>
                </tr>
              )
            })
          ) : (
            <tr className="nodata">
              <td colSpan={8}>
                <NoData size="md" text="There are no registered corporate project." />
                {/* <div className="nodata_group" style={{ minHeight: '300px' }}>
                  <Icons.NoData width={120} height={120} />
                  <p>There are no registered Corporate project.</p>
                </div> */}
              </td>
            </tr>
          )}
        </tbody>
      </BoardTable>
    </>
  )
}
export default CorporateProjectBoard
