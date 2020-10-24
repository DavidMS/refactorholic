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

/**
 * Validates if the input is blank.
 *
 * @param input The input to validate.
 * @param errorSupplier Supplies the error to be thrown in case the input is blank.
 */
export function validateNotBlank(input: string | null | undefined, errorSupplier: () => Error ): void {
  validateNotEmpty(input, errorSupplier);

  if (typeof input === 'string' && input.trim().length === 0) {
    throw errorSupplier();
  }
}
