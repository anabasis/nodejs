import { RefObject, useCallback, useEffect, useRef, useState } from 'react'

const useInfiniteScroll = (targetRef: RefObject<HTMLElement>) => {
  const observerRef = useRef<IntersectionObserver>()
  const [intersecting, setIntersecting] = useState(false)
  const getObserver = useCallback(() => {
    // observerRef.current값이 있으면 계속 사용 없으면 등록
    if (!observerRef.current) {
      observerRef.current = new IntersectionObserver((entries) => {
        setIntersecting(entries.some((entry) => entry.isIntersecting))
      })
    }

    return observerRef.current
  }, [])

  useEffect(() => {
    if (targetRef.current) {
      getObserver().observe(targetRef.current)
    }
  }, [getObserver, targetRef])

  return intersecting
}

export default useInfiniteScroll
