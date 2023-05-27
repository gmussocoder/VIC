import tensorflow as tf
import os
import sys
import csv
import time
from datetime import datetime

arg1 = sys.argv

# Define a simple TensorFlow computation graph
a = tf.constant(5)
b = tf.constant(7)
c = tf.multiply(a, b)

# Run the computation graph using TensorFlow 2.x API
result = c.numpy()
print("Result: {}".format(result))
'''
# Open a file for writing
filename = "example.txt"
path = "C:\\Guille\\VIC\\Desarrollo\\pythonEnv"
filepath = os.path.join(path, filename)
with open(filepath, "w") as file:
    file.write(f'arg1: {arg1}\n')
'''
filename = "inference.csv"
path = "C:\\Guille\\VIC\\Desarrollo\\pythonEnv"
filepath = os.path.join(path, filename)

# If the file doesn't exist, write the header row
if not os.path.exists(filepath):
    with open(filepath, "w", newline='') as file:
        writer = csv.writer(file)
        writer.writerow(["jobId", "timestamp_start", "timestamp_finish", "result", "code", "description"])

# Open the file in append mode
with open(filepath, "a", newline='') as file:
    writer = csv.writer(file)
    timestamp_start = datetime.now().strftime("%Y-%m-%d %H:%M:%S.%f")[:-3] # current timestamp with milliseconds
    # Perform The operation here
    result = "some result"
    time.sleep(1)
    code = 200
    description = "some description"
    timestamp_finish = datetime.now().strftime("%Y-%m-%d %H:%M:%S.%f")[:-3] # current timestamp with milliseconds
    writer.writerow(["job1", timestamp_start, timestamp_finish, result, code, description])

# Print a message to indicate the file has been created
print(f"File {filename} created at {path}")