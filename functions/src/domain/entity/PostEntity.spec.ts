import PostEntity from "./PostEntity";

import {expect} from 'chai';
import IllegalArgumentError from "../../error/IllegalArgumentError";

const TEXT = 'Some text';

describe('The Post entity', () => {
  it('should not allow empty slugs', () => {
    expect(() => new PostEntity({slug: '', text: TEXT})).to.throw(IllegalArgumentError);
  });

  it('can be created', () => {
    expect(() => new PostEntity({slug: 'slug', text: 'text'})).not.to.throw();
  });
});
