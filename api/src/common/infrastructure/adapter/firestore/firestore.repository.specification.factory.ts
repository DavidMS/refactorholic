import {RepositorySpecificationFactory} from "../../../domain/port/repository.specification.factory";
import {RepositorySpecification} from "../../../domain/port/repository.specification";
import {FirestoreSpecification} from "./firestore.specification";

export abstract class FirestoreRepositorySpecificationFactory<E> extends RepositorySpecificationFactory {
  any(): RepositorySpecification {
    return new AnyEntitySpecification();
  }
}

class AnyEntitySpecification<E> extends FirestoreSpecification<E> {
  firestorePredicate<E>(collection: FirebaseFirestore.CollectionReference<E>): FirebaseFirestore.Query<E> {
    return collection;
  }
}