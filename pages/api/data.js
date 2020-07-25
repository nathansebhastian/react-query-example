const items = ['list_one', 'list_two']

export default async (req, res) => {
  await new Promise(r => setTimeout(r, 1000))

  if (req.method === 'POST') {
    const { text } = req.body

    items.push(text)
    res.json(text)
    return
  } else {
    res.json({
      ts: Date.now(),
      items,
    })
  }
}
