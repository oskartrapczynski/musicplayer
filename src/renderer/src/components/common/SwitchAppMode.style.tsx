import { Theme } from '@emotion/react'
import { SxProps } from '@mui/material'

const containerStyle: SxProps<Theme> = {
  display: 'flex',
  flexWrap: 'wrap',
  width: '90%',
  border: '2px solid black',
  borderRadius: '5px',
  p: '3px',
  backgroundColor: 'gray'
}
const itemStyle: SxProps<Theme> = {
  width: '100%',
  my: '1px',
  textTransform: 'uppercase',
  fontSize: '10px',
  textAlign: 'center',
  border: '2px solid alpha',
  borderRadius: '5px',
  cursor: 'pointer'
}

const activeItemStyle: SxProps<Theme> = {
  ...itemStyle,
  backgroundColor: 'black',
  color: 'white'
}
export { containerStyle, activeItemStyle, itemStyle }
