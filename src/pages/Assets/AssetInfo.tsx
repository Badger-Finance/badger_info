import React from 'react'
import { useParams } from 'react-router'
interface RouteParams {
  asset: string
}
const Asset = () => {
  const { asset } = useParams<RouteParams>()
  return <div>{asset}</div>
}
export default Asset
