import * as React from 'react'
import { domain } from '../lib/config'
import { resolveNotionPage } from '../lib/resolve-notion-page'
import { NotionPage } from '../lib/components'

export const getStaticProps = async (context) => {
  const rawPageId = "a3dd9c923b7845a7b378069d5018924f";

  try {
    const props = await resolveNotionPage(domain, rawPageId)

    return { props, revalidate: 10 }
  } catch (err) {
    console.error('page error', domain, rawPageId, err)

    // we don't want to publish the error version of this page, so
    // let next.js know explicitly that incremental SSG failed
    throw err
  }
}


export default function NotionDomainDynamicPage(props) {
  return <NotionPage {...props} />
}
