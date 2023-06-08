import cv2

def capture_image(image_path):
    # Open the camera
    camera = cv2.VideoCapture(0)

    # Check if the camera is opened successfully
    if not camera.isOpened():
        print("Failed to open the camera")
        return

    # Capture an image from the camera
    ret, frame = camera.read()

    # Check if the image capture was successful
    if not ret:
        print("Failed to capture image from the camera")
        camera.release()
        return

    # Save the captured image to a file
    cv2.imwrite(image_path, frame)

    print("Image captured and saved to:", image_path)

    # Release the camera
    camera.release()