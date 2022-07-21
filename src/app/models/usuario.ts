export class Usuario {
  constructor(
    public _id: String,
    public nombre: String,
    public apellido: String,
    public genero: String,
    public email: String,
    public telefono: String,
    public password: String,
    public rol: String
  ) {}
}
