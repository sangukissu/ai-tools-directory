import { NextResponse } from 'next/server'
import { gql } from '@apollo/client'
import client from '@/lib/apollo-client'

const GET_CATEGORIES = gql`
  query GetCategories {
    aiToolCategories(first: 100) {
      nodes {
        id
        name
        slug
        count
        description
      }
    }
  }
`

export async function GET() {
  try {
    const { data } = await client.query({
      query: GET_CATEGORIES,
      fetchPolicy: 'network-only', // This ensures we always fetch from the network
    })

    return NextResponse.json(data.aiToolCategories)
  } catch (error) {
    console.error('Error fetching categories:', error)
    return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 })
  }
}

