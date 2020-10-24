import {RepositorySpecification} from "../../../domain/port/repository.specification";

export abstract class FirestoreSpecification<E> implements RepositorySpecification {
  abstract firestorePredicate<E>(collection: FirebaseFirestore.CollectionReference<E>): FirebaseFirestore.Query<E>

  predicate<I, R>(input: I): R {
    if (input.constructor.name === 'CollectionReference') {
      return this.firestorePredicate(input as unknown as FirebaseFirestore.CollectionReference<E>) as unknown as R
    } else {
      throw Error('The input should be a FirebaseFirestore.CollectionReference')
    }
  }
}