'use client'

import { ChangeEvent, KeyboardEvent, useCallback, useState, useMemo, useEffect } from 'react'
import {
  AvatarMui,
  BaseTab,
  BoardTable,
  Breadcrumb,
  ButtonMui,
  ContentBox,
  ContextButton,
  EllipsisTypo,
  SelectMui,
  SearchIcoInput,
  StatusLabel,
  NoData,
  Badge,
} from 'ui'
import DateRangePicker from 'ui/datepicker/DateRangePicker'
import FilterItem from 'ui/molecules/FilterItem'
import InnerTd from 'ui/molecules/InnerTd'
import { useModal } from 'library/hook/useModal'
import RequestProject from '@components/project/requestProject'
import { SelectChangeEventType } from 'ui/mui/Select'
import Pagenation from 'ui/components/common/Pagenation'
import { useAlert } from 'library/hook/useAlert'
import { useToastPopup } from 'library/hook/useToastPopup'
import { changeTimeLocal, getCode } from 'library/util'
import { useQueries } from '@tanstack/react-query'
import { useDeleteProjectMutation, useModifyProjectStatusMatation, useProcessCodeData, useProjectListData } from '@store/server/useProjectQuery'
import { ProjectListType, ProjectFilterType, ProjectPaginationType } from '@type/project/projectType'
import { useMenu, useUser } from 'library/hook'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { getProjectProcessStatus } from '@api/project'
import { useSearchFilter } from '@hook/useSearchFIlter'

