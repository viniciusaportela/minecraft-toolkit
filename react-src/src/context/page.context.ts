import {createContext, useContext} from "react";

export const PageContext = createContext({ page: "projects", setPage: (_: string) => { } })

export const usePage = () => {
  const context = useContext(PageContext)
  if (!context) {
    throw new Error("usePage must be used within a PageContext.Provider")
  }
  return context
}