'use client'

import { ButtonMui, LineTab } from 'ui/index'
import { useCallback, useEffect, useMemo, useState } from 'react'

import { FavoriteWeb } from './FavoriteWeb'
import { FavoriteTool } from './FavoriteTool'
import { useBookmarkMutaion, useBookmarkToolModifyMutation, useBookmarkUrlodifyMutation, useMyBookmarkList } from '@store/server/useDashboardQuery'

export const FavoritePopup = ({ modalClose }) => {
  const [activeTab, setActiveTab] = useState(0)
  const [bookmarkToolList, setBookmarkToolList] = useState<{ toolId: number; toolName: string; favTp: string }[]>([])
  const [bookmarkUrlList, setBookmarkUrlList] = useState<{ urlName: string; url: string; favTp: string; err?: string }[]>([])

  const { data: myFavoriteList } = useMyBookmarkList()

  const bookmarkMutation = useBookmarkMutaion()

  useEffect(() => {
    if (!!myFavoriteList) {
      setBookmarkToolList(
        myFavoriteList.toolResponse.map((item) => {
          return { toolId: item.toolId, toolName: item.toolName, favTp: 'TOL' }
        })
      )
      setBookmarkUrlList(
        myFavoriteList.urlReponse.map((item) => {
          return { url: item.url, urlName: item.urlName, favTp: 'WEB' }
        })
      )
      if (myFavoriteList.urlReponse.length === 0) {
        setBookmarkUrlList([{ url: '', urlName: '', favTp: 'WEB' }])
      }
    }
  }, [myFavoriteList])

  // 탭 데이터와 모든 도구 데이터 정의
  const tabData = useMemo(() => {
    return [
      { tabName: 'Tools', component: <FavoriteTool setBookmarkToolList={setBookmarkToolList} bookmarkToolList={bookmarkToolList} /> },
      { tabName: 'Web', component: <FavoriteWeb bookmarkUrlList={bookmarkUrlList} setBookmarkUrlList={setBookmarkUrlList} /> },
    ]
  }, [bookmarkToolList, bookmarkUrlList])

  const handleSave = useCallback(() => {
    // toolMutation.mutate(bookmarkToolList, {
    //   onSuccess(data, variables, context) {
    //     if (!urlMutation.isLoading) {
    //       modalClose()
    //     }
    //   },
    //   onError(error, variables, context) {},
    // })
    // urlMutation.mutate(
    //   bookmarkUrlList.filter((item) => item.url !== '' && item.urlName !== ''),
    //   {
    //     onSuccess(data, variables, context) {
    //       if (!toolMutation.isLoading) {
    //         modalClose()
    //       }
    //     },
    //   }
    // )
    bookmarkMutation.mutate(
      { tool: bookmarkToolList, url: bookmarkUrlList.filter((item) => item.url !== '' && item.urlName !== '') },
      {
        onSuccess(data, variables, context) {
          modalClose()
        },
      }
    )
  }, [bookmarkMutation, bookmarkToolList, bookmarkUrlList, modalClose])

  const handleTabIndex = useCallback(({ newIndex }) => {
    setActiveTab(newIndex)
  }, [])

  const activeTabContent = useMemo(() => {
    return tabData[activeTab].component
  }, [tabData, activeTab])

  const isDisabled = useMemo(() => {
    if (activeTab === 0) {
      return (
        JSON.stringify(
          myFavoriteList.toolResponse.map((item) => {
            return { toolId: item.toolId, toolName: item.toolName, favTp: 'TOL' }
          })
        ) === JSON.stringify(bookmarkToolList)
      )
    } else if (activeTab === 1) {
      if (bookmarkUrlList.find((item) => item.url === '' || item.urlName === '') !== undefined) {
        return true
      } else {
        return (
          JSON.stringify(
            myFavoriteList.urlReponse.map((item) => {
              return { url: item.url, urlName: item.urlName, favTp: 'WEB' }
            })
          ) === JSON.stringify(bookmarkUrlList)
        )
      }
    }
    return true
  }, [activeTab, bookmarkToolList, bookmarkUrlList, myFavoriteList])

  return (
    <>
      <LineTab tabData={tabData} onChange={handleTabIndex} value={activeTab} />
      <div className="scroll_y h440">{activeTabContent}</div>
      <div className="align center mt_30">
        <ButtonMui type="outlined" size="xlarge" onClick={() => modalClose()}>
          Cancel
        </ButtonMui>
        <ButtonMui
          size="xlarge"
          disabled={isDisabled}
          onClick={handleSave}
          uiType={bookmarkMutation.isLoading ? 'loading' : ''}
          iconStyle={{ fill: '#fff' }}
          icon={bookmarkMutation.isLoading ? 'Loading' : null}
        >
          Save
        </ButtonMui>
      </div>
    </>
  )
}
