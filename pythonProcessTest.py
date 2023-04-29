import tensorflow as tf
import os
import sys

arg1 = sys.argv



# Define a simple TensorFlow computation graph
a = tf.constant(5)
b = tf.constant(7)
c = tf.multiply(a, b)

# Run the computation graph using TensorFlow 2.x API
result = c.numpy()
print("Result: {}".format(result))

# Open a file for writing
filename = "example.txt"
path = "C:\\Guille\\VIC\\Desarrollo\\pythonEnv"
filepath = os.path.join(path, filename)
with open(filepath, "w") as file:
    file.write(f'arg1: {arg1}\n')

# Print a message to indicate the file has been created
print(f"File {filename} created at {path}")

