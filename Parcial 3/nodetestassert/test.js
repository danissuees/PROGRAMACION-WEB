
import { test } from 'node:test';
import assert from 'node:assert';

function multiply(a, b) {
  return a * b;
}


test('Prueba de multiplicación de dos números positivos', (t) => {
  assert.strictEqual(multiply(2, 3), 6);
});

test('Prueba de multiplicación de un número positivo y un número negativo', (t) => {
  assert.strictEqual(multiply(2, -3), -6);
});

test('Prueba de multiplicación por cero', (t) => {
  assert.strictEqual(multiply(2, 0), 0);
});
