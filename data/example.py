from lightning import Lightning
from numpy import random, ceil, array

lgn = Lightning()

values = random.randn(100)

lgn.histogram(values)