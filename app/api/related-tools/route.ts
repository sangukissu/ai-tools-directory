import { NextRequest, NextResponse } from 'next/server'
import { gql } from '@apollo/client'
import client from '@/lib/apollo-client'

const GET_RELATED_TOOLS = gql`
query GetRelatedTools($category: String!, $currentToolId: ID!, $first: Int!) {
  aiTools(
    where: {
      taxQuery: {
        taxArray: [
          { taxonomy: AI_TOOL_CATEGORY, operator: IN, terms: [$category], field: SLUG }
        ]
      },
      notIn: [$currentToolId]
    }
    first: $first
  ) {
    nodes {
      id
      title
      slug
      featuredImage {
        node {
          sourceUrl
        }
      }
      aiToolCategories {
        nodes {
          name
          slug
        }
      }
    }
  }
}
`

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const category = searchParams.get('category')
  const currentToolId = searchParams.get('currentToolId')
  const first = searchParams.get('first') || '3'

  if (!category || !currentToolId) {
    return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 })
  }

  try {
    const { data } = await client.query({
      query: GET_RELATED_TOOLS,
      variables: { category, currentToolId, first: parseInt(first) },
      fetchPolicy: 'no-cache',
    })

    return NextResponse.json(data.aiTools.nodes)
  } catch (error) {
    console.error('Error fetching related AI Tools:', error)
    return NextResponse.json({ error: 'Failed to fetch related AI Tools' }, { status: 500 })
  }
}

