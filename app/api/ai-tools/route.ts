import { NextResponse } from 'next/server'
import { gql } from '@apollo/client'
import client from '@/lib/apollo-client'

const GET_AI_TOOLS = gql`
  query GetAITools($category: String!) {
    aiToolCategories(where: {slug: [$category]}) {
      nodes {
        name
        slug
        aiTools {
          nodes {
            id
            title
            excerpt
            slug
            featuredImage {
              node {
                sourceUrl
              }
            }
          }
        }
      }
    }
  }
`

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category')

  if (!category) {
    return NextResponse.json({ error: 'Category parameter is required' }, { status: 400 })
  }

  try {
    const { data } = await client.query({
      query: GET_AI_TOOLS,
      variables: { category },
      fetchPolicy: 'no-cache'
    })

    if (!data.aiToolCategories || !data.aiToolCategories.nodes || data.aiToolCategories.nodes.length === 0) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 })
    }

    const categoryData = data.aiToolCategories.nodes[0]
    const tools = categoryData.aiTools.nodes

    const transformedData = {
      category: {
        name: categoryData.name,
        slug: categoryData.slug
      },
      edges: tools.map((tool: any) => ({ node: { ...tool, aiToolCategories: { nodes: [{ name: categoryData.name, slug: categoryData.slug }] } } }))
    }

    return NextResponse.json(transformedData)
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

