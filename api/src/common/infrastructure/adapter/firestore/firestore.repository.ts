import admin from "firebase-admin";
import CollectionReference = admin.firestore.CollectionReference;
import Firestore = admin.firestore.Firestore;
import {EntityRepository} from "../../../domain/model/entity.repository";
import {FirestoreSpecification} from "./firestore.specification";

export abstract class FirestoreRepository<E> implements EntityRepository<E> {

  protected constructor(
    private readonly collection: string,
    private readonly converter: FirebaseFirestore.FirestoreDataConverter<E>,
    private readonly firestore: Firestore) {
  }

  async findAll(specification: FirestoreSpecification<E>): Promise<E[]> {
    const snapshot = await specification.predicate<FirebaseFirestore.CollectionReference<E>, FirebaseFirestore.Query<E>>(this.getCollection()).get();
    return snapshot.docs.map(doc => doc.data());
  }

  async findById(id: string): Promise<E> {
    const snapshot = await this.getCollection().doc(id).get();

    if (!snapshot.exists) {
      return null;
    } else {
      return snapshot.data();
    }
  }

  protected getCollection(): CollectionReference<E>{
    return this.firestore.collection(this.collection)
      .withConverter(this.converter);
  }

}