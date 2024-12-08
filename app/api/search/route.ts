import { NextRequest, NextResponse } from 'next/server'
import { gql } from '@apollo/client'
import client from '@/lib/apollo-client'

const SEARCH_AI_TOOLS = gql`
  query SearchAITools($search: String!) {
    aiTools(first: 10, where: { search: $search }) {
      nodes {
        id
        title
        slug
        featuredImage {
          node {
            sourceUrl
          }
        }
      }
    }
  }
`

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get('q')

  if (!query) {
    return NextResponse.json({ error: 'Search query is required' }, { status: 400 })
  }

  try {
    const { data } = await client.query({
      query: SEARCH_AI_TOOLS,
      variables: { search: query },
    })

    return NextResponse.json(data.aiTools.nodes)
  } catch (error) {
    console.error('Error searching AI Tools:', error)
    return NextResponse.json({ error: 'Failed to search AI Tools' }, { status: 500 })
  }
}

