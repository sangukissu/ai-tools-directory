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
    affiliateLink
  }
}
`

export async function GET(
req: NextRequest,
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
  console.error('Error fetching AI Tool:', JSON.stringify(error, null, 2))
  return NextResponse.json({ error: 'Failed to fetch AI Tool' }, { status: 500 })
}
}

