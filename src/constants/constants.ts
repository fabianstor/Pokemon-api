import { createContext } from 'react'
import { IContext } from './interface.interface'

export const filterContext = createContext<IContext>({} as IContext)