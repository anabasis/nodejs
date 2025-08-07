import { AvatarMui, BoardTable, ButtonMui, DetailTable, NoData } from 'ui'
import { ModalType, changeTimeLocal, useModal } from 'library'
import { LoginHistoryType, NewCoDetailInfo } from '@type/user/user'
import { useTranslation } from 'library/i18n/client'

interface NewCoDetailUserInfoTableProps {
  no: string
  data: NewCoDetailInfo
  history: LoginHistoryType[] | []
}

const NewCoDetailUserInfoTable = (props: NewCoDetailUserInfoTableProps) => {
  const { no, data, history } = props
  const { t } = useTranslation('platform')
  let list = data.lastAccessDate !== null ? data.lastAccessDate.split('/') : [data.createDate, '-', '-']

  const { modalOpen } = useModal()

  const changeLastCountry = (country: string) => {
    if (!country) return '-'
    else if (country === 'South Korea') return 'REPUBLIC OF KOREA'
    return country
  }

  const LoginHistoryModal: ModalType = {
    title: t('ZaBb'),
    textTitle: 'The log-in history provides up to 300 records from the last 90 days.',
    content: (
      <BoardTable className="h330">
        <colgroup>
          <col style={{ width: 'auto' }} />
          <col style={{ width: 'auto' }} />
          <col style={{ width: 'auto' }} />
        </colgroup>
        <thead className="sticky">
          <tr>
            <th>Date</th>
            <th>IP</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          {history.length === 0 ? (
            <tr className="nodata">
              <td colSpan={3}>
                <NoData text="There are no login histories." />
              </td>
            </tr>
          ) : (
            history.map((item: LoginHistoryType, index: number) => {
              return (
                <tr key={index}>
                  <td>{changeTimeLocal({ time: item.loginDt, type: 'yyyy-MM-dd HH:mm:ss' })}</td>
                  <td>{item.ipAddr}</td>
                  <td>{item.cntryNm === 'South Korea' ? 'REPUBLIC OF KOREA' : item.cntryNm}</td>
                </tr>
              )
            })
          )}
        </tbody>
      </BoardTable>
    ),
  }

  return (
    <DetailTable
      colgroup={
        <colgroup>
          <col style={{ width: '15%' }} />
          <col style={{ width: '35%' }} />
          <col style={{ width: '15%' }} />
          <col style={{ width: '35%' }} />
        </colgroup>
      }
    >
      <tr>
        <th>{t('YodX')}</th>
        <td>{no || '-'}</td>
        <th>{t('cFZJ')}</th>
        <td>
          <div className="align start">
            <AvatarMui
              size="medium"
              type="circular"
              data={[
                {
                  src: data.fileInfoResponse?.preSignedUrl || '/images/no_icon.png',
                  alt: 'Profile',
                },
              ]}
            />
          </div>
        </td>
      </tr>
      <tr>
        <th>{t('CwmC')}</th>
        <td>{data.fullName}</td>
        <th>{t('yMUt')}</th>
        <td>{data.emailId}</td>
      </tr>
      <tr>
        <th>{t('orzY')}</th>
        <td>{data.corporationName || '-'}</td>
        <th>{t('TPEV')}</th>
        <td>{data.organization || '-'}</td>
      </tr>
      <tr>
        <th>{t('uDYy')}</th>
        <td>{data.jobTile || '-'}</td>
        <th>{t('GSqS')}</th>
        <td>{changeTimeLocal({ time: data.createDate, type: 'yyyy-MM-dd' })}</td>
      </tr>
      <tr>
        <th>{t('hgrU')}</th>
        <td>{data.jobName || '-'}</td>
        <th>{t('ZaBb')}</th>
        <td>
          <ButtonMui
            type="text"
            icon="AngleIcon"
            iconStyle={{ fill: 'var(--navy800)' }}
            positions="right"
            onClick={() => modalOpen(LoginHistoryModal)}
            className="tl"
          >
            <em className="body3">{`${data.lastAccessDate ? changeTimeLocal({ time: list[0], type: 'yyyy-MM-dd HH:mm:ss' }) : '-'} / ${
              list[1] ?? '-'
            } / ${changeLastCountry(list[2])}`}</em>
          </ButtonMui>
        </td>
      </tr>
    </DetailTable>
  )
}

export default NewCoDetailUserInfoTable
