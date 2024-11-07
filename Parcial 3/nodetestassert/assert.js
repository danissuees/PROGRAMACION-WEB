// assert.js
import assert from 'node:assert';

console.log("Iniciando pruebas...");  // Prueba de mensaje de inicio

function sum(a, b) {
  return a + b;
}

// Pruebas con assert
assert.strictEqual(sum(2, 3), 5, 'La suma de 2 + 3 debería ser 5');
assert.strictEqual(sum(2, -2), 0, 'La suma de 2 + (-2) debería ser 0');

console.log('Todas las pruebas de assert pasaron correctamente');
