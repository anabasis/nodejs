import React, { useState } from 'react'
import { BoardTable } from 'ui'

export const Header1 = ({ currentIndex }: { currentIndex? }) => {
  const [value, setValue] = useState('')
  return (
    <>
      <div>{currentIndex}</div>
    </>
  )
}

export const Header2 = ({ currentIndex }: { currentIndex? }) => {
  const [value, setValue] = useState('')
  return (
    <>
      <BoardTable>
        <thead>
          <tr>
            <th>{currentIndex}</th>
            <th>타이틀</th>
            <th>타이틀</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>블라블라</td>
            <td>블라블라</td>
            <td>블라블라</td>
          </tr>
          <tr>
            <td>블라블라</td>
            <td>블라블라</td>
            <td>블라블라</td>
          </tr>
        </tbody>
      </BoardTable>
    </>
  )
}
