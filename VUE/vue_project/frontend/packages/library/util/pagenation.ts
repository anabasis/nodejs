type RangeFunType = (start: number, end: number) => number[]

const DOTS = '...'

const range: RangeFunType = (start, end) => {
  let length = end - start + 1

  return Array.from({ length }, (_, idx) => idx + start)
}

interface pageType {
  totalCount: number
  pageSize: number
  siblingCount: number
  page: number
}

const getPageRangeList = ({ totalCount, pageSize, siblingCount, page }: pageType) => {
  const currentPage = page + 1
  const totalPageCount = Math.ceil(totalCount / pageSize)

  // Pages Count =  siblingCount + firstPage + lastPage + currentPage + 2*DOTS

  const totalPageNumbers = 5

  /*
    페이지의 수가 표시할 페이지의 수보다 적은경우는 그대로 반환함
  */
  if (totalPageNumbers >= totalPageCount) {
    return range(1, totalPageCount)
  }

  /*
  Left / Right Dots 조절인덱스
  */
  const leftSiblingIndex = Math.max(currentPage - siblingCount, 1)
  const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPageCount)

  /*
  index를 통해서 조건 활성화 => 실질적으로 Dot이 표시될 위치에 대한 조건
  */
  const leftDots = leftSiblingIndex > 2
  const rightDots = rightSiblingIndex < totalPageCount - 2

  const firstPageIndex = 1
  const lastPageIndex = totalPageCount

  /*
  왼쪽 Dot이 없고 오른쪽 Dot이 있을경우
  */

  if (!leftDots && rightDots) {
    /* 왼쪽Dot 범위설정해서 페이지레인지 재배열  */
    let leftItemCount = 1 + 2 * siblingCount
    let leftRange = range(1, leftItemCount)

    return [...leftRange, DOTS, totalPageCount]
  }
  /*
  왼쪽 Dot이 있고 오른쪽 Dot이 없을경우
  */
  if (leftDots && !rightDots) {
    let rightItemCount = 1 + 2 * siblingCount
    let rightRange = range(totalPageCount - rightItemCount + 1, totalPageCount)
    return [firstPageIndex, DOTS, ...rightRange]
  }
  /*
  둘다 있는경우 범위설정
  */
  if (leftDots && rightDots) {
    let middleRange = range(currentPage, rightSiblingIndex + 2)
    return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex]
  }
  return range(1, totalPageCount)
}

export default getPageRangeList
