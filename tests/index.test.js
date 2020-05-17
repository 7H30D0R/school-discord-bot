import Model from '../src/classes/database/Model';
import ExampleModel from '../src/models/ExampleModel';
import Builder from '../src/classes/database/Builder';

test('should throw error', () => {
    // Abstract class should throw error when instantiating directly
    expect(() => { new Model(); }).toThrow(Error);
});

test('should return builder', () => {
    let model = ExampleModel.orderBy("column", "ASC");
    expect(model.constructor).toBe(Builder);
});