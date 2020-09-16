import IllegalStateError from "../error/IllegalStateError";
import {validateNotEmpty} from "../utils/validationUtils";

export default class PostEntity {

  // @ts-ignore
  private _slug: string;

  constructor(slug: string, public readonly text: string) {
    this.slug = slug;
  }

  public set slug(slug: string) {
    validateNotEmpty(slug, () => new IllegalStateError('A post slug cannot be empty'));

    this._slug = slug;
  }

  public get slug(): string {
    return this._slug;
  }
}
