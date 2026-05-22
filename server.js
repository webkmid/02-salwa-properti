import express from 'express'
import cors from 'cors'

const app = express()
app.use(cors())
app.use(express.json())

const NOTION_API_KEY = process.env.NOTION_API_KEY
const DATABASE_ID = process.env.NOTION_DATABASE_ID

const notionHeaders = {
  'Authorization': `Bearer ${NOTION_API_KEY}`,
  'Content-Type': 'application/json',
  'Notion-Version': '2022-06-28',
}

// Get all properties
app.post('/api/properties', async (req, res) => {
  try {
    const response = await fetch(
      `https://api.notion.com/v1/databases/${DATABASE_ID}/query`,
      {
        method: 'POST',
        headers: notionHeaders,
        body: JSON.stringify({
          filter: {
            property: 'Status',
            select: { does_not_equal: 'Terjual' }
          },
          sorts: [{ timestamp: 'created_time', direction: 'descending' }]
        })
      }
    )
    const data = await response.json()
    res.json(data)
  } catch (err) {
    res.status(500).json({ error: 'Gagal fetch dari Notion' })
  }
})

// Get single property
app.get('/api/properties/:id', async (req, res) => {
  try {
    const response = await fetch(
      `https://api.notion.com/v1/pages/${req.params.id}`,
      { headers: notionHeaders }
    )
    const data = await response.json()
    res.json(data)
  } catch (err) {
    res.status(500).json({ error: 'Properti tidak ditemukan' })
  }
})

app.listen(3001, () => console.log('Proxy server running on port 3001'))