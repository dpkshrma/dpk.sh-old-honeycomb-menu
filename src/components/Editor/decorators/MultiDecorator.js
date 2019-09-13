import Immutable from 'immutable'

// Why not use https://github.com/SamyPesse/draft-js-multidecorators?
// Because draft-js dependency has not been updated due to which composite
// decorator strategy has older signature which does not accepts contentState,
// which breaks newer versions of decorator(like video)
// ref. https://draftjs.org/docs/v0-10-api-migration.html#decorator-strategy-arguments-change
// TODO: update dependency in above said repo, or take own fork and maintain

const KEY_SEPARATOR = '-'

class MultiDecorator {
  constructor(decorators) {
    this.decorators = Immutable.List(decorators)
  }

  /**
   * Return list of decoration IDs per character
   *
   * @param {ContentBlock} block
   * @return {List<String>}
   */
  getDecorations(block, contentState) {
    const decorations = new Array(block.getText().length).fill(null)

    this.decorators.forEach((decorator, i) => {
      const subDecorations = decorator.getDecorations(block, contentState)

      subDecorations.forEach((key, offset) => {
        if (!key) {
          return
        }

        decorations[offset] = i + KEY_SEPARATOR + key
      })
    })

    return Immutable.List(decorations)
  }

  /**
   * Return component to render a decoration
   *
   * @param {String} key
   * @return {Function}
   */
  getComponentForKey(key) {
    const decorator = this.getDecoratorForKey(key)
    return decorator.getComponentForKey(MultiDecorator.getInnerKey(key))
  }

  /**
   * Return props to render a decoration
   *
   * @param {String} key
   * @return {Object}
   */
  getPropsForKey(key) {
    const decorator = this.getDecoratorForKey(key)
    return decorator.getPropsForKey(MultiDecorator.getInnerKey(key))
  }

  /**
   * Return a decorator for a specific key
   *
   * @param {String} key
   * @return {Decorator}
   */
  getDecoratorForKey(key) {
    const parts = key.split(KEY_SEPARATOR)
    const index = Number(parts[0])

    return this.decorators.get(index)
  }

  /**
   * Return inner key for a decorator
   *
   * @param {String} key
   * @return {String}
   */
  static getInnerKey(key) {
    const parts = key.split(KEY_SEPARATOR)
    return parts.slice(1).join(KEY_SEPARATOR)
  }
}

export default MultiDecorator
