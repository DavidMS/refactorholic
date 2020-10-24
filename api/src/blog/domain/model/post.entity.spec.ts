import IllegalArgumentError from "../../../common/error/illegal.argument.error";
import PostEntity from "./post.entity";

const SOME_TEXT = 'Some text';

describe('The Post entity', () => {
  it('should not allow empty slugs', () => {
    expect(() => new PostEntity({slug: '', text: SOME_TEXT})).toThrow(IllegalArgumentError)
  })

  it('can be created', () => {
    expect(() => new PostEntity({slug: 'slug', text: 'text'})).not.toThrow()
  })
})
