import { NextRequest, NextResponse } from 'next/server'
import { gql } from '@apollo/client'
import client from '@/lib/apollo-client'
import { revalidatePath } from 'next/cache'

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
    modifiedGmt
    pricing
  }
}
`

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  const slug = params.slug;

  try {
    // Clear Apollo cache before making the query
    await client.cache.reset()
    
    const { data } = await client.query({
      query: GET_AI_TOOL,
      variables: { slug },
      fetchPolicy: 'no-cache', // Ensure we never use cached data
    })

    if (!data.aiTool) {
      return NextResponse.json({ error: 'AI Tool not found' }, { status: 404 })
    }

    // Force revalidation of the tool page
    revalidatePath(`/tool/${slug}`)

    return NextResponse.json(data.aiTool)
  } catch (error) {
    console.error('Error fetching AI Tool:', JSON.stringify(error, null, 2))
    return NextResponse.json({ error: 'Failed to fetch AI Tool' }, { status: 500 })
  }
}

