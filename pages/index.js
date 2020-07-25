import React from 'react'
import axios from 'axios'

import { useQuery, useMutation, queryCache } from 'react-query'
import { ReactQueryDevtools } from 'react-query-devtools'

export default () => {
  const [text, setText] = React.useState('')
  const { status, data, error, isFetching } = useQuery('todos', async () => {
    const { data } = await axios.get('/api/data')
    return data
  })

  const [mutatePostTodo] = useMutation(
    text => axios.post('/api/data', { text }),
    {
      onSuccess: () => {
        // Query Invalidations
        // queryCache.invalidateQueries('todos')
        setText('')
      },
    }
  )

  return (
    <div>
      <p>
        When adding new items, the useMutation hook will observe the result of the asynchronous function.
        You can invalidate the query on success, and React Query will refetch the query with the same key.
      </p>
      <form
        onSubmit={e => {
          e.preventDefault()
          mutatePostTodo(text)
        }}
      >
        <input
          type="text"
          onChange={event => setText(event.target.value)}
          value={text}
        />
        <button>Create</button>
      </form>
      <br />
      {status === 'loading' ? (
        'Loading...'
      ) : status === 'error' ? (
        error.message
      ) : (
        <>
          <div>Updated At: {new Date(data.ts).toLocaleTimeString()}</div>
          <ul>
            {data.items.map(datum => (
              <li key={datum}>{datum}</li>
            ))}
          </ul>
          <div>{isFetching ? 'Updating in background...' : ' '}</div>
        </>
      )}
      <ReactQueryDevtools initialIsOpen />
    </div>
  )
}