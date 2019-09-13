import { CompositeDecorator } from 'draft-js'
import MultiDecorator from './MultiDecorator'
import composableDecorators from './composable'
import customDecorators from './custom'

// TODO: stackexchange community url decorator
// TODO: jsfiddle, github gist url decorators
const compositeDecorator = new CompositeDecorator([...composableDecorators])

export default new MultiDecorator([compositeDecorator, ...customDecorators])
