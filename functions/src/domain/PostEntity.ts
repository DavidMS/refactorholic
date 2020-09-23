import IllegalArgumentError from "../error/IllegalArgumentError";
import {validateNotEmpty} from "../utils/validationUtils";

export default class PostEntity {

  // @ts-ignore
  private _slug: string;

  constructor(slug: string, public readonly text: string) {
    this.slug = slug;
  }

  set slug(slug: string) {
    validateNotEmpty(slug, () => new IllegalArgumentError('A post slug cannot be empty'));

    this._slug = slug;
  }

  get slug(): string {
    return this._slug;
  }
}
