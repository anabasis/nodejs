// 작업자 : 최유희
import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import 'ui/styles/global.scss'

const meta = {
  title: 'Guide/Typography',
  tags: ['autodocs'],
} satisfies Meta

export default meta

export const headline1 = () => <p className="headline1">headline1</p>

export const headline2 = () => <p className="headline2">headline2</p>

export const headline3 = () => <p className="headline3">headline3</p>

export const headline4 = () => <p className="headline4">headline4</p>

export const headline5 = () => <p className="headline5">headline5</p>

export const title1 = () => <p className="title1">title1</p>

export const title2 = () => <p className="title2">title2</p>

export const title3 = () => <p className="title3">title3</p>

export const body1 = () => <p className="body1">body1</p>

export const body2 = () => <p className="body2">body2</p>

export const body3 = () => <p className="body3">body3</p>

export const body4 = () => <p className="body4">body4</p>

export const caption = () => <p className="cap">caption1</p>

export const captionHighlight = () => <p className="capH">caption highlight</p>
