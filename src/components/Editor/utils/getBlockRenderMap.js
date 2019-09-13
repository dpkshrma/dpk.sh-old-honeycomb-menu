import React from 'react'
import { DefaultDraftBlockRenderMap } from 'draft-js'
import { Map as ImmutableMap } from 'immutable'
import { Block } from '../constants'
import { CodeBlockWrapper } from '../components/blocks'

const getBlockRenderMap = ({ getEditorState, setEditorState, readOnly }) =>
  DefaultDraftBlockRenderMap.merge(
    ImmutableMap({
      [Block.BLOCKQUOTE]: {
        element: 'div'
      },
      [Block.ATOMIC]: {
        element: 'div'
      },
      [Block.CODE]: {
        element: 'pre',
        wrapper: (
          <CodeBlockWrapper
            readOnly={readOnly}
            getEditorState={getEditorState}
            setEditorState={setEditorState}
          />
        )
      }
    })
  )

export default getBlockRenderMap
