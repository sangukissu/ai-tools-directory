import { NextResponse } from 'next/server'
import { gql } from '@apollo/client'
import client from '@/lib/apollo-client'

const GET_AI_TOOLS = gql`
  query GetAITools($first: Int!, $after: String, $category: String!) {
    aiTools(
      first: $first, 
      after: $after, 
      where: { 
        status: PUBLISH,
        taxQuery: {
          taxArray: [
            { taxonomy: AI_TOOL_CATEGORY, operator: IN, terms: [$category], field: SLUG }
          ]
        }
      }
    ) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          id
          title
          excerpt
          slug
          aiToolCategories {
            nodes {
              name
              slug
            }
          }
          featuredImage {
            node {
              sourceUrl
            }
          }
        }
      }
    }
  }
`

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const first = parseInt(searchParams.get('first') || '20', 10)
  const after = searchParams.get('after')
  const category = searchParams.get('category')

  if (!category) {
    return NextResponse.json({ error: 'Category parameter is required' }, { status: 400 })
  }

  try {
    const { data } = await client.query({
      query: GET_AI_TOOLS,
      variables: { 
        first,
        after,
        category
      },
      fetchPolicy: 'no-cache'
    })

    return NextResponse.json(data.aiTools)
  } catch (error) {
    console.error('Error fetching AI Tools:', error)
    return NextResponse.json(
      { 
        error: 'Failed to fetch AI Tools',
        details: error instanceof Error ? error.message : 'Unknown error'
      }, 
      { status: 500 }
    )
  }
}

