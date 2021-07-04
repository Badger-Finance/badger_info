import React from 'react'
import { useParams } from 'react-router'

interface RouteParams {
  vaultName: string
}
const Vault = () => {
  const { vaultName } = useParams<RouteParams>()
  return <div>{vaultName}</div>
}
export default Vault
