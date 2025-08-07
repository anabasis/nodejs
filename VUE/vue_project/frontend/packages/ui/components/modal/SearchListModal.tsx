import InnerTd from '@ui/molecules/InnerTd'
import { AvatarMui, ButtonMui } from '@ui/index'
import { Checkbox } from '@ui/components/form/Check'
import { SearchIcoInput } from '@ui/components/form/SearchIcoInput'
import { BoardTable } from '@ui/components/table/BoardTable'
import { EllipsisTypo } from '@ui/components/typo/EllipsisTypo'
import { useEffect, useState } from 'react'

const SearchListModal = ({ openLevelArr }: { openLevelArr: any }) => {
  const [test, setTest] = useState([])
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked
    if (checked) {
      const checkedData = openLevelArr.filter((data) => data.name === event.target.name)
      setTest((prev) => [...prev, ...checkedData])
    }
    if (!checked) {
      const checkedData = test.filter((data) => data.name !== event.target.name)
      setTest(checkedData)
    }
  }

  useEffect(() => {
    console.log(19, test)
  }, [test])
  return (
    <>
      <div className="mt_20">
        <SearchIcoInput placeholder="Input here.." onChangeSearch={() => console.log('')} onSearch={() => console.log('')} />
      </div>
      <div className="mt_10">
        <BoardTable>
          <colgroup>
            <col width="12%" />
            <col width="30%" />
            <col width="58%%" />
          </colgroup>
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Organization</th>
            </tr>
          </thead>
          <tbody>
            {openLevelArr &&
              openLevelArr.map((open: any) => (
                <tr key={open.id}>
                  <td>
                    <Checkbox id={`checkbox_${open.id}`} name={open.name} size="xs" onChange={onChange} />
                  </td>
                  <td>
                    <InnerTd>
                      <AvatarMui data={[{ src: 'https://dimg.donga.com/wps/NEWS/IMAGE/2023/01/04/117284300.2.jpg', alt: '아바타' }]} />
                      <EllipsisTypo>{open.name}</EllipsisTypo>
                    </InnerTd>
                  </td>
                  <td>{open.organization}</td>
                </tr>
              ))}
          </tbody>
        </BoardTable>
      </div>

      {/* 하단 버튼 예제 */}
      <div className="align center mt_30">
        <ButtonMui type="outlined" size="xlarge">
          Cancel
        </ButtonMui>
        <ButtonMui size="xlarge">Register</ButtonMui>
      </div>
    </>
  )
}

export default SearchListModal
