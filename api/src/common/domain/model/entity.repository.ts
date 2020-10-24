import {RepositorySpecification} from "../port/repository.specification";

export interface EntityRepository<E> {
  findById(id: string): Promise<E>
  findAll(specification: RepositorySpecification): Promise<E[]>
}