export interface RepositorySpecification {
  predicate<I, R>(input: I): R;
}