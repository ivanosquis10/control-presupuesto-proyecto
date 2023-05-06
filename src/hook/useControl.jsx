import { useContext } from 'react'
import { ControlContext } from '../context/ControlProvider'

export const useControl = () => useContext(ControlContext)
