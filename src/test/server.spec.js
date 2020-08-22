import { thePort } from "../server/index"

  test('listen', () => {
    expect(thePort).toBeDefined();

});
