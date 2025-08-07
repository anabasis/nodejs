'use client'

import { ButtonMui } from 'ui/mui'
import { ChangeEvent, Dispatch, SetStateAction, useCallback, useEffect } from 'react'
import { BaseInput, DetailTable, Icons, InputDec, InputGroup } from 'ui/components'

export const FavoriteWeb = ({
  bookmarkUrlList,
  setBookmarkUrlList,
}: {
  bookmarkUrlList: { urlName: string; url: string; favTp: string; err?: string }[]
  setBookmarkUrlList: Dispatch<
    SetStateAction<
      {
        urlName: string
        url: string
        favTp: string
        err?: string
      }[]
    >
  >
}) => {
  const handleAdd = useCallback(() => {
    setBookmarkUrlList((prev) => prev.concat({ urlName: '', url: '', favTp: 'WEB' }))
  }, [setBookmarkUrlList])

  return (
    <>
      {bookmarkUrlList.map((item, index) => (
        <UrlObj key={`${index}`} index={index} item={item} setBookmarkUrlList={setBookmarkUrlList} total={bookmarkUrlList.length} />
      ))}
      <ButtonMui color="secondary" onClick={handleAdd} disabled={bookmarkUrlList.length >= 4}>
        Add
      </ButtonMui>
    </>
  )
}

const UrlObj = ({
  index,
  item,
  setBookmarkUrlList,
  total,
}: {
  index: number
  item: { urlName: string; url: string; favTp: string; err?: string }
  setBookmarkUrlList: Dispatch<
    SetStateAction<
      {
        urlName: string
        url: string
        favTp: string
        err?: string
      }[]
    >
  >
  total: number
}) => {
  const handleUrlName = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setBookmarkUrlList((prev) =>
        prev.map((web, webIndex) => {
          return index === webIndex ? { ...web, urlName: event.target.value } : web
        })
      )
    },
    [index, setBookmarkUrlList]
  )

  const handleUrl = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      var RegExp = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
      setBookmarkUrlList((prev) =>
        prev.map((web, webIndex) => {
          return index === webIndex
            ? { ...web, url: event.target.value, err: RegExp.test(event.target.value) ? undefined : 'Please enter the correct URL format.' }
            : web
        })
      )
    },
    [index, setBookmarkUrlList]
  )

  const handleDelete = useCallback(
    (index: number) => {
      setBookmarkUrlList((prev) => prev.filter((web, webIndex) => webIndex !== index))
    },
    [setBookmarkUrlList]
  )

  return (
    <div className="bg_box mb_20 pad_20">
      <div className="align">
        <p className="title2">Favorite web {`${index + 1}`}</p>
        {/* {(index !== 0 || total > 1) && ( */}
        <button onClick={() => handleDelete(index)}>
          <Icons.DeleteIcon fill="var(--navy800)" width={20} height={20} />
        </button>
        {/* )} */}
      </div>
      <DetailTable
        colgroup={
          <colgroup>
            <col width="20%" />
            <col width="80%" />
          </colgroup>
        }
      >
        <tr>
          <th>Name of website</th>
          <td className="pr_0">
            <BaseInput placeholder="Please enter website name." value={item.urlName} maxLength={12} onChange={handleUrlName} />
          </td>
        </tr>
        <tr>
          <th className="va_top pt_20">URL</th>
          <td className="va_top pr_0">
            <InputGroup>
              <BaseInput placeholder="Please enter URL." value={item.url} onChange={handleUrl} error={!!item.err} />
              {item.err && <InputDec msg={item.err} error={!!item.err} />}
            </InputGroup>
          </td>
        </tr>
      </DetailTable>
    </div>
  )
}
