import { NextRequest, NextResponse } from 'next/server'
import { gql } from '@apollo/client'
import client from '@/lib/apollo-client'

const GET_AI_TOOL = gql`
query GetAITool($slug: ID!) {
  aiTool(id: $slug, idType: SLUG) {
    id
    title
    content
    excerpt
    slug
    aiToolMeta {
      toolUrl
    }
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
`

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const slug = params.slug;

  try {
    const { data } = await client.query({
      query: GET_AI_TOOL,
      variables: { slug },
    })

    if (!data.aiTool) {
      return NextResponse.json({ error: 'AI Tool not found' }, { status: 404 })
    }

    return NextResponse.json(data.aiTool)
  } catch (error) {
    console.error('Error fetching AI Tool:', error)
    return NextResponse.json({ error: 'Failed to fetch AI Tool' }, { status: 500 })
  }
}

