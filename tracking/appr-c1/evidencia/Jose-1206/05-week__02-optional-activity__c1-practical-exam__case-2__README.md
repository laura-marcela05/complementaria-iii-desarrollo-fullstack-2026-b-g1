# Métodos HTTP para crear y borrar

Para **crear** un nuevo registro utilizaría el método HTTP **POST**. Este método permite enviar información al servidor para que se cree un nuevo recurso.

Por ejemplo, si se desea registrar un nuevo usuario, los datos del usuario se enviarían mediante una petición `POST`:

```text
POST /usuarios
```

En este caso, el servidor recibe los datos enviados y crea el nuevo usuario.

Para **borrar** un registro utilizaría el método HTTP **DELETE**. Este método se utiliza para solicitar la eliminación de un recurso que ya existe. Generalmente se indica el identificador del registro que se desea eliminar.

```text
DELETE /usuarios/5
```

En este ejemplo, se solicita eliminar el usuario cuyo id es 5.

## Métodos según la operación

| Operación  | Método HTTP | Ejemplo           |
|------------|-------------|--------------------|
| Consultar  | GET         | GET /usuarios      |
| Crear      | POST        | POST /usuarios     |
| Borrar     | DELETE      | DELETE /usuarios/5 |

## Conclusión

Por lo tanto, para crear utilizaría **POST** y para borrar utilizaría **DELETE**, ya que cada método HTTP permite indicar al servidor la acción que se desea realizar sobre los recursos.

En una aplicación Fullstack, estos métodos permiten que el frontend pueda comunicarse con el backend o una API para realizar diferentes operaciones sobre los datos.