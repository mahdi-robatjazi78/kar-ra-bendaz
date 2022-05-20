import * as React from "react"
import {ISidebar} from '../types/sidebar'


export const SidebarContext = React.createContext<ISidebar | null>(null)


export default SidebarContext