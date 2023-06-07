import tensorflow as tf
import cv2
import numpy as np

def processImage(imagePath, modelPath):
    model = tf.saved_model.load(modelPath)
    inference_fn = model.signatures['serving_default']
    
    image = cv2.imread(imagePath)
    
    input_tensor = tf.convert_to_tensor(image)
    input_tensor = input_tensor[tf.newaxis, ...]
    
    detections = inference_fn(input_tensor)
    
    boxes = detections['detection_boxes'][0].numpy()
    classes = detections['detection_classes'][0].numpy().astype(np.int32)
    scores = detections['detection_scores'][0].numpy()
    
    confidence_threshold = 0.5
    personCount = 0
    
    results = []
    
    for i in range(boxes.shape[0]):
        if scores[i] > confidence_threshold and classes[i] == 1:
            ymin, xmin, ymax, xmax = boxes[i]
    
            height, width, _ = image.shape
            xmin = int(xmin * width)
            xmax = int(xmax * width)
            ymin = int(ymin * height)
            ymax = int(ymax * height)
    
            cv2.rectangle(image, (xmin, ymin), (xmax, ymax), (0, 255, 0), 2)
            cv2.putText(image, 'Person', (xmin, ymin - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.9, (0, 255, 0), 2)
            personCount += 1
    
            # Add bounding box coordinates to the results
            result = {
                'xmin': xmin,
                'ymin': ymin,
                'xmax': xmax,
                'ymax': ymax
            }
            results.append(result)
    
    return image, personCount, results