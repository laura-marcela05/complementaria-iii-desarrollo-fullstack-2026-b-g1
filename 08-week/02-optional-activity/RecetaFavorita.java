import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class RecetaFavorita {

  @Id
  @GeneratedValue
  private Long id;

  private String mealId;     // id de la receta en TheMealDB
  private String nombre;
  private String categoria;
  private String area;
  private String imagenUrl;

  public RecetaFavorita() {
  }

  public RecetaFavorita(String mealId, String nombre, String categoria, String area, String imagenUrl) {
    this.mealId = mealId;
    this.nombre = nombre;
    this.categoria = categoria;
    this.area = area;
    this.imagenUrl = imagenUrl;
  }

  // Getters y setters

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getMealId() {
    return mealId;
  }

  public void setMealId(String mealId) {
    this.mealId = mealId;
  }

  public String getNombre() {
    return nombre;
  }

  public void setNombre(String nombre) {
    this.nombre = nombre;
  }

  public String getCategoria() {
    return categoria;
  }

  public void setCategoria(String categoria) {
    this.categoria = categoria;
  }

  public String getArea() {
    return area;
  }

  public void setArea(String area) {
    this.area = area;
  }

  public String getImagenUrl() {
    return imagenUrl;
  }

  public void setImagenUrl(String imagenUrl) {
    this.imagenUrl = imagenUrl;
  }
}
