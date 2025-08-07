'use client'
import { pdfjs, Document, Page } from 'react-pdf'
import 'react-pdf/dist/esm/Page/AnnotationLayer.css'
import 'react-pdf/dist/esm/Page/TextLayer.css'
import 'ui/styles/pdfViewer.scss'
import { useCallback, useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { useIntersectionObserver } from '@wojtekmaj/react-hooks'

pdfjs.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.min.js', import.meta.url).toString()

const options = {
  cMapUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/cmaps/`,
}

const observerConfig = {
  // How much of the page needs to be visible to consider page visible
  threshold: 0,
}

function PageWithObserver({ pageNumber, setPageVisibility, ...otherProps }) {
  const [page, setPage] = useState(null)

  const onIntersectionChange = useCallback(
    ([entry]) => {
      setPageVisibility(pageNumber, entry.isIntersecting)
    },
    [pageNumber, setPageVisibility]
  )

  useIntersectionObserver(page, observerConfig, onIntersectionChange)

  return <Page canvasRef={setPage} renderAnnotationLayer={false} renderTextLayer={false} pageNumber={pageNumber} {...otherProps} />
}

const PdfViewerPage = () => {
  const searchParams = useSearchParams()
  const [numPages, setNumPages] = useState(null)
  const [visiblePages, setVisiblePages] = useState(null)
  const isTokenPath = !!searchParams.get('tokenPath')

  const filePath = useMemo(() => {
    if (isTokenPath) {
      const tokenId = 'X-Amz-Security-Token'
      const paths = decodeURIComponent(searchParams.toString().split('tokenPath=')[1]).split(tokenId)
      return paths[0] + tokenId + paths[1]
    }
    return searchParams.get('path')
  }, [isTokenPath])

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages)
  }

  const setPageVisibility = useCallback((pageNumber, isIntersecting) => {
    setVisiblePages((prevVisiblePages) => ({
      ...prevVisiblePages,
      [pageNumber]: isIntersecting,
    }))
  }, [])
  const pageInfo = () => {
    return `${
      Object.entries(visiblePages)
        .filter(([key, value]) => value)
        .map(([key]) => key)[0]
    } / ${numPages}`
  }

  const setHeight = (h: number) => (h / 100) * document.documentElement.clientHeight

  return (
    <div id="pdfWrap" onContextMenu={(e) => e.preventDefault()}>
      <Document options={options} file={filePath} onLoadSuccess={onDocumentLoadSuccess}>
        {Array.from(new Array(numPages), (el, index) => (
          <PageWithObserver key={`page_${index + 1}`} pageNumber={index + 1} setPageVisibility={setPageVisibility} height={setHeight(95)} />
        ))}
      </Document>
      {visiblePages && numPages && <div className="page">{pageInfo()}</div>}
    </div>
  )
}

export default PdfViewerPage
