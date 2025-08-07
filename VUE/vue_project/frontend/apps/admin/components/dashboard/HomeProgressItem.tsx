import { useRouter } from 'next/navigation'
import { ProgressInfoType } from '@type/home'
type HomeProgressItemType = Omit<ProgressInfoType, 'value'> & {
  count: number
  src: string
  shouldRender: boolean
}

export const HomeProgressItem = ({ title, imageSrc, src, count, desc, shouldRender = false }: HomeProgressItemType) => {
  const router = useRouter()

  return (
    <>
      {shouldRender ? (
        <div className="card admin cursor_p" onClick={() => router.push(src)}>
          <div className="align">
            <p className="title1 navy400">{title}</p>
            <div className="dashicon">
              <img src={`/images/D_icon_${imageSrc}.png`} width="44px" alt={imageSrc} />
            </div>
          </div>
          <div className="btm">
            <h2 className="headline2 navy800">{count}</h2>
            <p className="body2 navy200 mt_10">{desc}</p>
          </div>
        </div>
      ) : null}
    </>
  )
}
