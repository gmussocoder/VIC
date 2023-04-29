import tensorflow as tf

# Define a simple TensorFlow computation graph
a = tf.constant(5)
b = tf.constant(7)
c = tf.multiply(a, b)

# Run the computation graph using TensorFlow 2.x API
result = c.numpy()
print("Result: {}".format(result))