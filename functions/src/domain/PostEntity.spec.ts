import PostEntity from "./PostEntity";

import {expect} from 'chai';
import IllegalStateError from "../error/IllegalStateError";

const TEXT = 'Some text';

describe('The Post entity', () => {
  it('should not allow empty slugs', () => {
    expect(() => new PostEntity('', TEXT)).to.throw(IllegalStateError);
  });

  it('can be created', () => {
    expect(() => new PostEntity('slug', 'text')).not.to.throw();
  });
});
