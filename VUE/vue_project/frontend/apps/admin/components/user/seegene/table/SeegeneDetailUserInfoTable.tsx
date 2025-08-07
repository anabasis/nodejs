import { AvatarMui, BoardTable, ButtonMui, DetailTable, Icons, NoData } from 'ui'
import { ModalType, changeTimeLocal, useModal } from 'library'
import { LoginHistoryType, SeegeneDetailInfo } from '@type/user/user'
import { useTranslation } from 'library/i18n/client'

interface SeegeneDetailUserInfoTableProps {
  no: string
  data: SeegeneDetailInfo
  history: LoginHistoryType[] | []
}

const SeegeneDetailUserInfoTable = (props: SeegeneDetailUserInfoTableProps) => {
  const { no, data, history } = props
  const { t } = useTranslation('platform')

  const { modalOpen } = useModal()

  const changeLastCountry = () => {
    if (!data.hasOwnProperty('lastAccessCountry')) return '-'
    else if (data.lastAccessCountry === 'Korea (the Republic of)') return 'REPUBLIC OF KOREA'
    return data.lastAccessCountry
  }

  const LoginHistoryModal: ModalType = {
    title: t('ZaBb'),
    textTitle: 'The log-in history provides up to 300 records from the last 90 days.',
    content: (
      <BoardTable style={{ minHeight: '300px', maxHeight: '500px' }}>
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
                  src: data.fileInfoPrvResponse?.preSignedUrl || '/images/no_icon.png', //no icon image
                  alt: 'Profile',
                },
              ]}
            />
          </div>
        </td>
      </tr>
      <tr>
        <th>{t('CwmC')}</th>
        <td>{data.userName}</td>
        <th>{t('yMUt')}</th>
        <td>{data.emailId}</td>
      </tr>
      <tr>
        <th>{t('orzY')}</th>
        <td>{data.corporationName || '-'}</td>
        <th>{t('TPEV')}</th>
        <td>{data.departmentName || '-'}</td>
      </tr>
      <tr>
        <th>{t('uDYy')}</th>
        <td>{data.positionName || '-'}</td>
        <th>{t('GSqS')}</th>
        <td>{changeTimeLocal({ time: data.memberRegDate, type: 'yyyy-MM-dd' })}</td>
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
            <em className="body3">
              {`${data.lastAccessDate ? changeTimeLocal({ time: data.lastAccessDate, type: 'yyyy-MM-dd HH:mm:ss' }) : '-'} / ${
                data.lastAccessIp ?? '-'
              } / ${changeLastCountry()}`}
            </em>
          </ButtonMui>
        </td>
      </tr>
    </DetailTable>
  )
}

export default SeegeneDetailUserInfoTable
