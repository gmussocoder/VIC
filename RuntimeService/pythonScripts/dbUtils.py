import sqlite3
import json
def updateResults(jobId, results):
    # Connect to the database
    db_connection = sqlite3.connect('C:/Guille/VIC/Desarrollo/Jobs.db')
    db_cursor = db_connection.cursor()
    
    # Update the results in the ijobs table
    update_query = "UPDATE ijobs SET results = ? WHERE jobId = ?"
    db_cursor.execute(update_query, (json.dumps(results), jobId))

    update_query = "UPDATE ijobs SET status = ? WHERE jobId = ?"
    db_cursor.execute(update_query, ("done", jobId))

    # Commit the changes and close the database connection
    db_connection.commit()
    db_connection.close()