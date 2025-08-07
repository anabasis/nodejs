// 직압지 : 김병기

import * as React from 'react'
import CircularProgressMui from '@mui/material/CircularProgress'
import styles from '@ui/styles/mui/_progress.module.scss'

interface CircularProgressProps {}

export const CircularProgress = ({ ...others }: CircularProgressProps) => {
  const {} = others
  const [progress, setProgress] = React.useState(0)

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => (prevProgress >= 100 ? 100 : prevProgress + 10))
    }, 300)

    return () => {
      clearInterval(timer)
    }
  }, [])
  return (
    <>
      <div className={[styles['progress'], [styles['circular']]].join(' ')}>
        <div className={[styles['circular_box']].join(' ')}>
          <CircularProgressMui
            sx={{
              strokeLinecap: 'round',
            }}
            classes={{ root: styles['circular_data'] }}
            size={'100%'}
            thickness={8}
            variant="determinate"
            value={progress}
          />
        </div>
        <p>{`${Math.round(progress)}%`}</p>
        {progress <= 100 && <span>Loading...</span>}
      </div>
    </>
  )
}
