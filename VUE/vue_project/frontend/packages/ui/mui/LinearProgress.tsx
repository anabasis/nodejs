//작업자 : 김병기

import * as React from 'react'
import LinearProgressMui from '@mui/material/LinearProgress'
import styles from '@ui/styles/mui/_progress.module.scss'

interface LinearProgressProps {}

export const LinearProgress = ({ ...others }: LinearProgressProps) => {
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
      <div className={[styles['progress'], [styles['linear']]].join(' ')}>
        <p>{`${Math.round(progress)}%`}</p>
        <div className={[styles['linear_box']].join(' ')}>
          <LinearProgressMui
            classes={{ root: styles['linear_data'], bar: styles['linear_bar'] }}
            // thickness={8}
            variant="determinate"
            value={progress}
          />
        </div>
        {progress <= 100 && <span>Loading...</span>}
      </div>
    </>
  )
}
