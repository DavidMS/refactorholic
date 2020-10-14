import IllegalArgumentError from "../../error/IllegalArgumentError";
import {validateNotEmpty} from "../../utils/validationUtils";

export interface PostEntityProps {
  publishDate?: Date,
  slug: string,
  text?: string,
  title?: string
}

export default class PostEntity {
  private _slug!: string;
  readonly publishDate?: Date;
  readonly text?: string;
  readonly title?: string;

  constructor(props: PostEntityProps) {
    this.publishDate = props.publishDate;
    this.slug = props.slug;
    this.text = props.text;
    this.title = props.title;
  }

  set slug(slug: string) {
    validateNotEmpty(slug, () => new IllegalArgumentError('A post slug cannot be empty'));

    this._slug = slug;
  }

  get slug(): string {
    return this._slug;
  }
}
