export class Solicitudes {
  constructor(
    public _id:String,
    public idUsuario: String,
    public nombreUsuario: String,
    public apellidoUsuario: String,
    public edadUsuario: String,
    public emailUsuario: String,
    public infoMama: String,
    public infoPapa: String,
    public infoColegio: String,
    public cartaRecomendacion: String,
    public diplomas: String,
    public calificaciones: String,
    public fotografia: String,
    public idBeca: String,
    public nombreBeca: String,
    public idCreadorBeca: String,
    public aprobado: Boolean,
    public estado: String
  ) {}
}
