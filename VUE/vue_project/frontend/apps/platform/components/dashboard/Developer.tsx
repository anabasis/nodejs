'use client'

import { EllipsisTypo, Icons, NoticeSwiper, ContentBox, Footer } from 'ui'
import { FavoritePopup } from './developer/FavoritePopup'
import { useModal, ModalType } from 'library/hook/useModal'
import { useMyBookmarkList } from '@store/server/useDashboardQuery'
import { getCdnFileUrl } from 'library/util'
import { UrlType } from '@type/dashboard/dashboardType'
import { MyUpdate } from './developer/MyUpdate'
import { RecentPage } from './developer/RecentPage'
import Image from 'next/image'
import { useCallback } from 'react'

export default function Developer() {
  const { modalOpen, modalClose } = useModal()

  const { data: myFavoriteList, refetch: bookmarkFetch } = useMyBookmarkList()

  const handleSettingClose = useCallback(() => {
    bookmarkFetch()
    modalClose()
  }, [bookmarkFetch, modalClose])

  const handleSettingFavorites = useCallback(() => {
    modalOpen({
      title: 'Favorites setting',
      textTitle: `You can add up to 4 tools by selecting favorite tools. \n And if you have a website visit frequently please register favorite web by adding it.`,
      maxWidth: 'l',
      linetitle: false,
      content: <FavoritePopup modalClose={handleSettingClose} />,
    })
  }, [handleSettingClose, modalOpen])

  return (
    <>
      <div className="flex_wrapper">
        <div className="content_left">
          <ContentBox type="dashboard_home">
            <MyUpdate />
          </ContentBox>
          <ContentBox type="dashboard">
            <div className="align">
              <div className="w28">
                <div className="cont_title_box mb_16">
                  <p className="title1">Favorite Tools</p>
                </div>
                {myFavoriteList?.toolResponse.length > 0 && (
                  <div className="align start gap_10 scroll_x">
                    {myFavoriteList?.toolResponse.map((item) => (
                      <button
                        className="favcon lg"
                        key={item.toolId}
                        onClick={() => {
                          window.open(item.toolLink)
                        }}
                      >
                        <Image src={getCdnFileUrl(item.toolRauncherIcon)} alt="" width="63" height="80" />
                      </button>
                    ))}
                    {new Array(4 - myFavoriteList?.toolResponse.length).fill(0).map((item: number, index) => {
                      return (
                        <button className="favcon lg" key={`tool-${index}`}>
                          <i className="no_image square"></i>
                        </button>
                      )
                    })}
                  </div>
                )}
                {/* 데이터가 없을때 */}
                {myFavoriteList?.toolResponse.length === 0 && <p className="card nodata">Please add favorite tools.</p>}
              </div>
              <div className="w70 ">
                <div className="align cont_title_box mb_16">
                  <div className="lft">
                    <p className="title1">
                      <span className="mr_10">Favorite Web</span>
                    </p>
                  </div>
                  <div className="rgt">
                    <button onClick={handleSettingFavorites}>
                      <Icons.SettingIcon width={20} height={20} fill="#354165" />
                    </button>
                  </div>
                </div>
                {myFavoriteList?.urlReponse.length > 0 && (
                  <div className="align start gap_10 scroll_x">
                    {myFavoriteList?.urlReponse.map((item: UrlType) => (
                      <a href={item.url} target="_blank" className="card web" key={item.urlName}>
                        <div className="favcon">
                          {/* @ts-ignore */}
                          <Image src={`${item.url}/favicon.ico`} alt={item.urlName} width="24" height="24" onError={(e) => (e.target.className = 'hidden')} />
                        </div>
                        <dl className="pl_10">
                          <dt className="body1 navy800">{item.urlName}</dt>
                          <dd className="caption navy400">
                            <EllipsisTypo>{item.url}</EllipsisTypo>
                          </dd>
                        </dl>
                      </a>
                    ))}
                  </div>
                )}
                {myFavoriteList?.urlReponse.length === 0 && <p className="card nodata">Please add favorite websites.</p>}
              </div>
            </div>
          </ContentBox>
          <ContentBox type="dashboard" className="ptb_20">
            <NoticeSwiper />
            <Footer />
          </ContentBox>
        </div>
        <div className="content_right">
          <RecentPage />
        </div>
      </div>
    </>
  )
}
