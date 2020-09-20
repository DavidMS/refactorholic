/**
 * Validates if the input is empty.
 *
 * @param input The input to validate.
 * @param errorSupplier Supplies the error to be thrown in case the input is empty.
 */
export function validateNotEmpty(input: string | any[] | null | undefined, errorSupplier: () => Error ): void {
  if (input == null) {
    throw errorSupplier();
  }

  if (input.length === 0) {
    throw errorSupplier();
  }
}
