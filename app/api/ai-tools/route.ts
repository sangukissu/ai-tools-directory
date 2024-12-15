import { NextResponse } from 'next/server'
import { gql } from '@apollo/client'
import client from '@/lib/apollo-client'

const GET_AI_TOOLS = gql`
  query GetAITools($first: Int!, $after: String, $category: String) {
    aiTools(first: $first, after: $after, where: { categoryName: $category }) {
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
  const first = parseInt(searchParams.get('first') || '10', 10)
  const after = searchParams.get('after')
  const category = searchParams.get('category')

  try {
    const { data } = await client.query({
      query: GET_AI_TOOLS,
      variables: { 
        first, 
        after, 
        category: category === 'all' ? null : category 
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

