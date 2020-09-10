/* eslint-disable react/prop-types */
import React from 'react'
import PropTypes from 'prop-types'
import { number, select } from '@storybook/addon-knobs'

import Column from '../Column'
import Grid from '.'

const componentWithStyle = (Component, styles) => {
  Component.propTypes = {
    styles: PropTypes.object
  }
  // eslint-disable-next-line
  return props => <Component {...props} styles={styles}>{props.children}</Component>
}

const gridStyle = {
  paddingTop: 8,
  paddingBottom: 8,
  background: '#00FFFF',
  color: 'var(--be-text-primary-dark)',
  fontWeight: 600
}

const columnStyle = {
  padding: 8,
  marginTop: 4,
  marginBottom: 4,
  background: '#FF9AF5',
  color: 'var(--be-text-primary-dark)',
  textAlign: 'center',
  overflow: 'hidden',
  fontWeight: 600
}

const StyledGrid = componentWithStyle(Grid, gridStyle)

const StyledColumn = componentWithStyle(Column, columnStyle)

const gridProps = () => ({
  margin: number('Margin', 16),
  gutter: number('Gutter', 16),
  offsetRight: number('Offset right', 0),
  offsetLeft: number('Offset left', 0),
  aligment: select(
    'Align',
    {
      Center: 'center',
      Right: 'right',
      Left: 'left'
    },
    'left'
  )
})

const gridEnrichedProps = () => ({
  margin: {
    mobile: number('Margin mobile', 16),
    tablet: number('Margin tablet', 24),
    desktop: number('Margin desktop', 24)
  },
  gutter: {
    mobile: number('Gutter mobile', 16),
    tablet: number('Gutter tablet', 24),
    desktop: number('Gutter desktop', 24)
  },
  offsetRight: {
    mobile: number('Offset right mobile', 0),
    tablet: number('Offset right tablet', 0),
    desktop: number('Offset right desktop', 0)
  },
  offsetLeft: {
    mobile: number('Offset left mobile', 0),
    tablet: number('Offset left tablet', 0),
    desktop: number('Offset left desktop', 0)
  },
  aligment: select(
    'Align',
    {
      Center: 'center',
      Right: 'right',
      Left: 'left'
    },
    'left'
  )
})

const columnProps = () => new Array(4).fill({
  mobile: number('Column mobile', 1),
  tablet: number(' Column tablet', 1),
  desktop: number('Column desktop', 1),
  offsetRight: number('Column offset right', 0),
  offsetLeft: number('Column offset left', 0),
  aligment: select(
    'Column Align',
    {
      Center: 'center',
      Right: 'right',
      Left: 'left'
    },
    'left'
  )
})

export default { title: 'Layout|Grid' }

export const grid = () => (
  <StyledGrid>
    <StyledColumn>Column</StyledColumn>
    <StyledColumn>Column</StyledColumn>
  </StyledGrid>
)

export const withCustomProps = () => (
  <StyledGrid {...gridProps()}>
    <StyledColumn>Column</StyledColumn>
    <StyledColumn>Column</StyledColumn>
    <StyledColumn>Column</StyledColumn>
    <StyledColumn>Column</StyledColumn>
  </StyledGrid>
)

export const withCustomEnrichedProps = () => (
  <StyledGrid {...gridEnrichedProps()}>
    <StyledColumn>Column</StyledColumn>
    <StyledColumn>Column</StyledColumn>
    <StyledColumn>Column</StyledColumn>
  </StyledGrid>
)

export const gridWithColumnProps = () => (
  <StyledGrid {...gridProps()}>
    {columnProps().map(props => (
      <StyledColumn {...props} key={props.mobile}>
        m: {props.mobile},
        tb: {props.tablet},
        ds: {props.desktop},
        aln: {props.aligment},
        ofr: {props.offsetRight},
        ofl: {props.offsetLeft}
      </StyledColumn>
    ))}
  </StyledGrid>
)
