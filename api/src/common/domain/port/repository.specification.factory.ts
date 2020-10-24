import {RepositorySpecification} from "./repository.specification";

export abstract class RepositorySpecificationFactory {
  abstract any(): RepositorySpecification
}