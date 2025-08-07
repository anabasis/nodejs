import { Icons } from '@ui/components/Icons'

export const ListError = ({ text }: { text: string }) => {
  return (
    <div className="align center flex1">
      <div className="nodata_group" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}>
        <Icons.NoData width={160} height={160} />
        <p>{text}</p>
      </div>
    </div>
  )
}

export default ListError
