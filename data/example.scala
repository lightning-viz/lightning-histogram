import org.viz.lightning._
import scala.util.Random

val lgn = Lightning()

val values = Array.fill(100)(Random.nextFloat())

lgn.histogram(values)
