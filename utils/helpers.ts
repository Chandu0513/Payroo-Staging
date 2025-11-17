import { faker } from '@faker-js/faker';

export class DataGenerator {
  static randomExpenseName() {
    return `NewTest ${faker.number.int({ min: 1, max: 9999 })}`;
  }

  static randomAmount() {
    return faker.number.int({ min: 1, max: 999 }).toString();
  }

  static randomDescription() {
    return faker.lorem.sentence();
  }
}
