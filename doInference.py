# import argparse
import sys
import tensorflow as tf
import cv2
import numpy as np
import time

# Load the pre-trained model
# model_path = 'C:/Guille/VIC/Desarrollo/pythonEnv/model/saved_model'

jobId = sys.argv[1]
print("El JobId es: ", jobId)
imageUrl = sys.argv[2]
modelPath = sys.argv[3]
manifestId = sys.argv[4]

print("El JobId es: ", jobId)

model = tf.saved_model.load(modelPath)

# Get the function for inference
inference_fn = model.signatures['serving_default']

# Load the image
# image_path = 'C:/Guille/VIC/Desarrollo/pythonEnv/image.jpeg'
image = cv2.imread(imageUrl)

# Preprocess the image
input_tensor = tf.convert_to_tensor(image)
input_tensor = input_tensor[tf.newaxis, ...]

# Run the inference
detections = inference_fn(input_tensor)

# Process the detections and draw bounding boxes
boxes = detections['detection_boxes'][0].numpy()
classes = detections['detection_classes'][0].numpy().astype(np.int32)
scores = detections['detection_scores'][0].numpy()

# Set a threshold for minimum confidence
confidence_threshold = 0.5

# Iterate over the detections
for i in range(boxes.shape[0]):
    # If the detection confidence is above the threshold and the class is 'person'
    if scores[i] > confidence_threshold and classes[i] == 1:
        ymin, xmin, ymax, xmax = boxes[i]
        
        # Scale the bounding box coordinates to the image dimensions
        height, width, _ = image.shape
        xmin = int(xmin * width)
        xmax = int(xmax * width)
        ymin = int(ymin * height)
        ymax = int(ymax * height)
        
        # Draw the bounding box rectangle and label on the image
        cv2.rectangle(image, (xmin, ymin), (xmax, ymax), (0, 255, 0), 2)
        cv2.putText(image, 'Person', (xmin, ymin - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.9, (0, 255, 0), 2)

# Display the image with detections
cv2.imshow('Image', image)
#cv2.waitKey(0)
#cv2.destroyAllWindows()

# Save the image with detections
current_time = time.strftime("%Y%m%d_%H%M%S")
output_path = f'C:/Guille/VIC/Desarrollo/pythonEnv/{jobId}_{manifestId}_result_{current_time}.jpeg'
cv2.imwrite(output_path, image)

print(f"Image saved at: {output_path}")