export default function Page() {
  const pageTitleList = ['Project']
  const router = useRouter()
  const { modalOpen, modalClose } = useModal()
  const { alertOpen, alertClose } = useAlert()
  const { toastOpen } = useToastPopup()
  const { userRole, userInfo } = useUser()
  const pathname = usePathname()
  const { getPathInfo } = useMenu()

  const commonCodes = { diseaseCategory: 'PFM020', purpose: 'PFM015' }
  const codes = useQueries({
    queries: Object.values(commonCodes).map((v) => {
      return { queryKey: ['code', v], queryFn: () => getCode(v), staleTime: Infinity }
    }),
  })
  let cCode = {}
  Object.keys(commonCodes).forEach((v, i) => {
    if (typeof codes[i].data === 'object') {
      cCode[v] = [{ name: 'All', value: 'all' }].concat(codes[i].data)
    }
  })

  const { data: processCodeList } = useProcessCodeData(true)

  const tabData = useMemo(() => {
    if (!!userRole) {
      if (userRole?.usrRolCd === 'U-XM' && userRole?.corpLv === 'LV1' && getPathInfo(pathname).crtYn === 'N') {
        return [
          { tabName: 'All Project', value: 'ALL' },
          { tabName: 'NewCo Project', value: 'NEW_CO' },
        ]
      } else if (userRole?.usrRolCd === 'U-XM' && userRole?.corpLv === 'LV1' && getPathInfo(pathname).crtYn === 'Y') {
        return [
          { tabName: 'My Project', value: 'MY' },
          { tabName: 'All Project', value: 'ALL' },
          { tabName: 'NewCo Project', value: 'NEW_CO' },
        ]
      } else if (getPathInfo(pathname).crtYn === 'Y') {
        return [
          { tabName: 'My Project', value: 'MY' },
          { tabName: 'All Project', value: 'ALL' },
        ]
      }
      return [{ tabName: 'All Project', value: 'ALL' }]
    }
    return []
  }, [userRole, pathname, getPathInfo])

  const initData = useMemo(() => ({ size: 20 }), [])

  const {
    onPageChange,
    currentPage,
    searchFilterParams,
    valueParam,
    selectTab,
    resetSearcFilterParams,
    setChangeSearchParams,
    onValueParamChange,
    onSelectTab,
    onResetFilter,
    onSearch,
    isParamsLoading,
  } = useSearchFilter<ProjectFilterType>(initData)

  const tabIndex = useMemo(() => {
    return !!searchFilterParams.projectTab && tabData.findIndex((item) => item.value === searchFilterParams.projectTab) > -1
      ? tabData.findIndex((item) => item.value === searchFilterParams.projectTab)
      : 0
  }, [searchFilterParams.projectTab, tabData])

  const filterParams = useMemo<ProjectFilterType>(() => {
    if (tabData.length > 0) {
      if (!!searchFilterParams.projectTab && tabData.find((item) => item.value === searchFilterParams.projectTab)) {
        return { ...searchFilterParams }
      } else {
        return { ...searchFilterParams, projectTab: tabData[0].value }
      }
    }
    return { size: 20 }
  }, [tabData, searchFilterParams])

  const { data: projectListData, refetch: projectFetch } = useProjectListData(filterParams, currentPage)
  const deleteProjectMutation = useDeleteProjectMutation()
  const projectStatusMutation = useModifyProjectStatusMatation()

  useEffect(() => {
    return () => resetSearcFilterParams()
  }, [])

  useEffect(() => {
    if (!!projectListData) {
      if (currentPage !== 0 && projectListData.content.length === 0) {
        onPageChange(currentPage - 1)
      }
    }
  }, [projectListData])

  const handleCreateClick = useCallback(() => {
    router.push('/project/add')
  }, [router])

  const handleTabChange = useCallback(
    ({ oldIndex, newIndex }: { oldIndex: number; newIndex: number }) => {
      router.push(`/project?projectTab=${tabData[newIndex].value}`)
    },
    [router, tabData]
  )
  const handlePeriodChange = useCallback(
    ({ startDate, endDate, displayStartDate, displayEndDate }: { startDate: string; endDate: string; displayStartDate: string; displayEndDate: string }) =>
      setChangeSearchParams({ startDate, endDate, displayEndDate, displayStartDate }),
    [setChangeSearchParams]
  )
  const handleDiseasecategoryChange = useCallback(
    (event: SelectChangeEventType) => setChangeSearchParams(event, 'diseaseCategoryCode'),
    [setChangeSearchParams]
  )
  const handlePurposeChange = useCallback((event: SelectChangeEventType) => setChangeSearchParams(event, 'purposeCode'), [setChangeSearchParams])
  const handleProcessChange = useCallback((event: SelectChangeEventType) => setChangeSearchParams(event, 'processCode'), [setChangeSearchParams])
  const handleSearch = useCallback(() => onSearch('keyword'), [onSearch])
  const handleSearchKeyEvent = useCallback((event: KeyboardEvent<HTMLInputElement>) => onSearch(event, 'keyword'), [onSearch])
  const handleFilterResetClick = useCallback(() => {
    router.push(`/project?projectTab=${tabData[tabIndex].value}`)
  }, [router, tabData, tabIndex])

  const displayProjectName = useCallback(
    (item: ProjectListType) => {
      return item.projectRoleCode === '' ? (
        <div className="align v_center min_h28">
          <p className="ellipsis_1">{item.prjNm}</p>
        </div>
      ) : (
        <InnerTd className="min_h28">
          <EllipsisTypo>{item.prjNm}</EllipsisTypo>
          {/* <AvatarMui data={[{ src: userInfo?.prflUrl, alt: userInfo?.usrNm }]} key={item.id} /> */}
          <Badge>My project</Badge>
        </InnerTd>
      )
    },
    [userInfo]
  )
  const displayProcess = useCallback((item: ProjectListType) => {
    return <p className={`${item.process.toLocaleLowerCase().split(' ').join('')} ${item.prjStsCd === 'ONG' ? '' : 'disabledProcess'}`}>{item.process}</p>
  }, [])
  const deleteProject = useCallback(
    (item: ProjectListType) => {
      deleteProjectMutation.mutate(item.id, {
        onSuccess(data, variables, context) {
          projectFetch()
          toastOpen({ content: 'Successfully deleted.', icon: 'success' })
          alertClose()
        },
        onError(error, variables, context) {
          toastOpen({ content: 'Delete failed.', icon: 'warning' })
          alertClose()
        },
      })
    },
    [alertClose, deleteProjectMutation, projectFetch, toastOpen]
  )

  const handleDeleteProject = useCallback(
    (item: ProjectListType) => {
      alertOpen({
        maxWidth: 's',
        title: 'Are you sure to delete?',
        content: (
          <div className="align center mt_30">
            <ButtonMui
              type="outlined"
              size="xlarge"
              onClick={() => {
                alertClose()
              }}
            >
              Cancel
            </ButtonMui>
            <ButtonMui
              size="xlarge"
              onClick={() => {
                deleteProject(item)
              }}
            >
              Delete
            </ButtonMui>
          </div>
        ),
        textTitle: `If you click the delete button, it cannot be recovered.`,
        icon: 'info',
      })
    },
    [alertClose, alertOpen, deleteProject]
  )

  const handleModifyProjectInfo = useCallback(
    (data: ProjectListType) => {
      router.push(`/project/edit?id=${data.id}`)
    },
    [router]
  )

  const closeChangeProjectAuth = useCallback(
    (type: string) => {
      modalClose()
    },
    [modalClose]
  )

  const handleChangeProjectAuth = useCallback(
    (data: ProjectListType) => {
      modalOpen({
        title: 'Authority change request',
        linetitle: true,
        textTitle: `Please enter information to request Authority change in the project ${data.prjNm}.`,
        maxWidth: 'm',
        content: <RequestProject id={`${data.id}`} popupClose={closeChangeProjectAuth} type="RQC" />,
      })
    },
    [closeChangeProjectAuth, modalOpen]
  )

  const handleChangeProjectAuthList = useCallback(
    (data: ProjectListType) => {
      router.push(`/project/reqproject?id=${data.id}`)
    },
    [router]
  )

  const closeJoinProject = useCallback(
    (type: string) => {
      modalClose()
    },
    [modalClose]
  )

  const handleJoinProject = useCallback(
    (data: ProjectListType) => {
      modalOpen({
        title: 'Project Participation Request',
        linetitle: true,
        textTitle: `Please enter information to request participation in the project ${data.prjNm}.`,
        maxWidth: 'm',
        content: <RequestProject id={`${data.id}`} popupClose={closeJoinProject} type="RQJ" />,
      })
    },
    [closeJoinProject, modalOpen]
  )

  const goToDetail = useCallback(
    (id, processCode) => {
      router.push(`/project/detail?id=${id}&process=${processCode}`)
    },
    [router]
  )

  const handleProjectAbort = useCallback(
    async (data: ProjectListType) => {
      const { data: projectProcess } = await getProjectProcessStatus(data.id)
      //프로세스의 상태가 진행중이 있으면 안됨.
      const process = projectProcess.find((item) => item.prcsStsCode === 'PCNG')
      if (process != undefined) {
        alertOpen({
          maxWidth: 's',
          title: 'The project cannot be aborted',
          content: (
            <div className="align center mt_30">
              <ButtonMui
                type="outlined"
                size="xlarge"
                onClick={() => {
                  alertClose()
                }}
              >
                Cancel
              </ButtonMui>
              <ButtonMui
                size="xlarge"
                onClick={() => {
                  goToDetail(data.id, process.prcsCode)
                }}
              >
                Details
              </ButtonMui>
            </div>
          ),
          textTitle: `The project cannot be aborted because ${process.prcsName} status is ${process.prcsStsName}.`,
          icon: 'warning',
        })
      } else {
        projectStatusMutation.mutate(
          { prjStsCd: 'ABR', id: data.id },
          {
            onSuccess(data, variables, context) {
              projectFetch()
            },
            onError(error, variables, context) {},
          }
        )
      }
    },
    [alertClose, alertOpen, goToDetail, projectFetch, projectStatusMutation]
  )

  const handleProjectComplete = useCallback(
    async (data: ProjectListType) => {
      const { data: projectProcess } = await getProjectProcessStatus(data.id)
      //프로세스의 상태가 완료만 있어야 함.
      const process = projectProcess.find((item) => item.prcsStsCode !== 'PCFN')

      if (process !== undefined) {
        alertOpen({
          maxWidth: 's',
          title: 'The project cannot be completed',
          content: (
            <div className="align center mt_30">
              <ButtonMui
                type="outlined"
                size="xlarge"
                onClick={() => {
                  alertClose()
                }}
              >
                Cancel
              </ButtonMui>
              <ButtonMui
                size="xlarge"
                onClick={() => {
                  goToDetail(data.id, process.prcsCode)
                }}
              >
                Details
              </ButtonMui>
            </div>
          ),
          textTitle: `The project cannot be completed because ${process.prcsName} status is ${process.prcsStsName}.`,
          icon: 'warning',
        })
      } else {
        projectStatusMutation.mutate(
          { prjStsCd: 'CMP', id: data.id },
          {
            onSuccess(data, variables, context) {
              projectFetch()
            },
            onError(error, variables, context) {},
          }
        )
      }
    },
    [alertClose, alertOpen, goToDetail, projectFetch, projectStatusMutation]
  )

  const handleProjectInProgress = useCallback(
    (data: ProjectListType) => {
      projectStatusMutation.mutate(
        { prjStsCd: 'ONG', id: data.id },
        {
          onSuccess(data, variables, context) {
            projectFetch()
          },
          onError(error, variables, context) {},
        }
      )
    },
    [projectFetch, projectStatusMutation]
  )

  const getContextList = useCallback(
    (data: ProjectListType) => {
      return [
        { name: 'Authority change request list', onClick: handleChangeProjectAuthList, roleCodes: ['PJM'] },
        { name: 'Authority change request', onClick: handleChangeProjectAuth, roleCodes: ['MGMT', 'EDIT', 'VIEW'] },
        { name: 'Edit project info', onClick: handleModifyProjectInfo, roleCodes: ['PJM', 'MGMT'] },
        { name: 'Project Complete', onClick: handleProjectComplete, roleCodes: ['PJM'], projectStatus: ['ONG'] },
        { name: 'Project Abort', onClick: handleProjectAbort, roleCodes: ['PJM'], projectStatus: ['ONG'] },
        { name: 'Project in progress', onClick: handleProjectInProgress, roleCodes: ['PJM'], projectStatus: ['ABR', 'CMP'] },
        { name: 'Project Delete', onClick: handleDeleteProject, roleCodes: ['PJM'] },
        { name: 'Participate project request', onClick: handleJoinProject, roleCodes: [''] },
      ].filter((item) =>
        !!item.projectStatus
          ? item.roleCodes.includes(data.projectRoleCode) && item.projectStatus.includes(data.prjStsCd)
          : item.roleCodes.includes(data.projectRoleCode)
      )
    },
    [
      handleChangeProjectAuth,
      handleChangeProjectAuthList,
      handleDeleteProject,
      handleJoinProject,
      handleModifyProjectInfo,
      handleProjectAbort,
      handleProjectComplete,
      handleProjectInProgress,
    ]
  )

  const handleProjectClick = useCallback(
    (data: ProjectListType, rowIndex: number, colIndex: number) => {
      router.push(`/project/detail?id=${data.id}`)
    },
    [router]
  )

  return (
    <>
      <div className="sticky_wrap">
        <ContentBox type="top_content">
          <div className="lft">
            <Breadcrumb pageTitleList={pageTitleList} type="project" />
            <h1 className="headline1">Project</h1>
          </div>
          <div className="rgt">
            <ButtonMui size="large" onClick={handleCreateClick} icon="PlusIcon" disabled={getPathInfo(pathname).crtYn === 'N'}>
              Create
            </ButtonMui>
          </div>
        </ContentBox>
        <BaseTab tabData={tabData} onChange={handleTabChange} value={tabIndex} />
      </div>
      <ContentBox>
        <div className="align">
          <div className="lft gap_10">
            <FilterItem label="Period">
              <DateRangePicker
                defaultDate={{ startDate: searchFilterParams?.displayStartDate, endDate: searchFilterParams?.displayEndDate }}
                onChangePickerDate={handlePeriodChange}
                placeholderText="Select period"
              />
            </FilterItem>
            <FilterItem label="Product Category">
              <SelectMui options={cCode['diseaseCategory']} onChange={handleDiseasecategoryChange} value={searchFilterParams?.diseaseCategoryCode || 'all'} />
            </FilterItem>
            <FilterItem label="Purpose">
              <SelectMui options={cCode['purpose']} onChange={handlePurposeChange} value={searchFilterParams?.purposeCode || 'all'} />
            </FilterItem>
            {/* <FilterItem label="Process">
              <SelectMui options={processCodeList} onChange={handleProcessChange} value={searchFilterParams?.processCode || 'all'} />
            </FilterItem> */}
            <FilterItem label="Keyword">
              <SearchIcoInput
                value={valueParam}
                clearValue={() => onValueParamChange('', 'keyword')}
                placeholder="Enter keyword"
                onChangeSearch={onValueParamChange}
                onSearch={handleSearchKeyEvent}
                onSearchClick={handleSearch}
              />
            </FilterItem>
            <ButtonMui
              size="xsmall"
              type="outlined"
              color="gray"
              uiType="reset_btn"
              icon="ResetIcon"
              iconStyle={{ width: 20, height: 20, fill: '#354165' }}
              onClick={handleFilterResetClick}
            />
          </div>
        </div>
        <BoardTable>
          <colgroup>
            <col style={{ width: '7%' }} />
            <col style={{ width: '8%' }} />
            <col style={{ width: '10%' }} />
            <col style={{ width: '15%' }} />
            <col style={{ width: 'auto' }} />
            <col style={{ width: '10%' }} />
            <col style={{ width: '10%' }} />
            <col style={{ width: '7%' }} />
            <col style={{ width: '7%' }} />
            <col style={{ width: '4%' }} />
          </colgroup>
          <thead>
            <tr>
              <th>ID</th>
              <th>Product Category</th>
              <th>Target Market</th>
              <th>Purpose</th>
              <th>Project Name</th>
              <th>Status</th>
              <th>Process</th>
              <th>Corporate</th>
              <th>Due Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {projectListData?.content.map((row, index) => {
              return (
                <tr key={`projectlist-${index}`}>
                  <td
                    onClick={() => {
                      handleProjectClick(row, index, 0)
                    }}
                  >
                    {row.id}
                  </td>
                  <td
                    onClick={() => {
                      handleProjectClick(row, index, 1)
                    }}
                  >
                    {row.dissCatCd}
                  </td>
                  <td
                    onClick={() => {
                      handleProjectClick(row, index, 6)
                    }}
                  >
                    {row.targetMarket || '-'}
                  </td>
                  <td
                    onClick={() => {
                      handleProjectClick(row, index, 2)
                    }}
                  >
                    {row.purpose}
                  </td>
                  <td
                    onClick={() => {
                      handleProjectClick(row, index, 3)
                    }}
                  >
                    {filterParams.projectTab === 'MY' ? row.prjNm : displayProjectName(row)}
                  </td>
                  <td>
                    <StatusLabel status={row.prjStsNm} type="circle">
                      {row.prjStsNm}
                    </StatusLabel>
                  </td>
                  <td
                    onClick={() => {
                      handleProjectClick(row, index, 4)
                    }}
                  >
                    {displayProcess(row)}
                  </td>
                  <td
                    onClick={() => {
                      handleProjectClick(row, index, 5)
                    }}
                  >
                    {row.corporate}
                  </td>
                  <td
                    onClick={() => {
                      handleProjectClick(row, index, 7)
                    }}
                  >
                    {changeTimeLocal({ time: row.dueDate, type: 'yyyy-MM-dd' })}
                  </td>
                  <td>
                    <ContextButton<ProjectListType> rotate={true} iconsize={20} rowData={row} options={getContextList(row)} />
                  </td>
                </tr>
              )
            })}
            {projectListData?.totalElements === 0 && (
              <tr className="nodata">
                <td colSpan={10}>
                  <NoData text="There are no registred projects." className="full" />
                </td>
              </tr>
            )}
          </tbody>
        </BoardTable>
        {projectListData?.totalElements > 0 && (
          <Pagenation
            currentPage={currentPage}
            pageSize={searchFilterParams.size}
            totalCount={projectListData?.totalElements}
            onPageChange={onPageChange}
            totalPage={projectListData?.totalPages}
          />
        )}
      </ContentBox>
    </>
  )
}
